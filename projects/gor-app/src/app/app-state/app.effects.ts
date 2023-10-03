import { Injectable } from '@angular/core';
import {
  act,
  Actions,
  concatLatestFrom,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { AppActions } from './app.actionTypes';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AppState, ChatState } from './app.model';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, firstValueFrom, of } from 'rxjs';
import {
  mobileNoSelect,
  selectOtpState,
} from '../features/otp/state/otp.selectors';
import { OtpState } from '../features/otp/state/otp.reducer';
import {
  customerTypeSelect,
  customerTypeState,
  lobState,
  planState,
} from '../features/plan-selector/state/plan-selector.selectors';
import {
  LobState,
  PlanState,
} from '../features/plan-selector/state/plan-selector.model';
import { CustomerTypeState } from '../features/plan-selector/state/plan-selector.model';
import { RedirectState } from '../features/redirect/state/redirect.model';
import {
  firstNameSelector,
  lastNameSelector,
  selectRedirectState,
} from '../features/redirect/state/redirect.selector';
import { ChatbotService } from './chat.service';
import { tokenSelect, tokenTimeSelect } from './app.selectors';
import { EligibilityState } from '../features/eligibility/state/eligibility.model';
import {
  fnameAdaSelector,
  lnameAdaSelector,
} from '../features/eligibility/state/eligibility.selectors';
import { toRoute } from '../globals/redirection-links';

@Injectable()
export class AppEffects {
  otpState$: Observable<OtpState | undefined>;
  plan$: Observable<PlanState | undefined>;
  customerType$: Observable<CustomerTypeState | undefined>;
  redirectState$: Observable<RedirectState | undefined>;
  lob$: Observable<string | undefined>;

