import { Component } from '@angular/core';
import { LobState } from '../plan-selector/state/plan-selector.model';
import { lobState } from '../plan-selector/state/plan-selector.selectors';
import {
  promoCode,
  tnc,
  payToday,
  upcomingBill,
  paymentModes,
  delivery,
} from 'projects/gor-app/src/dummy-data';
import { select, Store } from '@ngrx/store';
import { firstValueFrom, Observable, of } from 'rxjs';
import { DafReviewState } from './state/daf-review.model';
import {
  isPaymentModeVisible,
  payInitSelect,
  authUrl,
  authSuccess,
  authModalSelect,
} from './state/daf-review.selectors';
import { OrderState } from '../submit-order/state/submit-order.model';
import { retryModalStatus } from '../submit-order/state/submit-order.selectors';
import { tags_review } from '../../globals/redirection-links';
import { Meta, Title } from '@angular/platform-browser';
import { ChatbotService } from '../../app-state/chat.service';

declare let bootstrap: any;
@Component({
  selector: 'gor-daf-review',
  templateUrl: './daf-review.component.html',
  styleUrls: ['./daf-review.component.scss'],
})
export class DafReviewComponent {
  payInit$: Observable<boolean>;
  isPaymentModeVisible$: Observable<boolean>;

  tnc: any = tnc;
  promoCode: any = promoCode;
  payToday: any = payToday;
  upcomingBill: any = upcomingBill;
  paymentModes: any = paymentModes;
  delivery: any = delivery;
  lob$: Observable<string | undefined>;
  // reviewDetails: any = reviewDetails;

  authModal: any;
  authUrl = '';
  authModal$: Observable<any>;
  authModal2$: Observable<string>;
  authSuccess$: Observable<boolean>;
  modalStatus$: Observable<boolean> = of(false);
  modalStatus: any;

  retryModal: any;
  retryModal$: Observable<boolean>;
  constructor(
    private store: Store<DafReviewState>,
    private lobStore: Store<LobState>,
    private orderStore: Store<OrderState>,
    private meta: Meta,
    private title: Title,
    private chatService: ChatbotService
  ) {
    //set meta
    this.meta.addTags([
      { name: 'description', content: tags_review.description },
    ]);
    this.title.setTitle(tags_review.title);
    //

    this.lob$ = this.lobStore.pipe(select(lobState));
    this.isPaymentModeVisible$ = this.store.pipe(select(isPaymentModeVisible));
    this.payInit$ = this.store.pipe(select(payInitSelect));
    this.authModal$ = this.store.pipe(select(authUrl));
    this.authModal2$ = this.store.pipe(select(authModalSelect));
    this.authSuccess$ = this.store.pipe(select(authSuccess));
    this.retryModal$ = this.orderStore.pipe(select(retryModalStatus));
  }
  steps = [
    {
      no: 1,
      stepDesc:
        'Please provide your ID for verification and registration purposes.',
    },
    {
      no: 2,
      stepDesc: 'Let’s get to know you more',
    },
    {
      no: 3,
      stepDesc: 'Billing Details',
    },
    {},
  ];

  ngAfterViewInit() {
    // chat
    this.chatService.checkChat();

    this.authModal = new bootstrap.Modal(document.getElementById('authModal'), {
      // backdrop: 'static',
      keyboard: false,
    });

    // console.log('Auth Modal elem after view init');
    // console.log('Auth Modal element', this.authModal);
    // console.log(document.getElementById('authModal'));

    this.retryModal = new bootstrap.Modal(
      document.getElementById('retryModal'),
      {
        // backdrop: 'static',
        keyboard: false,
      }
    );

    // console.log('Retry Modal elem after view init');
    // console.log('Retry Modal element', this.retryModal);
    // this.retryModal.show();

    this.retryModal$.subscribe(value => {
      if (this.retryModal) {
        if (value == false) {
          this.retryModal.hide();
        } else if (value == true) {
          this.retryModal.show();
        }
      }
    });

    this.authModal$.subscribe(obj => {
      // console.log('Received url ', obj);
      if (obj.authStatus == true) {
        this.authUrl = obj.authUrl;
        this.modalStatus$ = of(true);
        // let drawer = document.getElementById('offcanvasBottom')!;
        // drawer.classList.add('hide');
        this.authModal.show();
      } else {
        this.modalStatus$.subscribe(async val => {
          // console.log('hiding modal');
          if (val == true) {
            this.authModal.hide();
            setTimeout(async () => {
              const retry = await firstValueFrom(this.retryModal$);

              if (retry == true) {
                // console.log('showing retry modal');
                if (this.retryModal) {
                  this.retryModal.show();
                }
              }
              // else {
              //   // console.log('hiding retry modal');
              //   this.retryModal.hide();
              // }
            }, 1500);
          }
        });
      }
    });

    // const callBackModal = async (event: any) => {
    //   // do something...
    //   console.log('Auth modal was hidden');
    //   let retry = await firstValueFrom(this.retryModal$);
    //   if (retry == true && this.retryModal) {
    //     this.retryModal.show();
    //   }
    // };

    // this.authSuccess$.subscribe(val => {
    //   console.log('received auth close');
    //   // if (val == true) {
    //   this.authModal.hide();
    //   // }
    // });
  }
}
