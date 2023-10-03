import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, delay, mergeMap, of, tap } from 'rxjs';
import { AppActions } from '../../../app-state/app.actionTypes';
import { paymentRetryCount, timeOutInterval } from '../../../globals/config';
import { OrderActions } from '../../submit-order/state/submit-order.actionTypes';
import { OrderState } from '../../submit-order/state/submit-order.model';
import { payRetryCountSelect } from '../../submit-order/state/submit-order.selectors';
import { DafReviewActions } from './daf-review.actionTypes';
import { CardValidator } from './daf-review.validator';
@Injectable()
export class DAFReviewEffects {
  getSim$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DafReviewActions.getSim),
      mergeMap(action => {
        return of(AppActions.navigate({ from: 'DAF_REVIEW' }));
      }),
      catchError(error => of(AppActions.navigate({ from: 'DAF_REVIEW_ERROR' })))
    )
  );

  xenditInit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DafReviewActions.initXendit),
        tap(action => {
          this.xenditService.getToken(
            action.cardNo,
            action.validity,
            action.cvn
          );
        })
      ),
    { dispatch: false }
  );

  callBackSuccessXendit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DafReviewActions.callBackSuccessXendit),
      delay(3000),
      mergeMap(action => {
        console.log('Triggering navigate');
        return of(AppActions.navigate({ from: 'DAF_REVIEW' }));
      }),
      catchError(error => of(AppActions.navigate({ from: 'PAY_XENDIT_ERROR' })))
    )
  );

  checkRetry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DafReviewActions.failXendit),
      concatLatestFrom(() => [this.orderStore.select(payRetryCountSelect)]),
      mergeMap(([action, retryCount]) => {
        // console.log('cheking retry pay');
        // console.log(retryCount, paymentRetryCount);
        if (retryCount < paymentRetryCount) {
          return of(OrderActions.openRetryOption({ message: '' }));
        } else {
          return of(AppActions.navigate({ from: 'PAY_RETRY_EXCEED' }));
        }
      }),
      catchError(error => of(AppActions.navigate({ from: 'PAY_XENDIT_ERROR' })))
    )
  );

  constructor(
    private actions$: Actions,
    private xenditService: CardValidator,
    private orderStore: Store<OrderState>
  ) {}
}
