import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { paymentRetryCount } from '../../globals/config';
import { DafReviewState } from '../daf-review/state/daf-review.model';
import {
  payModeSelect,
  payStatusSelect,
} from '../daf-review/state/daf-review.selectors';
import { OrderActions } from './state/submit-order.actionTypes';
import { OrderState } from './state/submit-order.model';
import {
  getPayStatus,
  orderIdSelector,
  orderStatusSelect2,
  paymentStatusSelect,
  payRetryCountSelect,
  paySessionStatus,
  retryModalStatus,
  thankYouPathSelect,
} from './state/submit-order.selectors';

declare let bootstrap: any;
@Component({
  selector: 'gor-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.scss'],
})
export class SubmitOrderComponent {
  mainText = "We're processing your Order";
  subText = 'Please wait patiently while we review your information';
  url: string;

  orderBookedPath: any;
  constructor(
    private reviewStore: Store<DafReviewState>,
    private store: Store<OrderState>,
    router: Router
  ) {
    this.url = router.url;

    const triggerEvent = async () => {
      const payMode = await firstValueFrom(
        this.reviewStore.pipe(select(payModeSelect))
      );

      const payToday = await firstValueFrom(
        this.reviewStore.pipe(select(payStatusSelect))
      );

      const payStatus = await firstValueFrom(
        this.store.pipe(select(paymentStatusSelect))
      );

      const orderBookedPath = await firstValueFrom(
        this.store.pipe(select(thankYouPathSelect))
      );

      const retryCount = await firstValueFrom(
        this.store.pipe(select(payRetryCountSelect))
      );

      const sessionStatus = await firstValueFrom(
        this.store.pipe(select(paySessionStatus))
      );

      const getPaymentStatus = await firstValueFrom(
        this.store.pipe(select(getPayStatus))
      );

      if (sessionStatus === false || getPaymentStatus == false) {
        if (orderBookedPath !== undefined) {
          router.navigate(['/' + orderBookedPath]);
        } else {
          this.store.dispatch(
            OrderActions.submitOrderInit({ paypending: false })
          );
        }
      }

      if (
        payStatus === false &&
        payToday &&
        payMode &&
        payToday > 0 &&
        retryCount < paymentRetryCount
      ) {
        if (payMode == 'gcash') {
          this.subText = 'Waiting for GCash to respond...';
        } else {
          this.subText =
            "We're redirecting you to your bank's authentication page in a moment";
        }
        this.store.dispatch(OrderActions.paymentInit());
      } else if (
        payToday > 0 &&
        payStatus === true &&
        orderBookedPath == undefined
      ) {
        this.store.dispatch(
          OrderActions.submitOrderInit({ paypending: false })
        );
      } else if (payToday == 0 && orderBookedPath == undefined) {
        this.store.dispatch(
          OrderActions.submitOrderInit({ paypending: false })
        );
      } else if (orderBookedPath !== undefined) {
        router.navigate(['/' + orderBookedPath]);
      }
    };
    triggerEvent();
  }
}
