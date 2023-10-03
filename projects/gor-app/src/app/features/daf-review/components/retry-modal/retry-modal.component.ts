import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { OrderActions } from '../../../submit-order/state/submit-order.actionTypes';
import { OrderState } from '../../../submit-order/state/submit-order.model';

@Component({
  selector: 'gor-retry-modal',
  templateUrl: './retry-modal.component.html',
  styleUrls: ['./retry-modal.component.scss'],
})
export class RetryModalComponent {
  constructor(private store: Store<OrderState>) {}
  ngOnChanges() {
    console.log('NG on changes retry modal');
  }

  title = 'Payment failed';
  subTitle = `It seems there is an issue with your chosen payment method. The account associated with your selected method either has insufficient balance or has declined the transaction.
    <br><br>
    Please try again or select a different payment method in order to proceed with your transaction.`;
  primaryBtnText = 'OK';
  retryModal: any;

  ngAfterViewInit() {}

  closeModal() {
    this.store.dispatch(OrderActions.closeRetryModal());
    // console.log('clicked');
    // this.clickedButton.emit(value);
    // console.log('clicked after emit');
  }
}
