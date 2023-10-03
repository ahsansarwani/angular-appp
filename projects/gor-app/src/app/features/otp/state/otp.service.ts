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
  delay,
  firstValueFrom,
  map,
  tap,
  catchError,
} from 'rxjs';
import { OtpResponse, VerifyResponse } from './otp.model';
import { OtpState } from './otp.reducer';
import { mobileNoSelect, refIdSelect } from './otp.selectors';
import { select, Store } from '@ngrx/store';
import { SuccessResponse, ErrorResponse } from '../../../app-state/app.model';
import { DAFScanState } from '../../daf-scan/state/daf-scan.model';
import { orderTransacIdSelect } from '../../daf-scan/state/daf-scan.selectors';

@Injectable()
export class OtpService {
  mobileNo$: Observable<string | undefined>;
  refId$: Observable<string | undefined>;
  transactionId$: Observable<{ transactionId: string }>;

  constructor(
    private http: HttpClient,
    private store: Store<OtpState>,
    private scanStore: Store<DAFScanState>
  ) {
    this.mobileNo$ = this.store.pipe(select(mobileNoSelect));
    this.refId$ = this.store.pipe(select(refIdSelect));
    this.transactionId$ = this.scanStore.pipe(select(orderTransacIdSelect));
  }

  initOtp(mobileNo: string): Observable<SuccessResponse | ErrorResponse> {
    return this.http
      .post<SuccessResponse | ErrorResponse>(
        '/api/verification-service/otp/send',
        {
          mobileNumber: mobileNo,
        },
        { observe: 'response' }
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

  initOtpMock(mobileNo: number): Observable<OtpResponse[]> {
    const otp: OtpResponse = {
      referenceId: '1234',
    };
    return of([otp]).pipe(delay(2000));
  }

  verifyOtp(code: string): Observable<SuccessResponse | any> {
    let mobileNumber;
    let referenceId;
    let transactionId;
    this.mobileNo$.subscribe(value => (mobileNumber = value));
    this.refId$.subscribe(value => (referenceId = value));
    this.transactionId$.subscribe(value => {
      if (value.transactionId.length > 1) transactionId = value.transactionId;
    });

    const headers = transactionId
      ? new HttpHeaders({
          'x-session-id': transactionId,
        })
      : undefined;

    return this.http
      .post(
        '/api/verification-service/otp/verify',
        {
          code,
          mobileNumber,
          referenceId,
        },
        { headers, observe: 'response' }
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status == 204) {
            const value: SuccessResponse = { data: true };
            return value;
          } else {
            console.log('verify response ', res.body);
            const value: ErrorResponse = res.body;
            return value;
          }
        }),
        catchError((response, caught) => {
          console.log('error found - ', response);
          return of({
            error: {
              code: response.error.error.code,
              status: response.status,
              message: response.error.error.message,
            },
          });
        })
      );
  }

  verifyOtpMock(otp: string): Observable<boolean> {
    console.log(otp);
    if (otp == '123456') {
      return of(true).pipe(delay(2000));
    }
    return of(false).pipe(delay(2000));
  }

  fetchRecoveryState(
    orderId: string,
    otpReferenceId: string
  ): Observable<SuccessResponse | ErrorResponse> {
    const params = new HttpParams().set('orderId', orderId);

    const headers = new HttpHeaders({
      'x-session-id': otpReferenceId,
    });

    return this.http
      .get<SuccessResponse | ErrorResponse>(
        '/api/recovery-api-service/db/state',
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
}
