import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { tap, timeout } from 'rxjs/operators';
import { catchError, map, mergeMap, of, TimeoutError } from 'rxjs';
import { ReducerManager, Store } from '@ngrx/store';
import { AppActions } from '../../../app-state/app.actionTypes';
import { RedirectService } from './redirect.service';
import { RedirectActions } from './redirect.actionTypes';
import { RecoveryState, RedirectState } from './redirect.model';
import { timeOutInterval, zolozRetryCount } from '../../../globals/config';
import { CustomerTypeState } from '../../plan-selector/state/plan-selector.model';
import { customerTypeSelect } from '../../plan-selector/state/plan-selector.selectors';
import { ChatState } from '../../../app-state/app.model';
import { tokenSelect } from '../../../app-state/app.selectors';
import { recoveryDetailsCheck, recoverySelect } from './redirect.selector';
import { DAFScanState } from '../../daf-scan/state/daf-scan.model';
import {
  idCheckRetrySelector,
  selectedIdNameSelector,
  selectedNationSelector,
} from '../../daf-scan/state/daf-scan.selectors';
import { DAFFillState } from '../../daf-fill/state/daf-fill.model';
import { recoveryFormDetailsCheck } from '../../daf-fill/state/daf-fill.selector';
import moment from 'moment';
import { OtpState } from '../../otp/state/otp.reducer';
import { refIdSelect } from '../../otp/state/otp.selectors';

