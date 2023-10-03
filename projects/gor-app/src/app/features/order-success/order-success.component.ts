import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
import { GoogleTagManagerService } from '../../app-state/gtm.service';
import {
  ADA_API_FAILED,
  ADA_SUCCESS_PAGE,
  ECOMM_PURCHASE_SUCCESS,
  FTA_API_FAILED,
  FTA_SUCCESS_PAGE,
  KEEP_IN_TOUCH_PAGE,
} from '../../globals/gtm-events/plan-selector/events';
import {
  tags_thankYou,
  tags_thankYouOffline,
  toRoute,
} from '../../globals/redirection-links';
import { CustomerTypeState } from '../plan-selector/state/plan-selector.model';
import { customerTypeSelect } from '../plan-selector/state/plan-selector.selectors';
import { Meta, Title } from '@angular/platform-browser';
import { ChatbotService } from '../../app-state/chat.service';
import { OrderState } from '../submit-order/state/submit-order.model';
import { DafReviewState } from '../daf-review/state/daf-review.model';
import { orderIdSelector } from '../submit-order/state/submit-order.selectors';
import {
  payModeSelect,
  payStatusSelect,
  payTodayTotal,
} from '../daf-review/state/daf-review.selectors';

@Component({
  selector: 'gor-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.scss'],
})
export class OrderSuccessComponent {
  url: any;
  breadcrumbDivider: any;
  tellYourFriends = false;

  offline = true;

  statusSvg = 'assets/images/svg/be-in-touch.svg';
  statusSvgDesktop = 'assets/desktop_order_success_icon.svg';
  svgDesktop = 'assets/desktop_order_success_icon.svg';

  expectDescriptionDesktop =
    this.offline === true
      ? 'Expect an SMS update about the next steps for your application within 24 hours. We apologize for any inconvenience caused by the delay. Thank you for your patience and understanding.'
      : 'Expect your order is processed, we will prepare your items for shipment. Our dedicated staffs will carefully package your order to ensure it arrives in excellent condition.';
  thankyouDesktop = this.offline === true ? 'Thank you!' : '';
  expectDescriptionDesktopOnline =
    'Expect your order is processed, we will prepare your items for shipment. Our dedicated staffs will carefully package your order to ensure it arrives in excellent condition.';
  statusDesc = '';
  statusTitle = "We'll  be in touch!";
  statusColor = '#FBB03B';
  expectDesc =
    'Expect an SMS update about the next steps for your application within 24 hours. We apologize for any inconvenience caused by the delay. Thank you for your patience and understanding.';
  expectTitle = 'Expect an update from us';
  orderSuccessTitle = 'Order Confirmed';
  customerType$: any;
  orderId: any;
  amount: any;
  transactionId$: any;
  paymentMode$: any;
  totalAmountToBePaid$: any;

  constructor(
    router: Router,
    private gtmService: GoogleTagManagerService,
    private customer: Store<CustomerTypeState>,
    private meta: Meta,
    private title: Title,
    private chatService: ChatbotService,
    private orderStore: Store<OrderState>,
    private dafReviewStore: Store<DafReviewState>
  ) {
    this.customerType$ = this.customer.pipe(select(customerTypeSelect));
    this.transactionId$ = this.orderStore.pipe(select(orderIdSelector));
    this.totalAmountToBePaid$ = this.dafReviewStore.pipe(select(payTodayTotal));
    this.paymentMode$ = this.dafReviewStore.pipe(select(payModeSelect));
    this.url = router.url;
    if (this.url === toRoute.orderSuccess) {
      //set meta
      this.meta.addTags([
        { name: 'description', content: tags_thankYou.description },
      ]);
      this.title.setTitle(tags_thankYou.title);
      //
      this.offline = true;
    } else if (this.url === toRoute.orderPaymentPending) {
      this.offline = false;
      this.orderSuccessTitle = 'Pending payment';
      this.statusTitle = 'Expect an email from us';
      this.statusDesc = 'Thank you for your payment!';
      this.expectDesc =
        'As soon as we receive an update, we will notify you promptly.We are currently awaiting confirmation from our payment partner regarding the status of your transaction';
    } else {
      //set meta
      this.meta.addTags([
        { name: 'description', content: tags_thankYouOffline.description },
      ]);
      this.title.setTitle(tags_thankYouOffline.title);
      //
      this.offline = false;
    }
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }
  async ngOnInit() {
    this.scrollToTop();
    let transaction_id = await firstValueFrom(this.transactionId$);
    let customerType = await firstValueFrom(this.customerType$);
    let payMode = await firstValueFrom(this.paymentMode$);
    let totalAmount = await firstValueFrom(this.totalAmountToBePaid$);
    if ((customerType = 'FTA' && this.url === toRoute.orderSuccess)) {
      this.gtmService.captureGTMEvent({
        ...FTA_SUCCESS_PAGE,
        transaction_id: transaction_id,
        payment_type: payMode,
        price: totalAmount,
      });
    } else if ((customerType = 'FTA' && this.url === toRoute.orderOffline)) {
      this.gtmService.captureGTMEvent({
        ...KEEP_IN_TOUCH_PAGE,
        transaction_id: transaction_id,
      });
    }
    if ((customerType = 'ADA' && this.url === toRoute.orderSuccess)) {
      this.gtmService.captureGTMEvent({
        ...ADA_SUCCESS_PAGE,
        transaction_id: transaction_id,
        payment_type: payMode,
        price: totalAmount,
      });
    }
    if ((customerType = 'ADA' && this.url === toRoute.orderOffline)) {
      this.gtmService.captureGTMEvent({
        ...KEEP_IN_TOUCH_PAGE,
        transaction_id: transaction_id,
      });
    }
  }

  ngAfterViewInit() {
    // chat
    this.chatService.checkChat();
    if (this.url === toRoute.orderSuccess) this.triggerGAEvent();
  }

  triggerGAEvent() {
    const eventInfo = ECOMM_PURCHASE_SUCCESS;
    this.gtmService.captureEcommEvent(eventInfo);
  }
}
