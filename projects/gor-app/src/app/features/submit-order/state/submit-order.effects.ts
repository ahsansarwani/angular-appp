import { Injectable } from '@angular/core';
import {
  act,
  Actions,
  concatLatestFrom,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { OrderActions } from './submit-order.actionTypes';
import { delay, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  catchError,
  map,
  mergeMap,
  of,
  from,
  withLatestFrom,
  timeout,
  TimeoutError,
} from 'rxjs';
import { OrderService } from './submit-order.service';
import { OrderState } from './submit-order.model';
import {
  paymentFetchdelayInterval,
  paymentRetryCount,
  timeOutInterval,
} from '../../../globals/config';
import { AppActions } from '../../../app-state/app.actionTypes';
import { DafReviewState } from '../../daf-review/state/daf-review.model';
import {
  payModeSelect,
  xenditTokenSelect,
} from '../../daf-review/state/daf-review.selectors';
import { EligibilityState } from '../../eligibility/state/eligibility.model';
import { settleInfoSelect } from '../../eligibility/state/eligibility.selectors';
import {
  payRetryCountSelect,
  retryCountSelect,
} from './submit-order.selectors';
import { CustomerTypeState } from '../../plan-selector/state/plan-selector.model';
import { GoogleTagManagerService } from '../../../app-state/gtm.service';
import {
  ADA_PAYMENT_SUCCESS,
  ADA_SUCCESS_PAGE,
  ADA_WITH_HB_OR_OB_PAYMENT_FAILED,
  FTA_PAYMENT_FAILED,
  FTA_PAYMENT_SUCCESS,
  FTA_SUCCESS_PAGE,
} from '../../../globals/gtm-events/plan-selector/events';
import { customerTypeSelect } from '../../plan-selector/state/plan-selector.selectors';
import { refIdSelect } from '../../otp/state/otp.selectors';
import { OtpState } from '../../otp/state/otp.reducer';

@Injectable()
export class OrderEffects {
  submitOrderInit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.submitOrderInit),
        mergeMap(async action => {
          const state = await this.orderService.getStates();
          return { paypending: action.paypending, state: state };
        }),
        mergeMap(values => {
          // console.log('state ------- ', state);
          return this.orderService.submitOrder(values.state).pipe(
            map((orderInfo: any) => {
              if ('data' in orderInfo) {
                // console.log('in if');
                if (values.paypending == true) {
                  return OrderActions.submitPendingOrderSuccess({
                    orderId: orderInfo.data.orderReferenceId,
                  });
                } else if (
                  orderInfo.data.isValid != undefined &&
                  orderInfo.data.isValid == true
                ) {
                  return OrderActions.submitOrderSuccess({
                    orderId: orderInfo.data.orderReferenceId,
                  });
                } else {
                  return OrderActions.submitLeadSuccess({
                    orderId: orderInfo.data.orderReferenceId,
                  });
                }
              } else {
                // console.log('in else block --- ', orderInfo);
                return OrderActions.submitOrderFail({
                  error: orderInfo.error,
                });
              }
            }),
            catchError(error => {
              // console.log('Eroor block ', error);
              return of(
                OrderActions.submitOrderFail({
                  error: {
                    message: 'CatchBlock',
                    details: 'CatchBlock',
                  },
                })
              );
            })
          );
        }),
        catchError(error =>
          of(
            OrderActions.submitOrderFail({
              error: {
                message: 'CatchBlock',
                details: 'CatchBlock',
              },
            })
          )
        )
      )
    // { dispatch: false }
  );

  submitLeadInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.submitLeadInit),
      mergeMap(action => {
        return this.orderService.submitLead().pipe(
          map((leadInfo: any) => {
            if ('data' in leadInfo) {
              //console.log('in if');
              //this.eligibilityService.getAccountDetails(action.mobileNo)
              return OrderActions.submitLeadSuccess({
                orderId: leadInfo.data.orderReferenceId,
              });
            } else {
              console.log('in else');
              return OrderActions.submitLeadFail({
                error: leadInfo.error,
              });
            }
          }),
          catchError(error =>
            of(
              OrderActions.submitLeadFail({
                error: {
                  message: 'CatchBlock',
                  details: 'CatchBlock',
                },
              })
            )
          )
        );
      }),
      catchError(error =>
        of(
          OrderActions.submitLeadFail({
            error: {
              message: 'CatchBlock',
              details: 'CatchBlock',
            },
          })
        )
      )
    )
  );

  paymentInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.paymentInit),
      concatLatestFrom(() => [
        this.dafReviewStore.select(payModeSelect),
        this.eligibilityStore.select(settleInfoSelect),
        this.dafReviewStore.select(xenditTokenSelect),
        this.otpStore.select(refIdSelect),
      ]),
      mergeMap(([action, payMode, settleInfo, tokenInfo, refId]) => {
        // if (action.pay == true) {
        if (payMode == 'gcash') {
          return this.orderService.createPaymentGcash(settleInfo, refId).pipe(
            map((paySession: any) => {
              if ('data' in paySession) {
                return OrderActions.paymentSessionSuccessGcash({
                  data: paySession.data,
                });
              } else {
                return OrderActions.paymentSessionFail();
              }
            }),
            catchError(error => of(OrderActions.paymentSessionFail()))
          );
        } else if (tokenInfo) {
          return this.orderService
            .createPaymentXendit(settleInfo, tokenInfo, refId)
            .pipe(
              delay(paymentFetchdelayInterval),
              map((paySession: any) => {
                if ('data' in paySession) {
                  return OrderActions.paymentSessionSuccessXendit({
                    data: paySession.data,
                  });
                } else {
                  return OrderActions.paymentSessionFail();
                }
              }),
              catchError(error => of(OrderActions.paymentSessionFail()))
            );
        } else {
          return of(AppActions.navigate({ from: '' }));
        }
        // } else {
        //   return of(AppActions.navigate({ from: 'ORDER_SUCCESS' }));
        // }
      }),
      catchError(error =>
        of(
          OrderActions.submitOrderFail({
            error: {
              message: 'CatchBlock',
              details: 'CatchBlock',
            },
          })
        )
      )
    )
  );

  leadSuccess$ = createEffect(() =>
    //we'll be in touch
    this.actions$.pipe(
      ofType(OrderActions.submitLeadSuccess),
      concatLatestFrom(() => [this.customerStore.select(customerTypeSelect)]),
      mergeMap(([action, customer]) => {
        return of(AppActions.navigate({ from: 'LEAD_SUCCESS' }));
      }),
      catchError(error =>
        of(
          OrderActions.submitLeadFail({
            error: {
              message: 'CatchBlock',
              details: 'CatchBlock',
            },
          })
        )
      )
    )
  );

  failureScenarios$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.submitOrderFail, OrderActions.submitLeadFail),
      mergeMap(action => {
        return of(AppActions.navigate({ from: 'ORDER_FAIL' }));
      })
    )
  );

  paymentFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        OrderActions.paymentSessionFail,
        OrderActions.getPaymentStatusFail
      ),
      concatLatestFrom(() => [this.customerStore.select(customerTypeSelect)]),
      mergeMap(([action, customer]) => {
        if (customer == 'FTA') {
          this.gtmService.captureGTMEvent(FTA_PAYMENT_FAILED);
        } else {
          this.gtmService.captureGTMEvent(ADA_WITH_HB_OR_OB_PAYMENT_FAILED);
        }
        return of(OrderActions.submitOrderInit({ paypending: false }));
      })
    )
  );

  paymentPending$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.getPaymentStatusPending),
      mergeMap(action => {
        return of(OrderActions.submitOrderInit({ paypending: true }));
      })
    )
  );

  paymentPendingOrder$ = createEffect(() =>
    // payment pending
    this.actions$.pipe(
      ofType(OrderActions.submitPendingOrderSuccess),
      concatLatestFrom(() => [this.customerStore.select(customerTypeSelect)]),
      mergeMap(([action, customer]) => {
        // if (customer == 'FTA') {
        // } else if (customer == 'ADA') {
        // }
        return of(AppActions.navigate({ from: 'PAYMENT_PENDING' }));
      })
    )
  );

  paymentSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        OrderActions.getPaymentStatusSuccessXendit,
        OrderActions.getPaymentStatusSuccessGcash
      ),
      concatLatestFrom(() => [this.customerStore.select(customerTypeSelect)]),
      mergeMap(([action, customer]) => {
        if (customer == 'FTA') {
          this.gtmService.captureGTMEvent(FTA_PAYMENT_SUCCESS);
        } else if (customer == 'ADA') {
          this.gtmService.captureGTMEvent(ADA_PAYMENT_SUCCESS);
        }
        return of(OrderActions.submitOrderInit({ paypending: false }));
      })
    )
  );

  submitOrderSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.submitOrderSuccess),
      concatLatestFrom(() => [this.customerStore.select(customerTypeSelect)]),
      mergeMap(([action, customer]) => {
        if (customer == 'FTA') {
          this.gtmService.captureGTMEvent(FTA_SUCCESS_PAGE);
        } else if (customer == 'ADA') {
          this.gtmService.captureGTMEvent(ADA_SUCCESS_PAGE);
        }
        return of(AppActions.navigate({ from: 'ORDER_SUCCESS' }));
      })
    )
  );

  paymentSessionSuccessGcash$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(OrderActions.paymentSessionSuccessGcash),
        tap(action => {
          const paymentUrl = action.data.url;
          window.location.href = paymentUrl;
        })
      ),
    { dispatch: false }
  );

  paymentSessionSuccessXendit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.paymentSessionSuccessXendit),
      concatLatestFrom(() => [
        this.orderStore.select(payRetryCountSelect),
        this.otpStore.select(refIdSelect),
      ]),
      mergeMap(([action, retryCount, refId]) => {
        if (action.data.paymentTokenId) {
          return this.orderService
            .getPaymentStatus(action.data.paymentTokenId, refId)
            .pipe(
              map((payStatus: any) => {
                // console.log('pay status', payStatus);
                // console.log(retryCount);
                // console.log(payStatus.data.status);
                if (
                  'data' in payStatus &&
                  payStatus.data.status == 'XENDIT_AUTHORISED'
                ) {
                  return OrderActions.getPaymentStatusSuccessXendit({
                    message: payStatus.data.status,
                  });
                } else if (
                  'data' in payStatus &&
                  (payStatus.data.status == 'PROCESSING' ||
                    payStatus.data.status == 'XENDIT_RECEIVED')
                ) {
                  return OrderActions.getPaymentStatusPending({
                    message: payStatus.data.status,
                  });
                } else if (
                  retryCount < paymentRetryCount &&
                  'data' in payStatus &&
                  (payStatus.data.status == 'XENDIT_REFUSED' ||
                    payStatus.data.status == 'XENDIT_CANCELLED' ||
                    payStatus.data.status == 'XENDIT_ERROR')
                ) {
                  return OrderActions.openRetryOption({
                    message: payStatus.data.status,
                  });
                } else {
                  return OrderActions.getPaymentStatusFail();
                }
              }),
              catchError(error => of(OrderActions.getPaymentStatusFail()))
            );
        } else {
          return of(OrderActions.getPaymentStatusFail());
        }
      }),
      catchError(error => of(OrderActions.getPaymentStatusFail()))
    )
  );

  getPaymentStatusGcash$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.getPaymentStatusGcash),
      concatLatestFrom(() => [
        this.orderStore.select(payRetryCountSelect),
        this.otpStore.select(refIdSelect),
      ]),
      mergeMap(([action, retryCount, refId]) => {
        return this.orderService
          .getPaymentStatus(action.paymentTokenId, refId)
          .pipe(
            map((payStatus: any) => {
              // console.log('pay status', action.paymentTokenId);
              // console.log(retryCount);
              // console.log(payStatus.data.status);
              if (
                'data' in payStatus &&
                payStatus.data.status == 'GCASH_AUTHORISED'
              ) {
                // return OrderActions.openRetryOption({
                //   message: payStatus.data.status,
                // });
                return OrderActions.getPaymentStatusSuccessGcash({
                  message: payStatus.data.status,
                });
              } else if (
                'data' in payStatus &&
                (payStatus.data.status == 'PROCESSING' ||
                  payStatus.data.status == 'GCASH_RECEIVED')
              ) {
                return OrderActions.getPaymentStatusPending({
                  message: payStatus.data.status,
                });
              } else if (
                retryCount < paymentRetryCount &&
                'data' in payStatus &&
                (payStatus.data.status == 'GCASH_REFUSED' ||
                  payStatus.data.status == 'GCASH_CANCELLED' ||
                  payStatus.data.status == 'GCASH_ERROR')
              ) {
                return OrderActions.openRetryOption({
                  message: payStatus.data.status,
                });
              } else {
                return OrderActions.getPaymentStatusFail();
              }
            }),
            catchError(error => {
              return of(OrderActions.getPaymentStatusFail());
            })
          );
      }),
      catchError(error => {
        console.log('Error', error);
        return of(OrderActions.getPaymentStatusFail());
      })
    )
  );

  retryPayment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(OrderActions.openRetryOption),
      concatLatestFrom(() => [this.orderStore.select(payRetryCountSelect)]),
      mergeMap(([action, retryCount]) => {
        if (retryCount < paymentRetryCount) {
          return of(AppActions.navigate({ from: 'PAY_RETRY_GCASH' }));
        } else {
          return of(AppActions.navigate({ from: 'PAY_RETRY_EXCEED' }));
        }
      })
    )
  );

  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private orderStore: Store<OrderState>,
    private dafReviewStore: Store<DafReviewState>,
    private eligibilityStore: Store<EligibilityState>,
    private customerStore: Store<CustomerTypeState>,
    private otpStore: Store<OtpState>,
    private gtmService: GoogleTagManagerService
  ) {}
}
