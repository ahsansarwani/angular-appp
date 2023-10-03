import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import {
  Observable,
  of,
  from,
  delay,
  catchError,
  map,
  firstValueFrom,
} from 'rxjs';
import { select, Store } from '@ngrx/store';
import { OtpState } from '../../otp/state/otp.reducer';
import {
  orderOtpSelect,
  refIdSelect,
  selectOtpState,
} from '../../otp/state/otp.selectors';
import {
  SuccessResponse,
  ErrorResponse,
  AppState,
  ErrorState,
} from '../../../app-state/app.model';
import { OrderState } from './submit-order.model';
import {
  CustomerTypeState,
  LobState,
  PlanState,
} from '../../plan-selector/state/plan-selector.model';
import { EligibilityState } from '../../eligibility/state/eligibility.model';
import { DAFFillState } from '../../daf-fill/state/daf-fill.model';
import { DafReviewState } from '../../daf-review/state/daf-review.model';
import {
  customerTypeState,
  lobTypeState,
  orderLobSelect,
  orderPlanSelect,
  orderSimTypeSelect,
  orderTypeSelect,
  orderUpcomingAmtSelect,
  planState,
} from '../../plan-selector/state/plan-selector.selectors';
import {
  dafFillState,
  orderCustomerIdAda,
  orderEligibilitySelect,
  selectEligibilityState,
} from '../../eligibility/state/eligibility.selectors';
import {
  orderAddSelect,
  orderPersonInfoSelect,
} from '../../daf-fill/state/daf-fill.selector';
import {
  orderDeliverySelect,
  orderTcTimeSelect,
  orderTodayAmtSelect,
  selectDafReviewState,
} from '../../daf-review/state/daf-review.selectors';
import { delayInterval } from '../../../globals/config';
import {
  orderPoidSelect,
  orderTransacIdSelect,
  selectDAFScanState,
} from '../../daf-scan/state/daf-scan.selectors';
import { DAFScanState } from '../../daf-scan/state/daf-scan.model';
import { RedirectState } from '../../redirect/state/redirect.model';
import {
  orderResultSelector,
  selectRedirectState,
} from '../../redirect/state/redirect.selector';
import {
  appSelector,
  orderErrorSelect,
} from '../../../app-state/app.selectors';
import { orderPayInfoSelect, selectOrderState } from './submit-order.selectors';
@Injectable()
export class OrderService {
  plan$: Observable<object>;
  plan?: object;
  planAmt$: Observable<object>;
  planAmt?: object;
  simType$: Observable<object>;
  simType?: object;
  orderType$: Observable<object>;
  orderType?: any;
  otp$: Observable<object>;
  otp?: object;
  poid$: Observable<object>;
  poid?: object;
  eligibility$: Observable<object>;
  eligibility?: object;
  personInfo$: Observable<object>;
  personInfo?: object;
  address$: Observable<object>;
  address?: object;
  balAmt$: Observable<object>;
  balAmt?: object;
  idVerify$: Observable<object>;
  idVerify?: object;
  idTransaction$: Observable<object>;
  idTransaction?: object;
  tcTime$: Observable<object>;
  tcTime?: object;
  delivery$: Observable<object>;
  delivery?: object;
  lob$: Observable<object>;
  lob?: object;
  customerId$: Observable<object | undefined>;
  customerId?: object;
  error$: Observable<object>;
  error?: object;
  payInfo$: Observable<object | undefined>;
  payInfo?: object | undefined;
  otpRefId$: Observable<any>;
  otpRefId: any;

