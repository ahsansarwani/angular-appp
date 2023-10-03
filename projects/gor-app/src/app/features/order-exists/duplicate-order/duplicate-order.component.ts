import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { environment } from 'projects/gor-app/src/environments/environment';
import { Observable } from 'rxjs';
import { GoogleTagManagerService } from '../../../app-state/gtm.service';
import {
  FTA_DUPLICATE_PAGE_CANCEL,
  FTA_DUPLICATE_PAGE_PROCEED,
} from '../../../globals/gtm-events/plan-selector/events';
import { DAFFillState } from '../../daf-fill/state/daf-fill.model';
import { nameFtaSelector } from '../../daf-fill/state/daf-fill.selector';
import { EligibilityState } from '../../eligibility/state/eligibility.model';
import {
  fnameAdaSelector,
  pendingStatusSelect,
  prevOrderIdSelect,
  prevPlanTitleSelect,
  prevsubmitDateSelect,
  prevupdateDateSelect,
} from '../../eligibility/state/eligibility.selectors';
import { CustomerTypeState } from '../../plan-selector/state/plan-selector.model';
import {
  customerTypeSelect,
  planTitleSelect,
} from '../../plan-selector/state/plan-selector.selectors';

@Component({
  selector: 'gor-duplicate-order',
  templateUrl: './duplicate-order.component.html',
  styleUrls: ['./duplicate-order.component.scss'],
})
export class DuplicateOrderComponent implements OnInit {
  refId = 'GLS-1234567890';
  pendingOrder$: Observable<boolean>;
  planName$: Observable<string>;
  prevPlanName$: Observable<string>;
  prevOrderId$: Observable<string>;
  customerType$: Observable<string | undefined>;
  fNameFta$: Observable<string | undefined>;
  fNameAda$: Observable<string | undefined>;
  submitDate$: Observable<Date>;
  updateDate$: Observable<Date>;
  firstName: any;
  dialogContent = '';
  homeUrl: string = environment.homeUrl;
  constructor(
    private eligibilityStore: Store<EligibilityState>,
    private dafFillStore: Store<DAFFillState>,
    private customerStore: Store<CustomerTypeState>,
    private gtmService: GoogleTagManagerService
  ) {
    this.pendingOrder$ = this.eligibilityStore.pipe(
      select(pendingStatusSelect)
    );
    this.prevPlanName$ = this.eligibilityStore.pipe(
      select(prevPlanTitleSelect)
    );
    this.prevOrderId$ = this.eligibilityStore.pipe(select(prevOrderIdSelect));
    this.planName$ = this.eligibilityStore.pipe(select(planTitleSelect));
    this.customerType$ = this.customerStore.pipe(select(customerTypeSelect));
    this.fNameFta$ = this.dafFillStore.pipe(select(nameFtaSelector));
    this.fNameAda$ = this.eligibilityStore.pipe(select(fnameAdaSelector));
    this.submitDate$ = this.eligibilityStore.pipe(select(prevsubmitDateSelect));
    this.updateDate$ = this.eligibilityStore.pipe(select(prevupdateDateSelect));

    this.customerType$.subscribe(customer => {
      if (customer == 'ADA') {
        this.fNameAda$.subscribe(fname => (this.firstName = fname));
      } else if (customer == 'FTA') {
        this.fNameFta$.subscribe(fname => (this.firstName = fname));
      } else {
        this.firstName = '';
      }
    });
  }
  ngOnInit(): void {
    this.message = `Hi ${this.firstName}! It seems you have a previous order`;
    this.planLabel = 'for confirmation';
    this.planLabel2 = 'Current';
    this.planLabel3 = 'Processing';
    // this.dateOfSubmition.date = 'May 01, 2023';
    // this.dateOfSubmition.time = '03:35pm';
    this.dateOfSubmition.text = 'Date Submitted';
    // this.dateOfLastUpdate.date = 'May 02, 2023';
    // this.dateOfLastUpdate.time = '04:26pm';
    this.dateOfLastUpdate.text = 'Date Last Updated';
    this.dateOfSubmition2.date = 'May 02, 2023';
    this.dateOfSubmition2.time = '02:35pm';
    this.dateOfSubmition2.text = 'Date Submitted';
    this.dateOfLastUpdate2.date = 'May 02, 2023';
    this.dateOfLastUpdate2.time = '02:35pm';
    this.dateOfLastUpdate2.text = 'Date Last Updated';
    this.paymentBlockTitle =
      'Would you like to proceed with your current order?';
  }

  disableProceed = false;
  buttonText = 'Yes, proceed with my current order';
  buttonText2 = 'No, cancel my current order';
  buttonText3 = 'Go back to homepage';
  onProceed(value: any) {
    if (value == true) {
      this.gtmService.captureGTMEvent(FTA_DUPLICATE_PAGE_PROCEED);
    } else if (value == false) {
      this.gtmService.captureGTMEvent(FTA_DUPLICATE_PAGE_CANCEL);
    }
    this.isVisible = true;
    this.dialogContent = value
      ? 'If you proceed with your current order, your previous order will be cancelled.'
      : 'Are you sure you want to cancel this order?';
  }
  onGoBack() {
    window.location.href = this.homeUrl;
  }
  user = 'Cyrus';
  message = '';
  planAmount = 599;
  planText = '';
  planLabel = '';
  planLabel2 = '';
  planLabel3 = '';
  paymentBlockTitle = '';
  prevOrderTitle =
    'Your previous order is now being processed and will be ready soon. Thank you!';
  dateOfSubmition = {
    date: '',
    time: '',
    text: '',
  };
  dateOfLastUpdate = {
    date: '',
    time: '',
    text: '',
  };
  dateOfSubmition2 = {
    date: '',
    time: '',
    text: '',
  };
  dateOfLastUpdate2 = {
    date: '',
    time: '',
    text: '',
  };
  onClickDialogbutton(value: any) {
    alert(value ? 'Yes' : 'No');
    this.isVisible = false;
  }
  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }
  onCloseModal(): void {
    this.isVisible = false;
  }
}
