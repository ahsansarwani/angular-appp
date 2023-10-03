import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { OrderData, OrderHistory, OrderToken, OrderTrackerState, QueryParamsState } from './state/order-tracker.model';
import { orderSelector, orderTokenSelector, queryParamsSelector } from './state/order-tracker.selectors';
import { OrderTrackerActions } from './state/order-tracker.actionTypes';
import { ORDER_STATUS, ORDER_STATUS_MAPPING } from './state/order-tracker.constants';
import { OrderTrackerService } from './state/order-tracker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'gor-order-tracker',
  templateUrl: './order-tracker.component.html',
  styleUrls: ['./order-tracker.component.scss']
})
export class OrderTrackerComponent implements OnInit {

  showQr = false;
  order$: Observable<OrderData | undefined>;
  accessToken$: Observable<OrderToken | undefined>
  queryParams$: Observable<QueryParamsState | undefined>
  orderDetails: any;
  orderHistory: OrderHistory[] = [];
  currentStatus: any;
  statusDisplay: any;
  orderProcessing = false;
  display = false;
  cancelledOrder = false;

  constructor(private store: Store<OrderTrackerState>,
    private orderTrackerService: OrderTrackerService,
    private route: ActivatedRoute,
    private router: Router,
    private queryStore: Store<QueryParamsState>
  ) {
    this.order$ = this.store.pipe(select(orderSelector));
    this.accessToken$ = this.store.pipe(select(orderTokenSelector));
    this.queryParams$ = this.store.pipe(select(queryParamsSelector));
  }

  async ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      this.queryStore.dispatch(OrderTrackerActions.setQueryParams({ queryParams: params }));
    });

    this.queryParams$.subscribe((queryParams: any) => {
      const referenceId = queryParams?.orderReferenceId;
      const email = queryParams?.email;

      if (!referenceId || !email) {
        this.router.navigate(['/order-tracker/error']);
      } else {
        this.accessToken$.subscribe((token: any) => {
          if (token && token.accessToken) {
            this.store.dispatch(OrderTrackerActions.orderFetchInit({
              token: token.accessToken,
              id: referenceId,
              email: email
            }));
          } else {
            this.store.dispatch(OrderTrackerActions.tokenFetchInit());
          }
        })
      }
    });

    this.order$.subscribe((order: any) => {
      if (order && 'orderDetails' in order) {
        this.orderDetails = order.orderDetails;
        this.orderHistory = order.orderHistory;
        this.currentStatus = this.orderHistory.length > 1 ?
          this.orderHistory[this.orderHistory.length - 1] :
          this.orderHistory[0];
        this.display = true;
        this.processStatus()
      }
    })
  }

  processStatus() {
    const status = `${this.currentStatus?.status}`.toUpperCase();
    const mappingData = ORDER_STATUS_MAPPING[status as keyof typeof ORDER_STATUS_MAPPING];
    this.statusDisplay = mappingData;
    if (status === ORDER_STATUS.ORDER_CONFIRMED) {
      const currentTimestamp = new Date(new Date(new Date().setHours(new Date().getHours() - 8)).toISOString());
      const statusTimestamp = new Date(this.orderHistory[0].timestamp);
      if (currentTimestamp > statusTimestamp) {
        this.statusDisplay.ongoing = true;
        this.statusDisplay.header = "Out for Delivery";
        this.statusDisplay.details = "Delivery estimates have been updated. You may check back later for the status.";
        this.statusDisplay.icon = "../../../assets/order-tracker/delivery.svg";
        this.orderProcessing = true;
      }
    }
    this.showQr = status === ORDER_STATUS.SIM_ACTIVATED && !this.statusDisplay.caution;
    this.cancelledOrder = status === ORDER_STATUS.CANCELLED;
  }

  formatDate(date: string): string {
    return this.orderTrackerService.formatDate(date, 'timestamp')
  }
}