  constructor(
    private http: HttpClient,
    private orderStore: Store<OrderState>,
    private customerStore: Store<CustomerTypeState>,
    private otpStore: Store<OtpState>,
    private eligStore: Store<EligibilityState>,
    private dafFillStore: Store<DAFFillState>,
    private dafScanStore: Store<DAFScanState>,
    private dafReviewStore: Store<DafReviewState>,
    private planStore: Store<PlanState>,
    private redirectStore: Store<RedirectState>,
    private lobStore: Store<LobState>,
    private errorStore: Store<ErrorState>
  ) {
    this.plan$ = this.planStore.pipe(select(orderPlanSelect));
    this.planAmt$ = this.planStore.pipe(select(orderUpcomingAmtSelect));
    this.simType$ = this.planStore.pipe(select(orderSimTypeSelect));
    this.orderType$ = this.customerStore.pipe(select(orderTypeSelect));
    this.otp$ = this.otpStore.pipe(select(orderOtpSelect));
    this.poid$ = this.dafScanStore.pipe(select(orderPoidSelect));
    this.idTransaction$ = this.dafScanStore.pipe(select(orderTransacIdSelect));
    this.eligibility$ = this.eligStore.pipe(select(orderEligibilitySelect));
    this.personInfo$ = this.dafFillStore.pipe(select(orderPersonInfoSelect));
    this.address$ = this.dafFillStore.pipe(select(orderAddSelect));
    this.balAmt$ = this.dafReviewStore.pipe(select(orderTodayAmtSelect));
    this.tcTime$ = this.dafReviewStore.pipe(select(orderTcTimeSelect));
    this.idVerify$ = this.redirectStore.pipe(select(orderResultSelector));
    this.delivery$ = this.redirectStore.pipe(select(orderDeliverySelect));
    this.lob$ = this.lobStore.pipe(select(orderLobSelect));
    this.customerId$ = this.eligStore.pipe(select(orderCustomerIdAda));
    this.error$ = this.errorStore.pipe(select(orderErrorSelect));
    this.payInfo$ = this.orderStore.pipe(select(orderPayInfoSelect));
    this.otpRefId$ = this.otpStore.pipe(select(refIdSelect));

    this.plan$.subscribe(val => {
      this.plan = val;
    });
    this.planAmt$.subscribe(val => {
      this.planAmt = val;
    });
    this.simType$.subscribe(val => {
      this.simType = val;
    });
    this.orderType$.subscribe(val => {
      this.orderType = val;
    });
    this.otp$.subscribe(val => {
      this.otp = val;
    });
    this.poid$.subscribe(val => {
      this.poid = val;
    });
    this.eligibility$.subscribe(val => {
      this.eligibility = val;
    });
    this.address$.subscribe(val => {
      this.address = val;
    });
    this.personInfo$.subscribe(val => {
      this.personInfo = val;
    });
    this.balAmt$.subscribe(val => {
      this.balAmt = val;
    });
    this.idTransaction$.subscribe(val => {
      this.idTransaction = val;
    });
    this.idVerify$.subscribe(val => {
      this.idVerify = val;
    });
    this.tcTime$.subscribe(val => {
      this.tcTime = val;
    });
    this.delivery$.subscribe(val => {
      this.delivery = val;
    });
    this.lob$.subscribe(val => {
      this.lob = val;
    });
    this.customerId$.subscribe(val => {
      this.customerId = val;
    });
    this.error$.subscribe(val => {
      this.error = val;
    });
    this.payInfo$.subscribe(val => {
      this.payInfo = val;
    });
    this.otpRefId$.subscribe(val => {
      this.otpRefId = val;
    });
    // this.initValue();
  }

  //   async initValue() {
  //     this.plan = await firstValueFrom(this.plan$);
  //     this.planAmt = await firstValueFrom(this.planAmt$);
  //     this.simType = await firstValueFrom(this.simType$);
  //     this.orderType = await firstValueFrom(this.orderType$);
  //     this.otp = await firstValueFrom(this.otp$);
  //     this.eligibility = await firstValueFrom(this.eligibility$);
  //     this.address = await firstValueFrom(this.address$);
  //     this.personInfo = await firstValueFrom(this.personInfo$);
  //     this.balAmt = await firstValueFrom(this.balAmt$);
  //   }

