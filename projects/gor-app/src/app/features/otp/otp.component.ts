import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, firstValueFrom, of } from 'rxjs';
import { Subscription, timer } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { OtpActions } from './state/otp.actionTypes';
import {
  activeButton,
  elapsedTime,
  showTimer,
  verifyStatus,
  loadingStatus,
  errorMsg,
  verifyFailCount,
  initCountSelect,
  activeInput,
} from './state/otp.selectors';
import { OtpState } from './state/otp.reducer';
import { DAFFillState } from '../daf-fill/state/daf-fill.model';
import { CustomerTypeState } from '../plan-selector/state/plan-selector.model';
import { customerTypeSelect } from '../plan-selector/state/plan-selector.selectors';
import { mobileNoSelector } from '../daf-fill/state/daf-fill.selector';
import { otpConfirmInterval } from '../../globals/config';
import { AppActions } from '../../app-state/app.actionTypes';
import {
  ADA_OTP_LANDING_PAGE,
  ADA_OTP_LANDING_PAGE_CANCEL,
  ADA_OTP_LANDING_PAGE_SUBMIT,
  FTA_OTP_LANDING_PAGE,
  FTA_OTP_LANDING_PAGE_BUTTON_CANCEL,
  FTA_OTP_LANDING_PAGE_BUTTON_SUBMIT,
  FTA_ZOLOZ_FAILED_OTP_LANDING_PAGE,
  FTA_ZOLOZ_FAILED_OTP_LANDING_PAGE_CANCEL,
  FTA_ZOLOZ_FAILED_OTP_LANDING_PAGE_SUBMIT,
} from '../../globals/gtm-events/plan-selector/events';
import { GoogleTagManagerService } from '../../app-state/gtm.service';
import { Meta, Title } from '@angular/platform-browser';
import { tags_otp } from '../../globals/redirection-links';
import { ChatbotService } from '../../app-state/chat.service';
import { AllownumbersonlyDirective } from '../../allownumbersonly.directive';

@Component({
  selector: 'gor-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [AllownumbersonlyDirective],
})
export class OtpComponent {
  activeButton$: Observable<boolean> | undefined;
  activeInput$: Observable<boolean>;
  initCount$: Observable<number | undefined>;
  elapsedTime$: Observable<Date | undefined>;
  showTimer$: Observable<boolean> | undefined;
  loadingStatus$: Observable<boolean> | undefined;
  verifyStatus$: Observable<boolean | undefined>;
  errorMsg$: Observable<string>;
  customerType$: Observable<string | undefined>;
  verifyCount$: Observable<number>;
  isCountExceed$: Observable<boolean>;
  mobileNo$: Observable<any>;
  mobileNoLast3 = '';
  isLoading$: Observable<boolean>;
  mobileNo = '';
  customerType = '';
  verifyStatus = false;
  code = '';
  interval: any;
  showTime = '';

  time = new Date();
  rxTime = '';
  intervalId: any;
  subscription?: Subscription;
  otpResetTime = otpConfirmInterval;
  @ViewChild(AllownumbersonlyDirective)
  allowNumbersOnly!: AllownumbersonlyDirective;

