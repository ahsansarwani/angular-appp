import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { DAFFillActions } from './daf-fill.actionTypes';
import { tap } from 'rxjs/operators';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { DAFFillService } from './daf-fill.service';
import { AddressResponse } from './daf-fill.model';
import { DAFFillState } from './daf-fill.model';
import { AppState } from '../../../app-state/app.model';
import { AppActions } from '../../../app-state/app.actionTypes';
// import { FTA_ZOLOZ_FAILED_KEEP_IN_TOUCH_PAGE } from '../../../globals/gtm-events/plan-selector/events';
import { GoogleTagManagerService } from '../../../app-state/gtm.service';
@Injectable()
export class DAFFillEffects {
  fetchProvinceInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DAFFillActions.getProvinceInit),
      mergeMap(action => {
        // console.log("side effects start", action.mobileNo);
        return this.dafFillService.fetchProvinces().pipe(
          map((body: any) =>
            DAFFillActions.getProvinceSuccess({
              provinces: body.data,
            })
          ),
          catchError(error => of(DAFFillActions.getProvinceFail()))
        );
      })
    )
  );

  fetchCitysInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DAFFillActions.getCityInit),
      mergeMap(action => {
        console.log('side effects starts', action.province);
        return this.dafFillService.fetchCities(action.province).pipe(
          map((body: any) =>
            DAFFillActions.getCitySuccess({
              cities: body.data,
            })
          ),
          catchError(error => of(DAFFillActions.getCityFail()))
        );
      })
    )
  );

  fetchBgysInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DAFFillActions.getBarangayInit),
      mergeMap(action => {
        // console.log("side effects start", action.mobileNo);
        return this.dafFillService.fetchBgys(action.city).pipe(
          map((body: any) =>
            DAFFillActions.getBarangaySuccess({
              barangays: body.data,
            })
          ),
          catchError(error => of(DAFFillActions.getBarangayFail()))
        );
      })
    )
  );

  fetchPostalInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DAFFillActions.getPostalInit),
      mergeMap(action => {
        // console.log("side effects start", action.mobileNo);
        return this.dafFillService.fetchPostal(action.barangay).pipe(
          map((body: any) =>
            DAFFillActions.getPostalSuccess({
              postalCode: body.data,
            })
          ),
          catchError(error => of(DAFFillActions.getPostalFail()))
        );
      })
    )
  );

  formSubmitFta$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DAFFillActions.formSubmitFta),
      mergeMap(action => {
        // console.log(brandInfo, duplicateInfo, eligibilityInfo);
        return of(null).pipe(
          map(() => {
            // console.log('in daf submit effect', action.scenario);
            if (action.offlineMode === false) {
              return AppActions.navigate({ from: 'DAF_SUBMIT_FTA' });
            } else {
              // this.gtmService.captureGTMEvent(
              //   FTA_ZOLOZ_FAILED_KEEP_IN_TOUCH_PAGE
              // );
              return AppActions.navigate({ from: 'OFFLINE_DAF_SUBMIT_FTA' });
            }
          })
        );
      })
    )
  );

  formSubmitAda$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DAFFillActions.formSubmitAda),
      mergeMap(action => {
        // console.log(brandInfo, duplicateInfo, eligibilityInfo);
        return of(null).pipe(
          map(() => {
            return AppActions.navigate({ from: 'DAF_SUBMIT_ADA' });
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private dafFillService: DAFFillService,
    private storeState: Store<DAFFillState>,
    private store: Store<AppState>,
    private gtmService: GoogleTagManagerService
  ) {}
}
