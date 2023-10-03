import { Component, Output, Input, EventEmitter } from '@angular/core';
import { PlanBuilderService } from '../../../shared/components/plan-builder/services/plan-builder.service';
import { dummyModal, dummyModal2 } from '../../../../../dummy-data';
import { CustomerTypeState } from '../../state/plan-selector.model';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { customerTypeSelect } from '../../state/plan-selector.selectors';
import { redirectionLinks } from 'projects/gor-app/src/app/globals/redirection-links';
import { environment } from 'projects/gor-app/src/environments/environment';
import { swiperArray } from 'projects/gor-app/src/data';
import { GoogleTagManagerService } from 'projects/gor-app/src/app/app-state/gtm.service';
import {
  EVT_BUTTON_1299,
  EVT_BUTTON_1499,
  EVT_BUTTON_1799,
  EVT_BUTTON_1999,
  EVT_BUTTON_2499,
  EVT_BUTTON_3799,
  EVT_BUTTON_4999,
  EVT_BUTTON_599,
  EVT_BUTTON_799,
  EVT_BUTTON_7999,
  EVT_BUTTON_999,
} from '../../../../globals/gtm-events/plan-selector/events';
declare let bootstrap: any;
@Component({
  selector: 'gor-inner-card',
  templateUrl: './inner-card.component.html',
  styleUrls: ['./inner-card.component.scss'],
})
export class InnerCardComponent {
  @Input() card: any | undefined;
  @Input() selectedCard: any | undefined;
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();
  @Input() subCard: any;
  @Input() planType: any;
  @Input() deviceType: any;
  swiperArray = swiperArray;
  isInnerModalVisibile = false;
  customerType$: Observable<string | undefined>;
  backgroundColor: any;
  primaryColor: any;
  secondaryColor: any;
  badgeColor: any;
  dataFeatureColor: any;
  globeOne: any;
  outerModal: any;
  marginTop: any;
  contentColor: any;
  background: string | undefined;
  constructor(
    private _planBuilder: PlanBuilderService,
    private store: Store<CustomerTypeState>,
    private gtmService: GoogleTagManagerService
  ) {
    this.customerType$ = this.store.pipe(select(customerTypeSelect));
    this.globeOne = environment.superAppUrl;
  }

  onOpenDrawer(card: any, type: string) {
    this.isVisible = false;
    console.log('drawer open');
    // this._planBuilder.openDrawer(card, 0);
    // this.store.dispatch(PlanActions.customerType({ customerType: type }));
  }
  onOpenInnerDrawer() {
    this.isInnerModalVisibile = false;
    // this._planBuilder.openDrawer();
  }
  onBuy() {
    alert('Buy Clicked');
  }
  isVisible = false;
  isConfirmLoading = false;

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
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
    const modal = document.getElementById('innerModal');
  }

  handleInnerModalCancel(): void {
    this.isInnerModalVisibile = false;
  }

  modal1 = dummyModal;
  modal2 = dummyModal2;

  ngOnInit() {
    if (this.subCard?.planType === 'platinum') {
      this.marginTop = '0';
      this.background =
        'linear-gradient(159.97deg, rgba(175, 197, 222, 0.368627) 21.34%, rgba(255, 255, 255, 0.368627) 53%, rgba(197, 223, 255, 0.368627) 80.78%)';
      this.contentColor = '#BF9890';
    } else {
      this.marginTop = '8';
      this.contentColor = '#2274E5';
      this.background = '#fff';
    }
  }

  showOuterModal(card: any) {
    this.buttonClicked.emit(card);
  }
  triggerGTMEvent(card: any) {
    if (card.amount == 599) {
      this.gtmService.captureGTMEvent(EVT_BUTTON_599);
    } else if (card.amount == 799) {
      this.gtmService.captureGTMEvent(EVT_BUTTON_799);
    } else if (card.amount == 999) {
      this.gtmService.captureGTMEvent(EVT_BUTTON_999);
    } else if (card.amount == 1299) {
      this.gtmService.captureGTMEvent(EVT_BUTTON_1299);
    } else if (card.amount == 1499) {
      this.gtmService.captureGTMEvent(EVT_BUTTON_1499);
    } else if (card.amount == 1799) {
      this.gtmService.captureGTMEvent(EVT_BUTTON_1799);
    } else if (card.amount == 1999) {
      this.gtmService.captureGTMEvent(EVT_BUTTON_1999);
    } else if (card.amount == 2499) {
      this.gtmService.captureGTMEvent(EVT_BUTTON_2499);
    } else if (card.amount == 3799) {
      this.gtmService.captureGTMEvent(EVT_BUTTON_3799);
    } else if (card.amount == 4999) {
      this.gtmService.captureGTMEvent(EVT_BUTTON_4999);
    } else if (card.amount == 7999) {
      this.gtmService.captureGTMEvent(EVT_BUTTON_7999);
    }
  }

  buyClick(card: any) {
    this.triggerGTMEvent(card);
    this.buttonClicked.emit(swiperArray[card.index]);
  }

  buyClickRedirect(card: any, event: any) {
    event.preventDefault();
    this.triggerGTMEvent(card);
    window.location.href = card.redirectionLink;
  }

  async redirectToURL(url: string) {
    try {
      const newWindow = window.open(url, '_blank');
    } catch (error) {
      console.error('Error while opening new page:', error);
    }
  }

  redirectToLink(event: any) {
    console.log('Event on card click: ', event);
    this.redirectToURL(this.subCard.redirectionLink);
  }
}
