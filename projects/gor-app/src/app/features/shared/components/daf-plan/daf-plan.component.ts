import {
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  LobState,
  PlanBreakDown,
  PlanState,
} from '../../../plan-selector/state/plan-selector.model';
import {
  lobState,
  planBreakdownSelect,
} from '../../../plan-selector/state/plan-selector.selectors';
import { PlanBuilderService } from '../plan-builder/services/plan-builder.service';

@Component({
  selector: 'gor-daf-plan',
  templateUrl: './daf-plan.component.html',
  styleUrls: ['./daf-plan.component.scss'],
})
export class DafPlanComponent implements OnInit, AfterViewInit {
  @Input() styles: any;
  @Input() styles2: any;
  planDetails$!: Observable<PlanBreakDown>;
  planTitle$?: Observable<string>;
  viewingPlanBreakDown = false;
  lob$: Observable<string | undefined>;

  constructor(
    private _planBuilder: PlanBuilderService,
    private planStore: Store<PlanState>,
    private lobStore: Store<LobState>
  ) {
    this.lob$ = this.lobStore.pipe(select(lobState));
    this.planDetails$ = this.planStore.pipe(select(planBreakdownSelect));
  }
  //null - Change plan
  onChangePlan() {
    console.log('in daf-plan');
    this._planBuilder.openDrawer(null, 1);
  }

  ngOnInit(): void {
    this.planDetails$.subscribe((val: any) => {
      this.planTitle$ = of(val.planTitle);
    });
  }

  onViewPlanBreakDown() {
    this.viewingPlanBreakDown = !this.viewingPlanBreakDown;
  }
  ngAfterViewInit() {
    console.log(window.innerWidth);
    // if (window.innerWidth >= 888) {
    //   this.viewingPlanBreakDown = true;
    // }
  }
}
