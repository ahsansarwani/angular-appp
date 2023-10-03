import { Component } from '@angular/core';
import { Observable, firstValueFrom, of, BehaviorSubject } from 'rxjs';
import { Subscription, timer } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { EligibilityActions } from './state/eligibility.actionTypes';
import {
  accountLoader,
  mobileNo,
  duplicateLoader,
  OBLoader,
  alertLoader,
  percent,
  ftaInAdaSelect,
  allEligibilityStatusSelect,
} from './state/eligibility.selectors';
import { EligibilityState } from './state/eligibility.model';
import { CustomerTypeState } from '../plan-selector/state/plan-selector.model';
import { customerTypeSelect } from '../plan-selector/state/plan-selector.selectors';
import { customerTypeReducer } from '../plan-selector/state/plan-selector.reducer';
import { OtpState } from '../otp/state/otp.reducer';
import { mobileNoSelect } from '../otp/state/otp.selectors';
import { DAFFillState } from '../daf-fill/state/daf-fill.model';
import { mobileNoSelector } from '../daf-fill/state/daf-fill.selector';
import {
  ADA_CHECKING_LANDING_PAGE,
  FTA_CHECKING_LANDING_PAGE,
} from '../../globals/gtm-events/plan-selector/events';
import { GoogleTagManagerService } from '../../app-state/gtm.service';
import { Meta, Title } from '@angular/platform-browser';
import { tags_eligibility } from '../../globals/redirection-links';
import { ChatbotService } from '../../app-state/chat.service';

@Component({
  selector: 'gor-eligibility',
  templateUrl: './eligibility.component.html',
  styleUrls: ['./eligibility.component.scss'],
})
export class EligibilityComponent {
  accountLoader$: Observable<string> | undefined;
  duplicateLoader$: Observable<string> | undefined;
  OBLoader$: Observable<string> | undefined;
  alertLoader$: Observable<string> | undefined;
  mobileNo$: Observable<string | undefined>;
  mobileNoFta$: Observable<string>;
  percent$: Observable<number>;
  customerType$: Observable<string | undefined>;
  mobileNo: any;
  mobileNoFta = '';
  ftaInAda$: Observable<boolean | undefined>;
  allChecks$: Observable<boolean | undefined>;
  allChecks: any;

  constructor(
    private store: Store<EligibilityState>,
    private customer: Store<CustomerTypeState>,
    private otpStore: Store<OtpState>,
    private dafFillStore: Store<DAFFillState>,
    private gtmService: GoogleTagManagerService,
    private meta: Meta,
    private title: Title,
    private chatService: ChatbotService
  ) {
    //set meta
    this.meta.addTags([
      { name: 'description', content: tags_eligibility.description },
    ]);
    this.title.setTitle(tags_eligibility.title);
    //

    this.customerType$ = this.customer.pipe(select(customerTypeSelect));
    this.accountLoader$ = this.store.pipe(select(accountLoader));
    this.duplicateLoader$ = this.store.pipe(select(duplicateLoader));
    this.OBLoader$ = this.store.pipe(select(OBLoader));
    this.alertLoader$ = this.store.pipe(select(alertLoader));
    this.mobileNo$ = this.otpStore.pipe(select(mobileNoSelect));
    this.mobileNoFta$ = this.dafFillStore.pipe(select(mobileNoSelector));
    this.percent$ = this.store.pipe(select(percent));
    this.ftaInAda$ = this.store.pipe(select(ftaInAdaSelect));
    this.allChecks$ = this.store.pipe(select(allEligibilityStatusSelect));
    this.allChecks = this.allChecks$.subscribe(val => (this.allChecks = val));
  }

  async ngOnInit() {
    if (this.allChecks != true) {
      this.mobileNo = await firstValueFrom(this.mobileNo$);
      this.mobileNoFta = await firstValueFrom(this.mobileNoFta$);
      const customerType = await firstValueFrom(this.customerType$);
      if (customerType === 'FTA') {
        this.gtmService.captureGTMEvent(FTA_CHECKING_LANDING_PAGE);
      } else if (customerType === 'ADA') {
        this.gtmService.captureGTMEvent(ADA_CHECKING_LANDING_PAGE);
      }
      if (customerType && this.mobileNo && customerType == 'ADA') {
        this.store.dispatch(
          EligibilityActions.startChecks({
            mobileNo: this.mobileNo,
            customerType: customerType,
          })
        );
      } else if (customerType && customerType == 'FTA' && this.mobileNoFta) {
        this.store.dispatch(
          EligibilityActions.startChecks({
            mobileNo: this.mobileNoFta,
            customerType: customerType,
          })
        );
      }
    }
  }

  ngAfterViewInit() {
    // chat
    this.chatService.checkChat();
  }

  onChoose(event: string) {
    this.store.dispatch(EligibilityActions.ftaInAdaBtn({ choice: event }));
  }
}
