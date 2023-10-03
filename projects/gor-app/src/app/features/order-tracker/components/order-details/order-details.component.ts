import { Component, Input, OnInit } from '@angular/core';
import { PLANS, PLAN_599_DETAILS, PLAN_799_DETAILS, PLAN_999_DETAILS } from '../../state/order-tracker.constants';

@Component({
  selector: 'gor-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit{

  @Input() referenceNo = '';
  @Input() planName = '';
  @Input() orderDate = '';

  openDropdown = false;
  planDetails: any;

  ngOnInit(): void {
    switch(this.planName.toUpperCase()) {
      case (PLANS.PLAN_599): this.planDetails = PLAN_599_DETAILS; break;
      case (PLANS.PLAN_799): this.planDetails = PLAN_799_DETAILS; break;
      case (PLANS.PLAN_999): this.planDetails = PLAN_999_DETAILS; break;
    }
  }

  ngOnChanges(changes: any) {
    let planName = changes.planName ? changes.planName.currentValue : this.planName;
    switch(planName.toUpperCase()) {
      case (PLANS.PLAN_599): this.planDetails = PLAN_599_DETAILS; break;
      case (PLANS.PLAN_799): this.planDetails = PLAN_799_DETAILS; break;
      case (PLANS.PLAN_999): this.planDetails = PLAN_999_DETAILS; break;
    }
  }
}