@Injectable()
export class RedirectEffects {
  initSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RedirectActions.checkResultSuccessInit),
      concatLatestFrom(() => [
        this.recoveryStore.select(recoverySelect),
        this.dafScanStore.select(selectedNationSelector),
        this.dafScanStore.select(selectedIdNameSelector),
        this.otpStore.select(refIdSelect),
      ]),
      mergeMap(([action, recovery, nationality, idName, refId]) => {
        // console.log('side effects start', action.mobileNo);
        return this.redirectService
          .checkResultSuccessCallback(action.transactionId, refId)
          .pipe(
            timeout(timeOutInterval),
            map((checkResult: any) => {
              if (
                checkResult.ekycResult &&
                checkResult.ekycResult.toLowerCase() === 'success'
              ) {
                if (recovery == true) {
                  return RedirectActions.checkResultSuccessRecovery({
                    ...checkResult,
                    nationality: nationality,
                    idName: idName,
                  });
                } else {
                  return RedirectActions.successCheckResultSuccess(checkResult);
                }
              } else {
                if (recovery == true) {
                  return RedirectActions.checkResultFailRecovery(checkResult);
                } else {
                  return RedirectActions.successCheckResultFail(checkResult);
                }
              }
            }),
            catchError(error => {
              if (error instanceof TimeoutError) {
                if (recovery == true) {
                  return of(
                    RedirectActions.checkResultFailRecovery({
                      error: { message: 'Timeout', details: '' },
                    })
                  );
                }
                return of(
                  RedirectActions.successCheckResultFail({
                    error: { message: 'Timeout', details: '' },
                  })
                );
              } else {
                console.log(error);
                if (recovery == true) {
                  return of(
                    RedirectActions.checkResultFailRecovery({
                      error: { message: 'CatchBlock', details: '' },
                    })
                  );
                }
                return of(
                  RedirectActions.successCheckResultFail({
                    error: { message: 'CatchBlock', details: '' },
                  })
                );
              }
            })
          );
      })
    )
  );

  initFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RedirectActions.checkResultFailInit),
      concatLatestFrom(() => [
        this.recoveryStore.select(recoverySelect),
        this.otpStore.select(refIdSelect),
      ]),
      mergeMap(([action, recovery, refId]) => {
        // console.log('side effects start', action.mobileNo);
        return this.redirectService
          .checkResultFailCallback(action.transactionId, refId)
          .pipe(
            timeout(timeOutInterval),
            map((checkResult: any) => {
              if (
                checkResult.ekycResult &&
                checkResult.ekycResult.toLowerCase() === 'success'
              ) {
                if (recovery == true) {
                  return RedirectActions.checkResultSuccessRecovery(
                    checkResult
                  );
                } else {
                  return RedirectActions.failCheckResultSuccess(checkResult);
                }
              } else {
                if (recovery == true) {
                  return RedirectActions.checkResultFailRecovery(checkResult);
                } else {
                  return RedirectActions.failCheckResultFail(checkResult);
                }
              }
            }),
            catchError(error => {
              if (error instanceof TimeoutError) {
                if (recovery == true) {
                  return of(
                    RedirectActions.checkResultFailRecovery({
                      error: { message: 'Timeout', details: '' },
                    })
                  );
                }
                return of(
                  RedirectActions.failCheckResultFail({
                    error: { message: 'Timeout', details: '' },
                  })
                );
              } else {
                console.log(error);
                if (recovery == true) {
                  return of(
                    RedirectActions.checkResultFailRecovery({
                      error: { message: 'CatchBlock', details: '' },
                    })
                  );
                }
                return of(
                  RedirectActions.failCheckResultFail({
                    error: { message: 'CatchBlock', details: '' },
                  })
                );
              }
            })
          );
      })
    )
  );

  succesCheckResultSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        RedirectActions.successCheckResultSuccess,
        RedirectActions.failCheckResultSuccess
      ),
      map(action => {
        return AppActions.navigate({ from: 'ZOLOZ_SUCCESS' });
      })
    )
  );

  recoveryCheckResultSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RedirectActions.checkResultSuccessRecovery),
      concatLatestFrom(() => [
        this.dafFillStore.select(recoveryFormDetailsCheck),
      ]),
      map(([action, formDetails]) => {
        console.log('idcheck', action);
        console.log('formdetails', formDetails);
        console.log(action.FIRST_NAME?.toUpperCase() == formDetails.firstName);
        console.log(
          action.MIDDLE_NAME?.toUpperCase() == formDetails.middleName
        );
        console.log(action.LAST_NAME?.toUpperCase() == formDetails.lastName);
        console.log(
          action.GENDER
            ? action.GENDER.toUpperCase()[0] == formDetails.gender
            : action.SEX?.toUpperCase()[0] == formDetails.gender
        );

        const id_dob: moment.Moment = moment(
          action.DATE_OF_BIRTH,
          'YYYY/MM/DD'
        );
        const form_dob: moment.Moment = moment(
          formDetails.birthday,
          'YYYY-MM-DD'
        );

        console.log(id_dob.isSame(form_dob));

        if (
          action.FIRST_NAME &&
          action.MIDDLE_NAME &&
          action.LAST_NAME &&
          action.DATE_OF_BIRTH &&
          (action.GENDER || action.SEX) &&
          formDetails.firstName &&
          formDetails.middleName &&
          formDetails.lastName &&
          formDetails.birthday &&
          formDetails.gender &&
          action.FIRST_NAME.toUpperCase() == formDetails.firstName &&
          action.MIDDLE_NAME.toUpperCase() == formDetails.middleName &&
          action.LAST_NAME.toUpperCase() == formDetails.lastName &&
          id_dob.isSame(form_dob) &&
          (action.GENDER
            ? action.GENDER.toUpperCase()[0] == formDetails.gender
            : action.SEX?.toUpperCase()[0] == formDetails.gender)
        ) {
          return RedirectActions.recoveryIdCheck({
            status: true,
            firstName: action.FIRST_NAME,
            middleName: action.MIDDLE_NAME,
            lastName: action.LAST_NAME,
          });
        } else {
          return RedirectActions.recoveryIdCheck({ status: false });
        }
      })
    )
  );

  recoveryIdCheck$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RedirectActions.recoveryIdCheck),
      map(action => {
        if (action.status == true) {
          return AppActions.navigate({ from: 'ZOLOZ_SUCCESS_RECOVERY' });
        } else {
          return AppActions.navigate({ from: 'ZOLOZ_ID_MISMATCH_RECOVERY' });
        }
      })
    )
  );

  recoveryCheckResultFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RedirectActions.checkResultFailRecovery),
      concatLatestFrom(() => [this.dafScanStore.select(idCheckRetrySelector)]),
      map(([action, count]) => {
        if (count < zolozRetryCount) {
          return AppActions.navigate({ from: 'ZOLOZ_RETRY_RECOVERY' });
        } else {
          return AppActions.navigate({ from: 'ZOLOZ_FAIL_RECOVERY' });
        }
      })
    )
  );

  succesCheckResultSuccess_$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RedirectActions.successCheckResultSuccess),
      concatLatestFrom(() => [this.customerStore.select(customerTypeSelect)]),
      mergeMap(([action, customer]) => {
        if (customer == 'FTA') return of(AppActions.initChatToken());
        else return of(AppActions.navigate({ from: '' }));
      })
    )
  );

  succesCheckResultFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RedirectActions.successCheckResultFail),
      map(action => {
        // console.log('button clicked');
        if (action.error.message === 'VoidCancelled') {
          return AppActions.navigate({
            // from: 'ZOLOZ_VOID_CANCELLED',
            from: 'ZOLOZ_SUCCESS',
          });
        } else if (action.error.message === 'VoidTimeout') {
          return AppActions.navigate({
            from: 'ZOLOZ_VOID_TIMEOUT',
          });
        } else if (action.error.message === 'Pending') {
          return AppActions.navigate({
            from: 'ZOLOZ_PENDING',
          });
        } else if (action.error.message === 'Failure') {
          return AppActions.navigate({
            from: 'ZOLOZ_FAIL',
          });
        } else if (action.error.message === 'Timeout') {
          return AppActions.navigate({
            from: 'ZOLOZ_TIMEOUT',
          });
        } else if (action.error.message === 'CatchBlock') {
          return AppActions.navigate({
            from: 'ZOLOZ_ERROR',
          });
        } else {
          return AppActions.navigate({
            from: 'ZOLOZ_UNKNOWN',
          });
        }
      }),
      catchError(error => {
        // console.log('in error block', error);
        return of(AppActions.navigate({ from: 'ZOLOZ_ERROR' }));
      })
    )
  );

  failCheckResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RedirectActions.failCheckResultFail),
      map(action => {
        return AppActions.navigate({ from: 'ZOLOZ_FAIL_CALLBACK' });
      })
    )
  );

  initRecovery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RedirectActions.initRecovery),
      mergeMap(action => {
        return this.redirectService.recoveryFetchMobile(action.orderId).pipe(
          timeout(timeOutInterval),
          map((mobileDetails: any) => {
            if ('data' in mobileDetails) {
              return RedirectActions.successRecoveryMobile({
                mobileNo: mobileDetails.data.mobileNo,
              });
            } else {
              return RedirectActions.failRecoveryMobile();
            }
          }),
          catchError(error => {
            return of(RedirectActions.failRecoveryMobile());
          })
        );
        // return AppActions.navigate({ from: 'INIT_RECOVERY' });
      })
    )
  );

  successRecoveryMobile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RedirectActions.successRecoveryMobile),
      map(action => {
        return AppActions.navigate({ from: 'INIT_RECOVERY' });
      })
    )
  );

  failRecoveryMobile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RedirectActions.failRecoveryMobile),
      map(action => {
        return AppActions.navigate({ from: 'INIT_RECOVERY_FAIL' });
      })
    )
  );

  constructor(
    private actions$: Actions,
    private redirectService: RedirectService,
    private customerStore: Store<CustomerTypeState>,
    private recoveryStore: Store<RecoveryState>,
    private dafScanStore: Store<DAFScanState>,
    private dafFillStore: Store<DAFFillState>,
    private redirectStore: Store<RedirectState>,
    private otpStore: Store<OtpState>
  ) {}
}
