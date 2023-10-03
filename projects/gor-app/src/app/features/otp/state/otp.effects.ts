import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { OtpActions } from './otp.actionTypes';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of } from 'rxjs';
import { OtpService } from './otp.service';
import { Store } from '@ngrx/store';
import {
  AppState,
  ErrorResponse,
  SuccessResponse,
} from '../../../app-state/app.model';
import { AppActions } from '../../../app-state/app.actionTypes';
import { VerifyResponse } from './otp.model';
import { HttpResponse } from '@angular/common/http';
import { CustomerTypeState } from '../../plan-selector/state/plan-selector.model';
import { customerTypeSelect } from '../../plan-selector/state/plan-selector.selectors';
import { OrderState } from '../../submit-order/state/submit-order.model';
import { orderIdSelector } from '../../submit-order/state/submit-order.selectors';
import { OtpState } from './otp.reducer';
import { refIdSelect } from './otp.selectors';

@Injectable()
export class OtpEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OtpActions.init),
      mergeMap(action => {
        // console.log('side effects start', action.mobileNo);
        return this.otpService.initOtp(action.mobileNo).pipe(
          map((otpInfo: any) => {
            // console.log("Got account info - ", accountInfo);
            if ('data' in otpInfo) {
              //this.eligibilityService.getAccountDetails(action.mobileNo)
              return OtpActions.initSuccess({
                referenceId: otpInfo.data.referenceId,
              });
            } else {
              return OtpActions.initFailure(otpInfo.error);
            }
          }),
          catchError(error =>
            of(
              OtpActions.initFailure({
                error: {
                  message: '',
                  details: '',
                },
              })
            )
          )
        );
      })
    )
  );

  verify$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OtpActions.verifyInit),
      mergeMap(action => {
        console.log('received code - ', action.code);
        return this.otpService.verifyOtp(action.code.toString()).pipe(
          map((verifyInfo: SuccessResponse | ErrorResponse) => {
            if ('data' in verifyInfo) {
              return OtpActions.verifyRequestSuccessValid();
            } else {
              console.log('Verify info - ', verifyInfo.error);
              if (verifyInfo.error.status == 400) {
                return OtpActions.verifyRequestSuccessInvalid(verifyInfo);
              } else {
                return OtpActions.verifyRequestFail();
              }
              // if(verifyInfo.error.stat)
            }
          }),
          catchError(error => {
            console.log('error', error);
            return of(OtpActions.verifyRequestFail());
          })
        );
      })
    )
  );

  verifySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OtpActions.verifyRequestSuccessValid),
      concatLatestFrom(() => [
        this.customerStore.select(customerTypeSelect),
        this.orderStore.select(orderIdSelector),
      ]),
      map(([action, customer, orderId]) => {
        // console.log('verify success effect triggered - ', action);
        if (customer == 'RECOVERY') {
          return OtpActions.fetchOrderRecovery({ orderId: orderId });
        } else {
          return AppActions.navigate({ from: 'OTP_VERIFIED' });
        }
      })
    )
  );

  fetchRecovery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OtpActions.fetchOrderRecovery),
      concatLatestFrom(() => [this.otpStore.select(refIdSelect)]),
      mergeMap(([action, otpRefId]) => {
        // console.log('received code - ', action.code);
        return this.otpService
          .fetchRecoveryState(action.orderId, otpRefId ? otpRefId : '')
          .pipe(
            map((orderState: any) => {
              if ('data' in orderState) {
                return OtpActions.fetchOrderRecoverySuccess({
                  state: orderState.data.state,
                });
              } else {
                return OtpActions.fetchOrderRecoveryFail();
              }
            }),
            catchError(error => {
              console.log('error', error);
              return of(OtpActions.fetchOrderRecoveryFail());
            })
          );
      })
    )
  );

  recoverySuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OtpActions.fetchOrderRecoverySuccess),
      map(action => {
        // console.log('verify success effect triggered - ', action);
        return AppActions.navigate({ from: 'OTP_VERIFIED' });
      })
    )
  );

  recoveryFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OtpActions.fetchOrderRecoveryFail),
      map(action => {
        // console.log('verify success effect triggered - ', action);
        return AppActions.navigate({ from: 'RECOVERY_FAIL' });
      })
    )
  );

  initFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OtpActions.initFailure, OtpActions.verifyRequestFail),
        tap(action => {
          // console.log('verify success effect triggered - ', action);
          this.store.dispatch(AppActions.navigate({ from: 'OTP_FAIL' }));
        })
      ),
    { dispatch: false }
  );

  goBack$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OtpActions.goBack),
      concatLatestFrom(() => [this.customerStore.select(customerTypeSelect)]),
      map(([action, customer]) => {
        if (customer == 'FTA') {
          return AppActions.navigate({
            from: 'OTP_BACK_FTA',
          });
        } else {
          return AppActions.navigate({
            from: 'OTP_BACK_ADA',
          });
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private otpService: OtpService,
    private router: Router,
    private customerStore: Store<CustomerTypeState>,
    private orderStore: Store<OrderState>,
    private otpStore: Store<OtpState>,
    private store: Store<AppState>
  ) {}
}
