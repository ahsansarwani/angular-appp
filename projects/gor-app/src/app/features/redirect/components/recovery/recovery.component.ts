import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppActions } from 'projects/gor-app/src/app/app-state/app.actionTypes';
import { AppState } from 'projects/gor-app/src/app/app-state/app.model';
import { PlanActions } from '../../../plan-selector/state/plan-selector.actionTypes';
import { PlanState } from '../../../plan-selector/state/plan-selector.model';
import { PlanSelectorService } from '../../../plan-selector/state/plan-selector.service';
import { RedirectActions } from '../../state/redirect.actionTypes';
import { RedirectState } from '../../state/redirect.model';

@Component({
  selector: 'gor-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss'],
})
export class RecoveryComponent {
  response: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<RedirectState>,
    private appStore: Store<AppState>,
    private planStore: Store<PlanState>,
    private service: PlanSelectorService
  ) {
    this.appStore.dispatch(AppActions.initApp());
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: any) => {
      this.response = { ...params.keys, ...params };
      // console.log('respone', this.response);
      console.log('params obj', this.response.params);
      this.store.dispatch(
        RedirectActions.initRecovery({
          orderId: this.response.params.orderId,
        })
      );
      this.planStore.dispatch(
        PlanActions.lobType({ deviceType: this.service.getDeviceType() })
      );
    });
  }
}
