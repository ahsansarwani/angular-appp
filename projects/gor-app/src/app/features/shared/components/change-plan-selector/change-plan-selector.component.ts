import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NzDrawerModule, NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { PlanBuilderService } from '../plan-builder/services/plan-builder.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BreakpointObserver } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { InnerCard } from '../../../plan-selector/components/inner-card/inner-card.model';
import { PlanActions } from '../../../plan-selector/state/plan-selector.actionTypes';
import { PlanState } from '../../../plan-selector/state/plan-selector.model';
import { first, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { planSelect } from '../../../plan-selector/state/plan-selector.selectors';
import { Router } from '@angular/router';
import {
  dummyCard1,
  dummyCard2,
  dummyCard3,
  dummyInnerCard2,
  dummyInnerCard3,
} from 'projects/gor-app/src/dummy-data';
import { AppState } from 'projects/gor-app/src/app/app-state/app.model';
import { PbButtonComponent } from '../pb-button/pb-button.component';
import { IdModalComponent } from '../id-modal/id-modal.component';
import { UnliListComponent } from '../plan-builder/components/unli-list/unli-list.component';
import { CommonModule } from '@angular/common';
import { SelectedPlanComponent } from '../selected-plan/selected-plan.component';
import { GoogleTagManagerService } from 'projects/gor-app/src/app/app-state/gtm.service';
import { EVT_HOMEPAGE_BUTTON_PROCEED } from 'projects/gor-app/src/app/globals/gtm-events/plan-selector/events';

declare let bootstrap: any;

@Component({
  selector: 'gor-change-plan-selector',
  standalone: true,
  imports: [
    CommonModule,
    PbButtonComponent,
    NzDrawerModule,
    IdModalComponent,
    UnliListComponent,
    SelectedPlanComponent,
  ],
  templateUrl: './change-plan-selector.component.html',
  styleUrls: ['./change-plan-selector.component.scss'],
})
export class ChangePlanSelectorComponent implements OnInit {
  tags: any = ['Basic'];
  planDetails2: any = [
    'GPlan PLUS 999',
    'All-access Data',
    '20 GB',
    'App Data',
    'Unlimited',
  ];
  finalPlan: any;
  selectedCard: any;
  finalCard: any;
  prevCard: any;
  proceedFlag = true;
  @Input() openChangePlan = false;
  @Input() showIdModal = false;
  @Output() idClick = new EventEmitter();
  title = 'Basic Plan';
  expand = false;
  toggle(card: any) {
    this.expand = !this.expand;
  }

  @Input() planDetails?: string[];
  @Input() planAmount = 'Plan 999';
  selectedPlan: any;
  prevPlan: any;

  unliDetails: string =
    `<b>Unli</b>` +
    `App: Free data access* for 6 months. Select one (1) app from the list. Scroll down to see all apps.

  *Subscription not included.`;

  drawerOpenFlag = false;

  drawerWidth = '378px';
  isSelected = false;
  nzPlacement: NzDrawerPlacement = 'right';

  cardDetails?: InnerCard;
  selectedApp?: string;
  selectedAppName?: string;
  selectedAppImage?: string;
  sendPlan: any;
  planSelect$: Observable<InnerCard | undefined>;

  openIdModal() {
    this._planBuilder.openIdModal();
  }

  constructor(
    private _planBuilder: PlanBuilderService,
    private _breakpointObserver: BreakpointObserver,
    private _overlayContainer: OverlayContainer,
    private store: Store<PlanState>,
    private _store: Store<AppState>,
    private _route: Router,
    private gtmService: GoogleTagManagerService
  ) {
    this.planSelect$ = this.store.pipe(select(planSelect));
  }

  items = [
    '<gor-logos-svg></gor-logos-svg>',
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
  ];
  array = [dummyCard1, dummyCard2, dummyCard3];
  dropDownArray: any = [];
  changing = false;
  ngOnInit(): void {
    // this.array.forEach(option => {
    //   const obj = { expanded: false, ...option };
    //   this.dropDownArray.push(obj);
    // });
    this.array[0].innerCard = this.array[0].innerCard?.reverse(); //Sort in descending
    this.dropDownArray = [this.array[0]];

    this.store.pipe(select(planSelect), first()).subscribe((data: any) => {
      console.log(data);
      this.dropDownArray.forEach((drop: any) => {
        drop.innerCard.forEach((ele: any) => {
          if (ele.planName === data.planName) {
            drop.expanded = true;
          }
        });
      });
      this.planAmount = data?.planName;
      this.selectedPlan = data?.planName;
      this.selectedCard = data;
      this.finalCard = data;
      console.log('FinalCard after subscribe::', this.finalCard);
      this.prevCard = data;
      // console.log('dataaa', data);
      let aD = data.accessData;
      if (aD && aD.includes(' ')) aD = data.accessData.replace(' ', '');
      const accessData = aD + ' ' + data.accessDataTitle;
      if (data.planFeatures)
        this.planDetails = [accessData, ...data.planFeatures];
    });

    this._planBuilder.drawerOpen$.subscribe(res => {
      console.log('res', res);
      if (!res.user) {
        this.changing = false;
        this.finalCard = res.card;
        console.log('FinalCard after drawer opening:', this.finalCard);
        this.finalPlan = res.card;
        this.cardDetails = res.card;

        this.planAmount = res.card.planName_;
        this.planDetails = [];
        let aD = res.card.accessData;
        if (aD && aD.includes(' ')) aD = aD.replace(' ', '');
        const accessData = aD + ' ' + res.card.accessDataTitle;
        this.planDetails = [accessData, ...res.card.planFeatures];

        if (this.finalPlan.dataFeature !== 'Unli Data for 1 Chosen App') {
          this.isSelected = false;
        }
      } else {
        console.log(this.selectedCard);
        console.log(this.prevCard);
        console.log(this.finalCard);
        this.changing = true;
      }

      this.open();
    });
  }

  onAppSelected(app: any) {
    this.selectedApp = app.id;
    this.selectedAppName = app.nameOfApp;
    this.selectedAppImage = app.svgPath;
    this.isSelected = app ? true : false;
  }

  // drawerHeight = 480;

  onDrawerHeight() {
    return 'auto';
  }
  open(): void {
    // const isDesktop = this._breakpointObserver.isMatched('(min-width: 768px)'); // Adjust the breakpoint as needed
    // if (isDesktop) {
    // this.nzPlacement = 'right';
    // this._overlayContainer
    //   .getContainerElement()
    //   .classList.add('custom-drawer-right'); // Add custom CSS class
    // } else {
    this.nzPlacement = 'bottom';
    this._overlayContainer
      .getContainerElement()
      .classList.remove('custom-drawer-right'); // Remove custom CSS class
    this.drawerOpenFlag = true;
    this.openChangePlan = true;
    // }

    setTimeout(() => {
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );

      const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
          title: 'temp',
          container: '#tooltipContainer',
          placement: 'top',
          template: `<div class="tooltip" role="tooltip" style="--bs-tooltip-bg:#1F3B59;">
            <div style="display:none;" class="tooltip-inner"></div>
            <div style="background:#1F3B59;border-radius:8px;padding:16px;">
              <span style="color:#8EBAFA">Unli app</span><span style="color:#fff">: Free data access for 6<br>months to one app of your choice.
              <br>Scroll down to see all the apps and
              <br>tap on an image to select one. 
              <br><br><sup>*</sup>Subscription not included.
              </span>
            </div>
            <div class="tooltip-arrow" style="position:relative;left:-30px;top:-10px;margin-left:auto;"><svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.7321 15C9.96225 16.3333 8.03775 16.3333 7.26795 15L0.339745 3C-0.430055 1.66667 0.532196 1.78935e-06 2.0718 1.65476e-06L15.9282 4.43391e-07C17.4678 3.08794e-07 18.4301 1.66667 17.6603 3L10.7321 15Z" fill="#1F3B59"/></svg></div>
          </div>`,
        });
      });
    }, 500);
  }

  close(proceed: boolean): void {
    this.isSelected = false;

    this.drawerOpenFlag = false;
    this.openChangePlan = false;
    this.finalPlan = '';
    if (proceed) {
      //proceed
    } else {
      //just close

      this.selectedCard = this.prevCard;
      this.finalCard = this.prevCard;
      this.selectedPlan = this.prevCard.planName;
      this.planAmount = this.prevCard.planName;
    }
  }

  onProceed(event: any) {
    this.selectedCard = this.finalCard;
    this.prevCard = this.selectedCard;

    this.gtmService.captureGTMEvent(EVT_HOMEPAGE_BUTTON_PROCEED);
    if (this.changing) {
      this.prevPlan = this.finalPlan;
      this.sendPlan = {
        ...this.finalCard,
        selectedUnliAppName: this.selectedAppName,
        selectedUnliApp: this.selectedApp,
        selectedAppImage: this.selectedAppImage,
      };
      this.close(true);
      this.store.dispatch(
        PlanActions.planSelection({ plan: this.sendPlan, from: 'CHANGE_PLAN' })
      );
    } else {
      this.sendPlan = {
        ...this.cardDetails,
        selectedUnliAppName: this.selectedAppName,
        selectedUnliApp: this.selectedApp,
        selectedAppImage: this.selectedAppImage,
      };
      this.store.dispatch(
        PlanActions.planSelection({
          plan: this.sendPlan,
          from: 'PLAN_SELECT_MOBILE',
        })
      );
    }
    // console.log('Procceed', this.sendPlan);
    // this._route.navigate(['/daf-scan']);
  }

  onPlanSelect(card: any) {
    this.selectedPlan = card.planName;
    this.selectedCard = card;

    this.planDetails = card.planFeatures;
    if (this.planDetails) {
      this.proceedFlag = true;
    }
  }

  onInfoIconOfUnliList() {}

  disableProceed() {
    console.log(
      'PLan AMOUNT:',
      this.planAmount,
      Number(this.planAmount.split(' ')[1])
    );
    const amount = Number(this.planAmount.split(' ')[1]);
    console.log(amount > 799);
    console.log(!this.isSelected);
    console.log(amount > 799 && !this.isSelected);
    return amount > 799 && !this.isSelected;
  }
  
  onChoose(event: any) {
    this.isSelected = false;
    //
    this.prevPlan = this.planAmount;
    this.planAmount = this.selectedPlan;

    if (event) {
      this.finalPlan = this.selectedPlan;
      this.prevCard = this.finalCard;
      this.finalCard = this.selectedCard;
      let aD = this.finalCard.accessData;
      if (aD && aD.includes(' '))
        aD = this.finalCard.accessData.replace(' ', '');
      const accessData = aD + ' ' + this.finalCard.accessDataTitle;
      this.planDetails = [accessData, ...this.finalCard.planFeatures];
    }
  }
}
