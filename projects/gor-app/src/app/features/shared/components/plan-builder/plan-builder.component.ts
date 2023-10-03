import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NzDrawerModule, NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { PlanBuilderService } from './services/plan-builder.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { BreakpointObserver } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { InnerCard } from '../../../plan-selector/components/inner-card/inner-card.model';
import { PlanActions } from '../../../plan-selector/state/plan-selector.actionTypes';
import { PlanState } from '../../../plan-selector/state/plan-selector.model';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { planSelect } from '../../../plan-selector/state/plan-selector.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'gor-plan-builder',
  templateUrl: './plan-builder.component.html',
  styleUrls: ['./plan-builder.component.scss'],
})
export class PlanBuilderComponent implements OnInit {
  @Input() planDetails?: string[];
  @Input() planAmount = 'Plan 999';

  unliDetails: string =
    `<b>Unli</b>` +
    `App: Free data access* for 6 months. Select one (1) app from the list. Scroll down to see all apps.

  *Subscription not included.`;

  drawerOpenFlag = false;
  openIdModalFlag = false;
  drawerWidth = '378px';
  isSelected = false;
  nzPlacement: NzDrawerPlacement = 'right';

  cardDetails?: InnerCard;
  selectedApp?: string;
  selectedAppImage?: string;
  sendPlan: any;
  planSelect$: Observable<InnerCard | undefined>;

  openIdModal() {
    this.openIdModalFlag = true;
    this._planBuilder.openIdModal();
  }

  constructor(
    private _planBuilder: PlanBuilderService,
    private _breakpointObserver: BreakpointObserver,
    private _overlayContainer: OverlayContainer,
    private store: Store<PlanState>,
    private _route: Router
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

  ngOnInit(): void {
    this._planBuilder.drawerOpen$.subscribe(res => {
      this.cardDetails = res;
      this.planAmount = res.planName;
      this.planDetails = [];
      this.planDetails.push(res.dataContent + ' All Access Data');
      this.planDetails.push(...res.planFeatures);
      this.open();
    });
  }

  onAppSelected(app: any) {
    this.selectedApp = app.nameOfApp;
    this.selectedAppImage = app.svgPath;
    this.isSelected = app ? true : false;
  }

  onInfoIconOfUnliList() {
    console.log('on info icon of unli list');
  }

  open(): void {
    const isDesktop = this._breakpointObserver.isMatched('(min-width: 768px)'); // Adjust the breakpoint as needed
    if (isDesktop) {
      this.nzPlacement = 'right';
      this._overlayContainer
        .getContainerElement()
        .classList.add('custom-drawer-right'); // Add custom CSS class
    } else {
      this.nzPlacement = 'bottom';
      this._overlayContainer
        .getContainerElement()
        .classList.remove('custom-drawer-right'); // Remove custom CSS class
    }
    this.drawerOpenFlag = true;
  }

  close(): void {
    this.openIdModalFlag = false;
    this.drawerOpenFlag = false;
  }

  onProceed(event: any) {
    this.sendPlan = {
      ...this.cardDetails,
      selectedUnliApp: this.selectedApp,
      selectedAppImage: this.selectedAppImage,
    };

    // this._route.navigate(['/daf-scan']);
    this.store.dispatch(
      PlanActions.planSelection({ plan: this.sendPlan, from: 'PLAN_SELECTOR' })
    );
  }
}
