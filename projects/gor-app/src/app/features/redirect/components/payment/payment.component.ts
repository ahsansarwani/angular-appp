import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GoogleTagManagerService } from 'projects/gor-app/src/app/app-state/gtm.service';
import { PAY_PROCESS } from 'projects/gor-app/src/app/globals/gtm-events/plan-selector/events';
import { firstValueFrom } from 'rxjs';
import { OrderActions } from '../../../submit-order/state/submit-order.actionTypes';
import { OrderState } from '../../../submit-order/state/submit-order.model';
import { payTokenSelector } from '../../../submit-order/state/submit-order.selectors';

@Component({
  selector: 'gor-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  constructor(
    private orderStore: Store<OrderState>,
    private gtmService: GoogleTagManagerService
  ) {
    this.gtmService.captureGTMEvent(PAY_PROCESS);
    const triggerPayment = async () => {
      const token = await firstValueFrom(
        this.orderStore.pipe(select(payTokenSelector))
      );
      if (token != undefined) {
        this.orderStore.dispatch(
          OrderActions.getPaymentStatusGcash({ paymentTokenId: token })
        );
      }
    };
    triggerPayment();
  }
}