  codeLen = this.allowNumbersOnly?.inputLength;
  caretColor: any;
  codeLength: any;
  isCodeAllNumeric: any;
  checkInputLength(obj: any) {
    console.log('Length in function ', obj);
    console.log('Input length ', obj.inputLength);
    console.log('All numeric ', obj.allNumeric);
    this.codeLength = obj.inputLength;
    this.isCodeAllNumeric = obj.allNumeric;
    if (obj.inputLength === 0) {
      this.caretColor = '#000';
    } else if (obj.allNumeric === false && obj.inputLength === 6) {
      this.caretColor = '#000';
    } else if (obj.allNumeric === true && obj.inputLength === 6) {
      this.caretColor = 'transparent';
    } else {
      this.caretColor = '#000';
    }
  }
  constructor(
    private store: Store<OtpState>,
    private customer: Store<CustomerTypeState>,
    private dafFillStore: Store<DAFFillState>,
    private gtmService: GoogleTagManagerService,
    private meta: Meta,
    private title: Title,
    private chatService: ChatbotService
  ) {
    //set meta
    this.meta.addTags([{ name: 'description', content: tags_otp.description }]);
    this.title.setTitle(tags_otp.title);
    //

    this.customerType$ = this.customer.pipe(select(customerTypeSelect));
    this.mobileNo$ = this.dafFillStore.pipe(select(mobileNoSelector));
    this.isLoading$ = this.store.pipe(select(loadingStatus));
    this.activeButton$ = this.store.pipe(select(activeButton));
    this.activeInput$ = this.store.pipe(select(activeInput));
    this.elapsedTime$ = this.store.pipe(select(elapsedTime));
    this.showTimer$ = this.store.pipe(select(showTimer));
    this.showTimer$.subscribe(value => {
      if (value == true) {
        this.verifyStatus$.subscribe(value => {
          if (value != true) {
            this.handleTimer();
          }
        });
      } else {
        console.log('removing timer');
        if (this.subscription) {
          this.removeTimer();
          this.subscription = undefined;
        }
      }
    });
    this.verifyStatus$ = this.store.pipe(select(verifyStatus));
    this.errorMsg$ = this.store.pipe(select(errorMsg));
    this.verifyCount$ = this.store.pipe(select(verifyFailCount));
    this.initCount$ = this.store.pipe(select(initCountSelect));
    this.isCountExceed$ = of(false);
    this.verifyStatus$.subscribe(val =>
      val == true ? (this.verifyStatus = true) : (this.verifyStatus = false)
    );

    this.mobileNo$.subscribe(async mobileNo => {
      if (mobileNo) {
        const customerType = await firstValueFrom(this.customerType$);
        const verifyStatus = await firstValueFrom(this.verifyStatus$);
        if (
          verifyStatus !== true &&
          (customerType === 'FTA' || customerType === 'RECOVERY')
        ) {
          this.mobileNo = mobileNo;
          this.mobileNoLast3 = mobileNo.slice(-3);
          this.store.dispatch(OtpActions.init({ mobileNo: mobileNo }));
        }
      }
    });
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    if (this.customerType == 'FTA') {
      this.gtmService.captureGTMEvent(FTA_OTP_LANDING_PAGE);
    } else if (this.customerType == 'ADA') {
      this.gtmService.captureGTMEvent(ADA_OTP_LANDING_PAGE);
    } else if (this.customerType == 'RECOVERY') {
      this.gtmService.captureGTMEvent(FTA_ZOLOZ_FAILED_OTP_LANDING_PAGE);
    }
    this.verifyCount$.subscribe(val => {
      if (val >= 6) {
        this.isCountExceed$ = of(true);
      } else {
        this.isCountExceed$ = of(false);
      }
    });
  }
  ngAfterViewInit() {
    // chat
    this.chatService.checkChat();
  }

  sendCode() {
    if (this.mobileNo.length == 11) {
      this.store.dispatch(OtpActions.init({ mobileNo: this.mobileNo }));
    }
  }
  confirmOtp() {
    if (this.customerType === 'FTA') {
      this.gtmService.captureGTMEvent(FTA_OTP_LANDING_PAGE_BUTTON_SUBMIT);
    } else if (this.customerType === 'ADA') {
      this.gtmService.captureGTMEvent(ADA_OTP_LANDING_PAGE_SUBMIT);
    } else if (this.customerType === 'RECOVERY') {
      this.gtmService.captureGTMEvent(FTA_ZOLOZ_FAILED_OTP_LANDING_PAGE_SUBMIT);
    }
    this.store.dispatch(OtpActions.verifyInit({ code: this.code }));
  }

  handleTimer() {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(async time => {
        const elapsed_time = await firstValueFrom(this.elapsedTime$);
        if (elapsed_time != undefined) {
          const seconds =
            this.otpResetTime -
            Math.abs(time.getTime() - elapsed_time.getTime()) / 1000;

          if (seconds > 0) {
            const minutes: number = Math.floor(seconds / 60);
            // console.log('RX Time', this.rxTime);
            const sec = Math.floor(seconds - minutes * 60);

            if (sec < 10) {
              this.rxTime = minutes + ':0' + sec;
            } else {
              this.rxTime = minutes + ':' + sec;
            }

            // console.log('RX Time', this.rxTime);
          } else {
            console.log('init remove timer ', elapsedTime);
            this.removeTimer();
          }
        }
      });
  }

  goBack() {
    if (this.customerType === 'FTA') {
      this.gtmService.captureGTMEvent(FTA_OTP_LANDING_PAGE_BUTTON_CANCEL);
    } else if (this.customerType === 'ADA') {
      this.gtmService.captureGTMEvent(ADA_OTP_LANDING_PAGE_CANCEL);
    } else if (this.customerType === 'RECOVERY') {
      this.gtmService.captureGTMEvent(FTA_ZOLOZ_FAILED_OTP_LANDING_PAGE_CANCEL);
    }
    this.store.dispatch(OtpActions.goBack());
  }

  removeTimer() {
    // console.log("Removing timer");
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.code = '';
    this.store.dispatch(OtpActions.resetTimer());
  }

  ngOnDestroy() {
    // this.removeTimer();
    clearInterval(this.intervalId);
    this.code = '';
    this.store.dispatch(OtpActions.resetTimer());
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
