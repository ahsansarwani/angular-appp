import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { PlanActions } from './plan-selector.actionTypes';
import { tap, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app-state/app.model';
import { AppActions } from '../../../app-state/app.actionTypes';
import { CustomerTypeState } from './plan-selector.model';
import { customerTypeSelect } from './plan-selector.selectors';
import { of } from 'rxjs';

@Injectable()
export class PlanEffects {
  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlanActions.planSelection, PlanActions.unliSelection),
        tap(action => {
          // console.log('plan selected - ', action);
          if (
            action.type === '[Plan Selector Page] Plan Selection' &&
            action.from === 'PLAN_SELECT_MOBILE'
          ) {
            this.store.dispatch(AppActions.navigate({ from: action.from }));
          } else if (
            action.type === '[Plan Selector Page] Plan Selection' &&
            action.from === 'CHANGE_PLAN'
          ) {
            console.log('[Plan Selector Page] Plan Selection \n CHANGE_PLAN');
          } else {
            if (
              action.type === '[Plan Selector Page] Plan Selection' &&
              action.plan.hasUnli === true
            ) {
              this.store.dispatch(
                AppActions.navigate({ from: 'OTHER_UNLI_SELECT' })
              );
            } else {
              this.store.dispatch(
                AppActions.navigate({ from: 'PLAN_SELECT_OTHER' })
              );
            }
          }
          // this.store.select();
        })
      ),
    { dispatch: false }
  );

  customerselect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PlanActions.customerType),
        tap(action => {
          console.log('customer type triggered - ', action);
          // this.store.dispatch(AppActions.navigate({from:"PLAN_SELECTOR"}));
          // console.log("verify success effect triggered - ",action);
          // this.store.dispatch(AppActions.navigate());
          // this.store.select();
        })
      ),
    { dispatch: false }
  );

  initChatBot$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlanActions.planSelection),
      concatLatestFrom(() => [this.customerStore.select(customerTypeSelect)]),
      mergeMap(([action, type]) => {
        if (type == 'FTA') return of(AppActions.initChatToken());
        return of(AppActions.navigate({ from: '' }));
      })
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private customerStore: Store<CustomerTypeState>
  ) {}
}
