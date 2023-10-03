import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { PlanState } from '../../../plan-selector/state/plan-selector.model';
import {
  planAmountSelect,
  planTitleSelect,
} from '../../../plan-selector/state/plan-selector.selectors';
import { DafReviewState } from '../../state/daf-review.model';
import {
  overdueBalanceList,
  historicBalanceList,
  customerType,
  overdueBalanceTitle,
  historicBalanceTitle,
  payTodayTotal,
  hbTotal,
  obTotal,
  planInfo,
  isPaymentModeVisible,
  payStatusSelect,
} from '../../state/daf-review.selectors';

@Component({
  selector: 'gor-pay-today',
  templateUrl: './pay-today.component.html',
  styleUrls: ['./pay-today.component.scss'],
})
export class PayTodayComponent {
  @Input() payToday: any | undefined;

  customerType$: Observable<any>;
  showOverdueBalanceListTitle$: Observable<any>;
  showHistoricBalanceListTitle$: Observable<any>;
  overdueBalanceList$: Observable<any>;
  historicBalanceList$: Observable<any>;
  planInfo$: Observable<any>;
  planAmount$: Observable<string>;
  payToday$: Observable<any>;
  payTodayNumber$: Observable<any>;
  hbTotal$: Observable<any | undefined>;
  obTotal$: Observable<any | undefined>;
  planTitle$: Observable<string>;
  isPaymentModeVisible$: Observable<boolean>;
  showHBTitle: any;
  showOBTitle: any;
  _payToday: any;
  _hbTotal: any;
  _obTotal: any;
  planInfo: any;
  amountVal: any;
  payTodayNum: any;
  payTodayAmt: any;

  constructor(
    private store: Store<DafReviewState>,
    private planStore: Store<PlanState>
  ) {
    this.customerType$ = this.store.pipe(select(customerType));
    this.overdueBalanceList$ = this.store.pipe(select(overdueBalanceList));
    this.historicBalanceList$ = this.store.pipe(select(historicBalanceList));
    this.payToday$ = this.store.pipe(select(payTodayTotal));
    this.hbTotal$ = this.store.pipe(select(hbTotal));
    this.obTotal$ = this.store.pipe(select(obTotal));
    this.isPaymentModeVisible$ = this.store.pipe(select(isPaymentModeVisible));
    this.planInfo$ = this.planStore.pipe(select(planInfo));
    this.planAmount$ = this.planStore.pipe(select(planAmountSelect));
    this.planTitle$ = this.planStore.pipe(select(planTitleSelect));
    this.payTodayNumber$=this.store.pipe(select(payStatusSelect));
    this.showOverdueBalanceListTitle$ = this.store.pipe(
      select(overdueBalanceTitle)
    );
    this.showHistoricBalanceListTitle$ = this.store.pipe(
      select(historicBalanceTitle)
    );
  }
  async ngOnInit() {
    const cType = await firstValueFrom(this.customerType$);
   
    // setTimeout(async () => {
    const historicList = await firstValueFrom(this.historicBalanceList$);
    const overdueList = await firstValueFrom(this.overdueBalanceList$);
     this._payToday = await firstValueFrom(this.payToday$);
  
    this._hbTotal = await firstValueFrom(this.hbTotal$);
    this._obTotal = await firstValueFrom(this.obTotal$);

    this.planInfo = await firstValueFrom(this.planInfo$);
    this.payTodayAmt=await firstValueFrom( this.payTodayNumber$);
    if (historicList.length > 0) {
      this.showHBTitle = true;
    }
    if (overdueList.length > 0) {
      this.showOBTitle = true;
    }
    // console.log('PT HBlist', this.showHBTitle);
    // console.log('PT OBlist', this.showOBTitle);
    // }, 2000);
  }

  rotateArrow() {
    const tgt = document.getElementById('arrow-icon')!;
    if (tgt.classList.contains('menu-arrow-down')) {
      tgt.classList.toggle('open');
    }
  }
}
