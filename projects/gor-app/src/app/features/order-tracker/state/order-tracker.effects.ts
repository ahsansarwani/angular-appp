import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { OrderTrackerActions } from './order-tracker.actionTypes';
import { catchError, map, mergeMap, of, take, tap } from 'rxjs';
import { OrderTrackerService } from './order-tracker.service';
import { AppActions } from '../../../app-state/app.actionTypes';
import { AppState } from '../../../app-state/app.model';
import { Store } from '@ngrx/store';
import { retryCountSelector } from './order-tracker.selectors';
import { OrderTrackerState } from './order-tracker.model';
import { ERROR_CODES } from './order-tracker.constants';

@Injectable()
export class OrderTrackerEffect {

  constructor(
    private actions$: Actions,
    private orderTrackerService: OrderTrackerService,
    private store: Store<AppState>,
    private orderTrackerStore: Store<OrderTrackerState>
  ) { }

  orderTokenFetchInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderTrackerActions.tokenFetchInit),
      mergeMap(() => {
        return this.orderTrackerService.fetchOrderToken().pipe(
          take(1),
          map((tokenResponse: any) => {
            if ('accessToken' in tokenResponse) {
              return OrderTrackerActions.tokenFetchSuccess({
                tokenData: tokenResponse,
              });
            } else {
              return OrderTrackerActions.tokenFetchFail(tokenResponse.error);
            }
          }),
          catchError(() =>
            of(
              OrderTrackerActions.tokenFetchFail({
                error: {
                  message: '',
                  details: '',
                },
              })
            )
          ));
      })
    ));

  orderFetchInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderTrackerActions.orderFetchInit),
      concatLatestFrom(() => [
        this.orderTrackerStore.select(retryCountSelector),
      ]),
      mergeMap(([action, retryCount]) => {
        return this.orderTrackerService.fetchOrderDetails(
          action.token,
          action.id,
          action.email
        ).pipe(
          take(1),
          map((orderResponse: any) => {
            if ('result' in orderResponse) {
              OrderTrackerActions.updateRetryCount({ retryCount: 0 })
              return OrderTrackerActions.orderFetchSuccess({
                orderData: orderResponse.result
              });
            } else if ('error' in orderResponse
              && (orderResponse.error.code === ERROR_CODES.EXPIRED_TOKEN || 
                  orderResponse.error.code === ERROR_CODES.INVALID_TOKEN)
              && retryCount < 3) {
              return OrderTrackerActions.updateRetryCount({ retryCount: retryCount + 1 })
            } else {
              return OrderTrackerActions.orderFetchFail(orderResponse.error);
            }
          }),
          catchError(() =>
            of(
              OrderTrackerActions.orderFetchFail({
                error: {
                  message: '',
                  details: '',
                },
              })
            )
          ));
      })
    ));

  apiFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          OrderTrackerActions.tokenFetchFail,
          OrderTrackerActions.orderFetchFail,
        ),
        tap(() => {
          this.store.dispatch(
            AppActions.navigate({ from: 'ORDER_TRACKER' })
          );
        })
      ),
    { dispatch: false }
  );

  updateRetryCount$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderTrackerActions.updateRetryCount),
        tap(() => {
          this.store.dispatch(OrderTrackerActions.tokenFetchInit());
        })
      ),
    { dispatch: false }
  );
}
