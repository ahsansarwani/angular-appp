import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from 'projects/gor-app/src/environments/environment';
import { OrderTrackerActions } from '../../state/order-tracker.actionTypes';
import { OrderTrackerState } from '../../state/order-tracker.model';

@Component({
  selector: 'gor-order-not-exist',
  templateUrl: './order-not-exist.component.html',
  styleUrls: ['./order-not-exist.component.scss']
})
export class OrderNotExistComponent {

  constructor(private store: Store<OrderTrackerState>,
  ) {}

  async ngOnInit() {
    this.store.dispatch(OrderTrackerActions.updateRetryCount({ retryCount: 0}));
  }

  redirectToTrackOrder() {
    window.location.href = environment.homeUrl + '/track-order';
  }
}
