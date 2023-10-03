import { Component} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DafReviewState } from '../../state/daf-review.model';
import { DafReviewActions } from '../../state/daf-review.actionTypes';
import { paymentModes } from 'projects/gor-app/src/dummy-data';
import { GoogleTagManagerService } from 'projects/gor-app/src/app/app-state/gtm.service';
import { ADA_HB_GCASH, ADA_HB_XENDIT, FTA_HB_GCASH, FTA_HB_XENDIT } from 'projects/gor-app/src/app/globals/gtm-events/plan-selector/events';
import { CustomerTypeState } from '../../../plan-selector/state/plan-selector.model';
import { customerTypeSelect } from '../../../plan-selector/state/plan-selector.selectors';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'gor-payment-mode',
  templateUrl: './payment-mode.component.html',
  styleUrls: ['./payment-mode.component.scss'],
})
export class PaymentModeComponent {
  paymentMode: any = paymentModes;
  btnStyle = '';
  selectedId = '';
  customerType$: any;
  ngOnInit() {}
  constructor(private reviewStore: Store<DafReviewState>,private gtmService: GoogleTagManagerService,  private customer: Store<CustomerTypeState>,) {
    this.customerType$ = this.customer.pipe(select(customerTypeSelect));
  }

  async onSelect(event: any, id: any) {
    console.log("Event is ",event)
    const customerType = await firstValueFrom(this.customerType$);
    if(customerType=='FTA' && event.target.innerText=='GCash'){
      this.gtmService.captureGTMEvent(FTA_HB_GCASH);
    }
    else if(customerType=='FTA' && event.target.innerText=='Visa/Mastercard'){
      this.gtmService.captureGTMEvent(FTA_HB_XENDIT);
    }
    if(customerType=='ADA' && event.target.innerText=='GCash'){
      this.gtmService.captureGTMEvent(ADA_HB_GCASH);
    }
    else if(customerType=='ADA' && event.target.innerText=='Visa/Mastercard'){
      this.gtmService.captureGTMEvent(ADA_HB_XENDIT);
    }
    this.btnStyle = 'btn-change';
    this.selectedId = id;
    const el: HTMLElement | null = document.getElementById(id);
    el?.classList.toggle(this.btnStyle);

    if (!el?.classList.contains(this.btnStyle)) {
      this.reviewStore.dispatch(DafReviewActions.payMode({ mode: undefined }));
    } else {
      this.reviewStore.dispatch(DafReviewActions.payMode({ mode: id }));
      if (id == 'gcash') {
        document.getElementById('xendit')?.classList.remove(this.btnStyle);
      }
      if (id == 'xendit') {
        document.getElementById('gcash')?.classList.remove(this.btnStyle);
      }
    }
  }
}
