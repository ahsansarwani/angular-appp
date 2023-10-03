import { Component, ElementRef, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { dummyModal, dummyModal2 } from 'projects/gor-app/src/dummy-data';
import { Observable } from 'rxjs';
import { AppActions } from '../../../app-state/app.actionTypes';
import { GoogleTagManagerService } from '../../../app-state/gtm.service';
import {
  ECOMM_ADD_CART,
  EVT_HOMEPAGE_ADD_NEW_ACCOUNT,
  EVT_HOMEPAGE_POPUP_ALREADY_HAVE_ACCOUNT,
  EVT_HOMEPAGE_POPUP_NEW_TO_GLOBE,
  EVT_HOMEPAGE_RENEW_ACCOUNT,
} from '../../../globals/gtm-events/plan-selector/events';
import { redirectionLinks } from '../../../globals/redirection-links';
import { PlanBuilderService } from '../../shared/components/plan-builder/services/plan-builder.service';
import { PlanActions } from '../state/plan-selector.actionTypes';
import { CustomerTypeState, LobState } from '../state/plan-selector.model';
import { lobState } from '../state/plan-selector.selectors';
declare let bootstrap: any;
@Component({
  selector: 'gor-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  features = [
    '20GB All Access Data',
    'Unli Allnet Calls & Text + Landline',
    '3GB GoWiFi Access',
  ];
  tags: any = ['Basic'];
  planDetails = [
    'GPlan PLUS 999',
    'All-access Data',
    '20 GB',
    'App Data',
    'Unlimited',
  ];
  @Input() card: any | undefined;

  modal1 = dummyModal;
  modal2 = dummyModal2;

  isInnerModalVisibile = false;
  backgroundColor: any;
  primaryColor: any;
  secondaryColor: any;
  badgeColor: any;
  dataFeatureColor: any;
  globeOne: any;
  outerModal: any;
  isVisible = false;
  isConfirmLoading = false;

  lobType$: Observable<string | undefined>;
  lobType: string | undefined;

  constructor(
    private _planBuilder: PlanBuilderService,
    private store: Store<CustomerTypeState>,
    private lobStore: Store<LobState>,
    private gtmService: GoogleTagManagerService
  ) {
    this.lobType$ = this.lobStore.pipe(select(lobState));
    this.lobType$.subscribe(val => (this.lobType = val));
  }
  captureEvent() {
    this.gtmService.captureGTMEvent(EVT_HOMEPAGE_POPUP_ALREADY_HAVE_ACCOUNT);
  }
  onOpenDrawer(card: any, type: string) {
    console.log('Card is gtm : ', type);
    this.triggerGAEvent(card, type);
    if (type == 'FTA') {
      this.gtmService.captureGTMEvent(EVT_HOMEPAGE_POPUP_NEW_TO_GLOBE);
    } else if (type == 'ADA') {
      this.gtmService.captureGTMEvent(EVT_HOMEPAGE_ADD_NEW_ACCOUNT);
    }

    // console.log('Should open drawer');
    this.isVisible = false;
    this.store.dispatch(PlanActions.customerType({ customerType: type }));

    if (this.lobType === 'Mobile') {
      if (card.hasUnli) this._planBuilder.openDrawer(card, 0);
      else {
        this.store.dispatch(
          PlanActions.planSelection({
            plan: card,
            from: 'PLAN_SELECT_MOBILE',
          })
        );
      }
    } else {
      this.store.dispatch(
        PlanActions.planSelection({
          plan: card,
          from: 'PLAN_SELECT_OTHER',
        })
      );
    }
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  renewAccount(): void {
    this.gtmService.captureGTMEvent(EVT_HOMEPAGE_RENEW_ACCOUNT);
    this.isVisible = false;
    window.location.href = redirectionLinks.renewal;
  }

  showInnerModal(): void {
    this.isInnerModalVisibile = true;
  }

  handleInnerModalOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isInnerModalVisibile = false;
      this.isConfirmLoading = false;
    }, 1000);
  }
  hideInnerModal() {
    const modal = document.getElementById('innerModal')!;
    modal?.classList.remove('show');
    modal?.classList.add('hide');
    modal.style.display = 'none';
    console.log('Inner modal is', modal);
  }

  handleInnerModalCancel(): void {
    this.isInnerModalVisibile = false;
  }
  onBack() {
    console.log('back clicked');
    const closeButton = document.getElementById('close-modal');
    closeButton?.click();
    //   const innerModalElement = document.getElementById('innerModal');
    const outerModalElement = document.getElementById('outerModal');
    // Open outer modal
    const outerModal = new bootstrap.Modal(outerModalElement);
    outerModal.show();
    //   if (innerModalElement && outerModalElement) {
    //     // Close inner modal
    //     const innerModal = new bootstrap.Modal(innerModalElement);
    //     innerModal.hide();

    //     // Open outer modal
    //     const outerModal = new bootstrap.Modal(outerModalElement);
    //     outerModal.show();
    //   }
  }

  triggerGAEvent(card: any, customer: string) {
    const eventInfo = ECOMM_ADD_CART;
    eventInfo.ecommerce.add.products[0].name = card.planName;
    eventInfo.ecommerce.add.products[0].category = customer;
    eventInfo.ecommerce.add.products[0].price = card.amount;
    eventInfo.ecommerce.add.products[0].variant = 'sim-only-' + card.planName;
    this.gtmService.captureEcommEvent(eventInfo);
  }
}
