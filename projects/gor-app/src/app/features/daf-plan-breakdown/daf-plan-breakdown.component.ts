import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  PlanBreakDown,
  PlanState,
} from '../plan-selector/state/plan-selector.model';
import { planBreakdownSelect } from '../plan-selector/state/plan-selector.selectors';

@Component({
  selector: 'gor-daf-plan-breakdown',
  templateUrl: './daf-plan-breakdown.component.html',
  styleUrls: ['./daf-plan-breakdown.component.scss'],
})
export class DafPlanBreakdownComponent implements OnInit {
  // @Input()
  planDetails$!: Observable<PlanBreakDown>;
  planTitle$?: Observable<string>;
  allAccessData$?: Observable<string>;
  goWIFI$?: Observable<string>;
  callNText$?: Observable<string>;
  contractDuration$?: Observable<string>;
  hasUnli$?: Observable<boolean>;
  unliAppName$?: Observable<string>;
  unliAppPath$?: Observable<string>;

  constructor(private planStore: Store<PlanState>) {
    this.planDetails$ = this.planStore.pipe(select(planBreakdownSelect));
  }

  selectedValue = {
    id: 'mobile-legends',
    nameOfApp: 'mobile legends',
    svgPath: 'assets/images/svg/mobile-legends.svg',
    altText: 'mobile legends SVG Image',
  };
  ngOnInit(): void {
    this.planDetails$.subscribe((val: PlanBreakDown) => {
      this.planTitle$ = of(val.planTitle);
      this.allAccessData$ = of(val.dataContent.replace('G', ' G'));
      this.goWIFI$ = of(val.goWifi.replace('G', ' G'));
      this.callNText$ = of(val.callNText);
      this.contractDuration$ = of(val.contractDuration);
      this.hasUnli$ = of(val.hasUnli);
      this.unliAppName$ = of(val.selectedUnliAppName);
      this.unliAppPath$ = of(val.selectedAppImage);
    });
  }
}