  submitOrder(state: any): Observable<SuccessResponse | ErrorResponse> {
    // console.log('State ----- ', state);
    // let state = await this.getStates();
    const headers = this.otpRefId
      ? new HttpHeaders({
          'x-session-id': this.otpRefId,
        })
      : undefined;

    const stateObj = {
      state: state,
    };

    const customerId = {
      customerId: this.orderType.orderType == 'ADA' ? 'undefined' : undefined,
    };

    const poidVerify =
      this.orderType.orderType == 'ADA'
        ? undefined
        : {
            ...this.idVerify,
            ...this.idTransaction,
          };

    const dueAmount = {
      dueAmount: {
        ...this.planAmt,
        ...this.balAmt,
        ...this.payInfo,
      },
    };

    const verify = {
      verification: {
        poidVerify: poidVerify,
        ...this.otp,
        email: {
          verified: true,
        },
      },
    };

    const payload = {
      ...this.plan,
      ...this.poid,
      ...this.simType,
      ...this.orderType,
      ...this.eligibility,
      ...this.personInfo,
      ...this.address,
      ...this.tcTime,
      ...this.delivery,
      ...this.lob,
      ...this.customerId,
      ...this.error,
      ...dueAmount,
      ...verify,
      ...stateObj,
    };

    console.log('order ----- ', payload);

    return this.http
      .post<SuccessResponse | ErrorResponse>(
        'api/central-service/db/submitOrder',
        payload,
        {
          headers,
          observe: 'response',
        }
      )
      .pipe(
        delay(delayInterval),
        map((res: HttpResponse<any>) => {
          if (res.status == 200) {
            const value: SuccessResponse = res.body;
            return value;
          } else {
            const value: ErrorResponse = res.body;
            return value;
          }
        }),
        catchError((err, caught) => {
          // console.log('Error vlock', err);
          return of({
            error: { message: 'CatchBlock1', details: 'CatchBlock1' },
          });
        })
      );
  }

  submitLead(): Observable<SuccessResponse | ErrorResponse> {
    // console.log('Eligibility', this.eligibility);
    const headers = this.otpRefId
      ? new HttpHeaders({
          'x-session-id': this.otpRefId,
        })
      : undefined;

    const customerId = {
      customerId: this.orderType.orderType == 'ADA' ? 'undefined' : undefined,
    };

    const poidVerify =
      this.orderType.orderType == 'ADA'
        ? undefined
        : {
            ...this.idVerify,
            ...this.idTransaction,
          };

    const dueAmount = {
      dueAmount: {
        ...this.planAmt,
        ...this.balAmt,
      },
    };
    const verify = {
      verification: {
        poidVerify: poidVerify,
        ...this.otp,
        email: {
          verified: true,
        },
      },
    };
    const payload = {
      ...this.plan,
      ...this.poid,
      ...this.simType,
      ...this.orderType,
      ...this.eligibility,
      ...this.personInfo,
      ...this.address,
      ...this.tcTime,
      ...this.delivery,
      ...this.lob,
      ...this.customerId,
      ...dueAmount,
      ...verify,
    };

    console.log('lead ----- ', payload);

    return this.http
      .post<SuccessResponse | ErrorResponse>(
        'api/central-service/db/submitOrder',
        payload,
        {
          headers,
          observe: 'response',
        }
      )
      .pipe(
        delay(delayInterval),
        map((res: HttpResponse<any>) => {
          if (res.status == 200) {
            const value: SuccessResponse = res.body;
            return value;
          } else {
            const value: ErrorResponse = res.body;
            return value;
          }
        }),
        catchError((err, caught) => {
          console.log('error found - ', err);
          return of({
            error: { message: 'CatchBlock', details: 'CatchBlock' },
          });
        })
      );
  }

