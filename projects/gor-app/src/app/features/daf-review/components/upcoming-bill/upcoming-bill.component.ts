import { Component, Input, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PlanState } from '../../../plan-selector/state/plan-selector.model';
import {
  payableAmtSelect,
  planAmountSelect,
  planTitleSelect,
} from '../../../plan-selector/state/plan-selector.selectors';

@Component({
  selector: 'gor-upcoming-bill',
  templateUrl: './upcoming-bill.component.html',
  styleUrls: ['./upcoming-bill.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UpcomingBillComponent {
  @Input() bill: any | undefined;
  sampleBillLink="../../../../../assets/sample_bill_link.jpg";
  planTitle$: Observable<string>;
  planAmount$: Observable<string>;
  payableAmt$: Observable<string>;
  text: string | undefined;
  viewBreakdown = 'View Breakdown';
  hideBreakdown = 'Hide Breakdown';

  constructor(private planStore: Store<PlanState>) {
    this.planTitle$ = this.planStore.pipe(select(planTitleSelect));
    this.planAmount$ = this.planStore.pipe(select(planAmountSelect));
    this.payableAmt$ = this.planStore.pipe(select(payableAmtSelect));
  }

  ngOnInit() {
    console.log('bill details', this.bill);
    this.text = this.viewBreakdown;
  }
  changeText() {
    if (this.text == this.viewBreakdown) {
      this.text = this.hideBreakdown;
    } else if (this.text == this.hideBreakdown) {
      this.text = this.viewBreakdown;
    }
  }
}
