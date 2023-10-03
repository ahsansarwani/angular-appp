import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { DAFScanActions } from './daf-scan.actionTypes';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of, timeout, TimeoutError } from 'rxjs';
import { DAFScanService } from './daf-scan.service';
import { DAFScanState } from './daf-scan.model';
import { AppActions } from '../../../app-state/app.actionTypes';
import { timeOutInterval } from '../../../globals/config';
import { LobState } from '../../plan-selector/state/plan-selector.model';
import { orderLobSelect } from '../../plan-selector/state/plan-selector.selectors';
import { selectedIdNameSelector } from './daf-scan.selectors';
import { OtpState } from '../../otp/state/otp.reducer';
import { refIdSelect } from '../../otp/state/otp.selectors';

@Injectable()
export class DAFScanEffects {
  idCheckInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DAFScanActions.IdCheckInit),
      concatLatestFrom(() => [
        this.storeState.select(selectedIdNameSelector),
        this.otpStore.select(refIdSelect),
      ]),
      mergeMap(([action, docName, refId]) => {
        // console.log("side effects start", action.mobileNo);
        // console.log('LOB', this.lob);

        if (this.lob.lobType && this.lob.lobType == 'Mobile') {
          return this.dafScanService
            .checkIdInit(action.docType, docName, refId)
            .pipe(
              timeout(timeOutInterval),
              map((initInfo: any) =>
                DAFScanActions.IdCheckInitSuccess({
                  transactionId: initInfo.transactionId,
                  clientCfg: initInfo.clientCfg,
                })
              ),
              catchError(error => {
                if (error instanceof TimeoutError) {
                  return of(
                    DAFScanActions.IdCheckInitFail({
                      error: { message: 'timeout', details: 'timeout' },
                    })
                  );
                } else {
                  return of(
                    DAFScanActions.IdCheckInitFail({
                      error: { message: 'catch', details: error.toString() },
                    })
                  );
                }
              })
            );
        } else {
          return of(AppActions.navigate({ from: 'ZOLOZ_NOT_MOBILE' }));
        }
      })
    )
  );

  idCheckInitSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DAFScanActions.IdCheckInitSuccess),
        tap(action => {
          const clientCfg = action.clientCfg;
          window.location.href =
            'https://sg-production-cdn.zoloz.com/page/zoloz-realid-fe/index.html?clientcfg=' +
            encodeURIComponent(clientCfg);
        })
      ),
    { dispatch: false }
  );

  idCheckInitFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DAFScanActions.IdCheckInitFail),
      map(action => {
        // console.log('zoloz init failed');
        if (action.error.message === 'timeout') {
          return AppActions.navigate({
            from: 'ZOLOZ_TIMEOUT',
          });
        } else {
          return AppActions.navigate({
            from: 'ZOLOZ_ERROR',
          });
        }
      }),
      catchError(error => {
        // console.log('in error block', error);
        return of(AppActions.navigate({ from: 'ZOLOZ_ERROR' }));
      })
    )
  );

  nationalityFetchInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DAFScanActions.nationalityFetchInit),
      mergeMap(action => {
        // console.log("side effects start", action.mobileNo);
        return this.dafScanService.fetchNationality().pipe(
          map((countryInfo: any) =>
            DAFScanActions.nationalityFetchSuccess({
              countries: countryInfo,
            })
          ),
          catchError(error =>
            of(
              DAFScanActions.nationalityFetchFail({
                countries: [{ countryId: 'PHP', countryName: 'Philippines' }],
              })
            )
          )
        );
      })
    )
  );

  idFetchInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DAFScanActions.idFetchInit),
      mergeMap(action => {
        // console.log("side effects start", action.mobileNo);
        return this.dafScanService.fetchIdList(action.code).pipe(
          map((data: any) =>
            DAFScanActions.idFetchSuccess({
              idList: data.poidDocList,
            })
          ),
          catchError(error => of(DAFScanActions.idFetchFail({ idList: [] })))
        );
      })
    )
  );

  lob: any;
  constructor(
    private actions$: Actions,
    private dafScanService: DAFScanService,
    private router: Router,
    private storeState: Store<DAFScanState>,
    private lobState: Store<LobState>,
    private otpStore: Store<OtpState>
  ) {
    this.lobState.pipe(select(orderLobSelect)).subscribe(val => {
      this.lob = val;
    });
  }
}
