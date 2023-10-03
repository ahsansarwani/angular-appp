import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { GoogleTagManagerService } from 'projects/gor-app/src/app/app-state/gtm.service';
import {
  ADA_GET_YOUR_SIM_NOW,
  ADA_WITH_HB_OR_OB_PAY_NOW_AND_SUBMIT,
  ECOMM_REVIEW_CLICK,
  FTA_GET_YOUR_SIM_NOW,
  FTA_HB_PAY_NOW_AND_SUBMIT,
} from 'projects/gor-app/src/app/globals/gtm-events/plan-selector/events';
import { toRoute } from 'projects/gor-app/src/app/globals/redirection-links';
import { firstValueFrom, Observable, Subject } from 'rxjs';
import { DAFFillState } from '../../../daf-fill/state/daf-fill.model';
import { fullNameSelector } from '../../../daf-fill/state/daf-fill.selector';
import { CustomerTypeState } from '../../../plan-selector/state/plan-selector.model';
import { customerTypeSelect } from '../../../plan-selector/state/plan-selector.selectors';
import { DafReviewActions } from '../../state/daf-review.actionTypes';
import { DafReviewState } from '../../state/daf-review.model';
import {
  buttonText,
  isPaymentModeVisible,
  isTncChecked,
  payModeSelect,
} from '../../state/daf-review.selectors';

@Component({
  selector: 'gor-review-details',
  templateUrl: './review-details.component.html',
  styleUrls: ['./review-details.component.scss'],
})
export class ReviewDetailsComponent {
  buttonText$: any;
  fullName$: Observable<string>;
  btnText: any;
  isTncChecked$: Observable<any>;
  btnEnabled: any;
  payModeSelect$: Observable<string>;
  isPaymentModeVisible$: Observable<any>;
  mode: string | undefined;
  paymentModeVisibility: any;
  openDrawer: Subject<void> = new Subject<void>();
  daf: string | undefined;
  customerType$: Observable<string | undefined>;

  constructor(
    private store: Store<DafReviewState>,
    private daFillStore: Store<DAFFillState>,
    private customer: Store<CustomerTypeState>,
    private gtmService: GoogleTagManagerService
  ) {
    this.buttonText$ = this.store.pipe(select(buttonText));
    this.isTncChecked$ = this.store.pipe(select(isTncChecked));
    this.fullName$ = this.daFillStore.pipe(select(fullNameSelector));
    this.payModeSelect$ = this.store.pipe(select(payModeSelect));
    this.isPaymentModeVisible$ = this.store.pipe(select(isPaymentModeVisible));
    this.customerType$ = this.customer.pipe(select(customerTypeSelect));
  }

  ngOnInit() {
    this.daf = toRoute.daf;
  }

  async proceed() {
    this.paymentModeVisibility = await firstValueFrom(
      this.isPaymentModeVisible$
    );
    this.mode = await firstValueFrom(this.payModeSelect$);

    const customerType = await firstValueFrom(this.customerType$);

    if (customerType == 'FTA' && this.paymentModeVisibility) {
      this.gtmService.captureGTMEvent(FTA_HB_PAY_NOW_AND_SUBMIT);
    } else if (customerType == 'FTA' && !this.paymentModeVisibility) {
      this.gtmService.captureGTMEvent(FTA_GET_YOUR_SIM_NOW);
    } else if (customerType == 'ADA' && this.paymentModeVisibility) {
      this.gtmService.captureGTMEvent(ADA_WITH_HB_OR_OB_PAY_NOW_AND_SUBMIT);
    } else if (customerType == 'ADA' && !this.paymentModeVisibility) {
      this.gtmService.captureGTMEvent(ADA_GET_YOUR_SIM_NOW);
    }
    this.triggerGAEvent(customerType);

    if (
      this.mode === 'xendit' &&
      this.paymentModeVisibility &&
      this.paymentModeVisibility == true
    ) {
      this.openDrawer.next();
    } else {
      this.store.dispatch(DafReviewActions.getSim());
    }
  }

  triggerGAEvent(customerType: any) {
    const eventInfo = ECOMM_REVIEW_CLICK;
    this.gtmService.captureEcommEvent(eventInfo);
  }
}