  navigate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.navigate),
        tap(async action => {
          //let planState = await firstValueFrom(this.plan$);
          console.log('navigate triggered - ', action.from);
          const customerState = await firstValueFrom(this.customerType$);
          const lob = await firstValueFrom(this.lob$);

          if (action.from == 'PLAN_SELECT_MOBILE') {
            // console.log('Customer state - ', customerState);
            if (customerState?.customerType == 'FTA') {
              if (lob && lob === 'Mobile') {
                this.router.navigate([toRoute.uploadId]);
              } else {
                this.router.navigate([toRoute.offlineDaf]);
              }
            } else if (customerState?.customerType == 'ADA') {
              this.router.navigate([toRoute.otp]);
            }
          } else if (action.from == 'PLAN_SELECT_OTHER') {
            // console.log('Customer state - ', customerState);
            if (customerState?.customerType == 'FTA') {
              this.router.navigate([toRoute.offlineDaf]);
            } else if (customerState?.customerType == 'ADA') {
              this.router.navigate([toRoute.otp]);
            }
          } else if (action.from == 'OTHER_UNLI_SELECT') {
            this.router.navigate([toRoute.selectUnli]);
          } else if (action.from == 'INIT_RECOVERY') {
            this.router.navigate([toRoute.otp]);
          } else if (action.from == 'OTP_VERIFIED') {
            const otpState = await firstValueFrom(this.otpState$);
            if (otpState?.verifyStatus) {
              this.router.navigate([toRoute.eligibility]);
            }
          } else if (action.from === 'OTP_FAIL') {
            if (customerState?.customerType == 'FTA') {
              this.router.navigate([toRoute.submitOrder]);
            } else if (customerState?.customerType == 'ADA') {
              this.router.navigate([toRoute.error]);
            } else {
              this.router.navigate([toRoute.error]);
            }
          } else if (
            action.from == 'RECOVERY_FAIL' ||
            action.from == 'INIT_RECOVERY_FAIL'
          ) {
            this.router.navigate([toRoute.error]);
          } else if (action.from == 'OTP_BACK_FTA') {
            this.router.navigate([toRoute.daf]);
          } else if (action.from == 'OTP_BACK_ADA') {
            this.router.navigate([toRoute.planSelector]);
          } else if (
            action.from == 'ZOLOZ_SUCCESS' ||
            action.from == 'ZOLOZ_SUCCESS_RECOVERY'
          ) {
            this.router.navigate([toRoute.daf]);
          } else if (
            action.from === 'ZOLOZ_NOT_MOBILE' ||
            action.from === 'ZOLOZ_FAIL' ||
            action.from === 'ZOLOZ_VOID_CANCELLED' ||
            action.from === 'ZOLOZ_PENDING' ||
            action.from === 'ZOLOZ_VOID_TIMEOUT' ||
            action.from === 'ZOLOZ_TIMEOUT' ||
            action.from === 'ZOLOZ_UNKNOWN' ||
            action.from === 'ZOLOZ_ERROR' ||
            action.from === 'ZOLOZ_FAIL_CALLBACK'
          ) {
            this.router.navigate([toRoute.offlineDaf]);
          } else if (
            action.from === 'ZOLOZ_RETRY_RECOVERY' ||
            action.from === 'ZOLOZ_ID_MISMATCH_RECOVERY'
          ) {
            this.router.navigate([toRoute.errorIdMismatch]);
          } else if (action.from === 'ZOLOZ_FAIL_RECOVERY') {
            this.router.navigate([toRoute.errorMaximumAttemptsReached]);
          } else if (action.from === 'CHANGE_PLAN') {
            // none
          } else if (action.from === 'DAF_SUBMIT_FTA') {
            this.router.navigate([toRoute.otp]);
          } else if (action.from === 'OFFLINE_DAF_SUBMIT_FTA') {
            this.router.navigate([toRoute.submitOrder]);
          } else if (
            action.from === 'DAF_SUBMITTED' ||
            action.from === 'PAY_RETRY_GCASH' ||
            action.from === 'DAF_SUBMIT_ADA' ||
            action.from === 'ELIGIBILITY_FTA'
          ) {
            this.router.navigate([toRoute.review]);
          } else if (action.from === 'ELIGIBILITY_ADA') {
            this.router.navigate([toRoute.daf]);
          } else if (
            action.from === 'ELIGIBILITY_FAIL_FTA_1' ||
            action.from === 'ELIGIBILITY_FAIL_FTA_2' ||
            action.from === 'ELIGIBILITY_FAIL_ADA_2'
          ) {
            this.router.navigate([toRoute.submitOrder]);
          } else if (action.from === 'ORDER_SUCCESS') {
            this.router.navigate([toRoute.orderSuccess]);
          } else if (action.from === 'LEAD_SUCCESS') {
            this.router.navigate([toRoute.orderOffline]);
          } else if (action.from === 'PAYMENT_PENDING') {
            this.router.navigate([toRoute.orderPaymentPending]);
          } else if (action.from === 'LEAD_FAIL') {
            this.router.navigate([toRoute.error]);
          } else if (action.from === 'ORDER_FAIL') {
            this.router.navigate([toRoute.error]);
          } else if (action.from === 'DAF_REVIEW') {
            this.router.navigate([toRoute.submitOrder]);
          } else if (
            action.from === 'DAF_REVIEW_ERROR' ||
            action.from === 'PAY_XENDIT_ERROR' ||
            action.from === 'PAY_RETRY_EXCEED'
          ) {
            this.router.navigate([toRoute.error]);
          } else if (
            action.from === 'ELIGIBILITY_ADVERSE' ||
            action.from === 'ELIGIBILITY_FAIL_ADA_1'
          ) {
            this.router.navigate([toRoute.error]);
          } else if (action.from === 'ELIGIBILITY_DUPLICATE') {
            this.router.navigate([toRoute.orderExists]);
          } else if (action.from === 'ELIGIBILITY_INSUFFICIENT') {
            this.router.navigate([toRoute.errorCreditLimit]);
          } else if (action.from === 'ELIGIBILITY_FTA_IN_ADA_TO_SCAN') {
            this.router.navigate([toRoute.uploadId]);
          } else if (action.from === 'ELIGIBILITY_FTA_IN_ADA_TO_OTP') {
            this.router.navigate([toRoute.otp]);
          } else if (action.from === 'ORDER_TRACKER') {
            this.router.navigate(['/order-tracker/error']);
          }
        })
      ),
    { dispatch: false }
  );

  getToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.initChatToken),
      concatLatestFrom(() => [
        this.customerStore.select(customerTypeSelect),
        this.redirectStore.select(firstNameSelector),
        this.redirectStore.select(lastNameSelector),
        this.eligibilityStore.select(fnameAdaSelector),
        this.eligibilityStore.select(lnameAdaSelector),
        this.otpStore.select(mobileNoSelect),
        this.chatStore.select(tokenSelect),
        this.chatStore.select(tokenTimeSelect),
      ]),
      mergeMap(
        ([
          action,
          customer,
          fnamefta,
          lnamefta,
          fnameAda,
          lnameAda,
          mobile,
          token,
          tokenTime,
        ]) => {
          let fName = '..';
          let lName = '..';

          if (customer == 'FTA') {
            fName = fnamefta ? fnamefta : '..';
            lName = lnamefta ? lnamefta : '..';
          }

          if (customer == 'ADA') {
            fName = fnameAda ? fnameAda : '..';
            lName = lnameAda ? lnameAda : '..';
          }
          // console.log('token time', typeof tokenTime);
          if (
            // customer == 'FTA' &&
            token &&
            tokenTime != undefined &&
            Math.abs(new Date().getTime() - new Date(tokenTime).getTime()) /
              1000 <
              600
          ) {
            return of(
              AppActions.tokenSuccess({
                token: token,
                fName: fName,
                lName: lName,
              })
            );
          }

          return this.chatService
            .getChatBotToken(fName, lName, mobile ? mobile : undefined)
            .pipe(
              map((data: any) => {
                // console.log('Data received', data);
                if ('token' in data) {
                  // console.log('trigger success');
                  return AppActions.tokenSuccess({
                    token: data.token,
                    fName: fName,
                    lName: lName,
                  });
                } else {
                  // console.log('trigger fail 1 ');
                  return AppActions.tokenFail({ error: data });
                }
              }),
              catchError(error => {
                // console.log('trigger fail 2');
                return of(AppActions.tokenFail({ error: '' }));
              })
            );
        }
      )
    )
  );

  injectChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.tokenSuccess),
      mergeMap(action => {
        return of(null).pipe(
          map(firstname => {
            this.chatService.addChatbotToDom(
              action.fName,
              action.lName,
              action.token
            );
            return AppActions.initChatSuccess();
          }),
          catchError(error => {
            return of(AppActions.initChatFail());
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private store: Store<AppState>,
    private redirectStore: Store<RedirectState>,
    private otpStore: Store<OtpState>,
    private chatStore: Store<ChatState>,
    private lobStore: Store<LobState>,
    private customerStore: Store<CustomerTypeState>,
    private eligibilityStore: Store<EligibilityState>,
    private chatService: ChatbotService
  ) {
    this.otpState$ = this.store.pipe(select(selectOtpState));
    this.plan$ = this.store.pipe(select(planState));
    this.customerType$ = this.store.pipe(select(customerTypeState));
    this.redirectState$ = this.store.pipe(select(selectRedirectState));
    this.lob$ = this.lobStore.pipe(select(lobState));
  }
}