  createPaymentGcash(
    settlementInformation: any,
    otpRefId: any
  ): Observable<SuccessResponse | ErrorResponse> {
    // settlementInformation[0].accountNumber = '1130904342';
    // settleInfo = {
    //   emailAddress: 'test.test@gmail.com',
    //   accountNumber: '1130904342',
    //   amount: 3244.4,
    // };
    const headers = this.otpRefId
      ? new HttpHeaders({
          'x-session-id': this.otpRefId,
        })
      : undefined;

    return this.http
      .post<SuccessResponse | ErrorResponse>(
        'api/payment-service/payments/sessions',
        {
          paymentType: 'GCASH',
          settlementInformation,
        },
        { headers, observe: 'response' }
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status == 200) {
            const value: SuccessResponse = res.body;
            return value;
          } else {
            const value: ErrorResponse = res.body;
            return value;
          }
        }),
        catchError((err, caught) => {
          console.log('error found - ', err);
          return of({
            error: { message: 'CatchBlock', details: 'CatchBlock' },
          });
        })
      );
  }

  createPaymentXendit(
    settlementInformation: any,
    paymentMethodId: string,
    otpRefId: any
  ): Observable<SuccessResponse | ErrorResponse> {
    // settlementInformation[0].accountNumber = '1130904342';
    const headers = this.otpRefId
      ? new HttpHeaders({
          'x-session-id': this.otpRefId,
        })
      : undefined;

    return this.http
      .post<SuccessResponse | ErrorResponse>(
        'api/payment-service/payments/sessions',
        {
          paymentMethodId,
          paymentType: 'XENDIT',
          settlementInformation,
        },
        { headers, observe: 'response' }
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status == 200) {
            const value: SuccessResponse = res.body;
            return value;
          } else {
            const value: ErrorResponse = res.body;
            return value;
          }
        }),
        catchError((err, caught) => {
          console.log('error found - ', err);
          return of({
            error: { message: 'CatchBlock', details: 'CatchBlock' },
          });
        })
      );
  }

  getPaymentStatus(paymentTokenId: string, otpRefId: any) {
    const params = new HttpParams().set('paymentTokenId', paymentTokenId);

    const headers = this.otpRefId
      ? new HttpHeaders({
          'x-session-id': this.otpRefId,
        })
      : undefined;

    return this.http
      .get<SuccessResponse | ErrorResponse>(
        '/api/payment-service/payments/status',
        {
          params,
          headers,
          observe: 'response',
        }
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status == 200) {
            const value: SuccessResponse = res.body;
            return value;
          } else {
            const value: ErrorResponse = res.body;
            return value;
          }
        }),
        catchError((err, caught) => {
          console.log('error found - ', err);
          return of({ error: { message: '', details: '' } });
        })
      );
  }

  getStates = async () => {
    const planState_ = await firstValueFrom(
      this.planStore.pipe(select(planState))
    );
    const customerState = await firstValueFrom(
      this.planStore.pipe(select(customerTypeState))
    );
    const otpState = await firstValueFrom(
      this.otpStore.pipe(select(selectOtpState))
    );
    const eligState = await firstValueFrom(
      this.eligStore.pipe(select(selectEligibilityState))
    );
    const dafScanState = await firstValueFrom(
      this.dafScanStore.pipe(select(selectDAFScanState))
    );
    const dafReviewState = await firstValueFrom(
      this.dafReviewStore.pipe(select(selectDafReviewState))
    );
    const dafFillState_ = await firstValueFrom(
      this.dafFillStore.pipe(select(dafFillState))
    );
    const redirectState = await firstValueFrom(
      this.redirectStore.pipe(select(selectRedirectState))
    );
    const orderState = await firstValueFrom(
      this.orderStore.pipe(select(selectOrderState))
    );
    const lobState = await firstValueFrom(
      this.lobStore.pipe(select(lobTypeState))
    );

    // otp: { ...otpState },

    const state = {
      plan: { ...planState_ },
      customerType: { ...customerState },
      otp: { ...otpState },
      dafFill: {
        ...dafFillState_,
        provinceList: undefined,
        cityList: undefined,
        barangayList: undefined,
      },
      dafScan: { ...dafScanState, nationalityList: undefined },
      eligibility: { ...eligState },
      dafReview: { ...dafReviewState, planInfo: undefined },
      redirect: { ...redirectState },
      lob: { ...lobState },
      order: { ...orderState },
    };

    // console.log('state....', state);
    return state;
  };
}
