import { Component, Input, OnInit } from '@angular/core';
import { ORDER_STATUS, STEPS_CONTENT, STEPS_CONTENT_CANCELLED } from '../../state/order-tracker.constants';
import { OrderTrackerService } from '../../state/order-tracker.service';

@Component({
  selector: 'gor-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  @Input() orderHistory: any;
  @Input() currentStatus: any;
  @Input() orderProcessing = false;
  @Input() showQr = false;
  steps: any;

  constructor(private orderTrackerService: OrderTrackerService) { }

  ngOnInit(): void {
    this.processOrderHistory();
  }

  ngOnChanges(changes: any) {
    this.orderHistory = changes.orderHistory ? changes.orderHistory.currentValue : this.orderHistory;
    this.currentStatus = changes.currentStatus ? changes.currentStatus.currentValue : this.currentStatus;
    this.orderProcessing = changes.orderProcessing ? changes.orderProcessing.currentValue : this.orderProcessing;
    this.showQr = changes.showQr ? changes.showQr.currentValue : this.showQr;
    this.processOrderHistory();
  }

  processOrderHistory() {
    if (this.currentStatus?.toUpperCase() === ORDER_STATUS.CANCELLED) {
      this.steps = STEPS_CONTENT_CANCELLED;
    } else {
      this.steps = STEPS_CONTENT;
    }

    for (const order of this.orderHistory) {
      const orderStatus = order?.status.toUpperCase();
      this.steps.map((step: any) => {
        if (step.status === orderStatus) {
          step.date = this.formatDate(order.timestamp)
          step.ongoing = false;
        }
      });

      if (this.orderProcessing) {
        this.steps[1].icon = '../../assets/order-tracker/step-ongoing-delivery.svg';
        this.steps[1].ongoing = true;
      } else if (orderStatus === ORDER_STATUS.SIM_ACTIVATED) {
        this.steps[this.steps.length - 1].date = ' ';
        this.steps[this.steps.length - 1].download = true;
        this.steps[2].downloadMobile = true;
        this.steps[2].icon = '../../assets/order-tracker/step-success-download.svg';
        this.steps[this.steps.length - 1].icon = '../../assets/order-tracker/step-success-download.svg';
      }
    }
  }

  formatDate(date: string): string {
    return this.orderTrackerService.formatDate(date, 'timestamp')
  }
}
