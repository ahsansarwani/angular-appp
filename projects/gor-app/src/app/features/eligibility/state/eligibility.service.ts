import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of, delay, catchError, map } from 'rxjs';
import {
  AccountInfoResponse,
  DuplicateCheckResponse,
  BalanceCheckResponse,
  AlertsCheckResponse,
  BalanceCheckList,
  HBBalanceDetails,
  OBBalanceDetails,
} from './eligibility.model';
import { select, Store } from '@ngrx/store';
import { OtpState } from '../../otp/state/otp.reducer';
import { refIdSelect } from '../../otp/state/otp.selectors';
import { SuccessResponse, ErrorResponse } from '../../../app-state/app.model';
@Injectable()
export class EligibilityService {
  referenceId: any;

  constructor(private http: HttpClient, private store: Store<OtpState>) {
    this.store.pipe(select(refIdSelect)).subscribe(ref => {
      if (ref) {
        this.referenceId = ref;
      }
    });
  }

  fetchAccountInfo(mobileNo: string): Observable<AccountInfoResponse> {
    return this.http.post<AccountInfoResponse>('/api/getAccountInfo', {
      mobileNo,
    });
  }

  getAccountBrand(mobileNumber: string) {
    const params = new HttpParams().set('msisdn', mobileNumber);
    const headers = this.referenceId
      ? new HttpHeaders({
          'x-session-id': this.referenceId,
        })
      : undefined;

    return this.http
      .get<SuccessResponse | ErrorResponse>(
        'api/eligibility-service/account/getAccountBrand',
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

  getCustomerDetails(mobileNumber: string) {
    const params = new HttpParams().set('mobileNumber', mobileNumber);
    const headers = new HttpHeaders().set('x-session-id', this.referenceId);

    return this.http
      .get<SuccessResponse | ErrorResponse>(
        '/api/eligibility-service/account/getCustomerDetails',
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

  getAccountDetails(mobileNumber: string) {
    const params = new HttpParams().set('mobileNumber', mobileNumber);

    const headers = this.referenceId
      ? new HttpHeaders({
          'x-session-id': this.referenceId,
        })
      : undefined;

    return this.http
      .get<SuccessResponse | ErrorResponse>(
        'api/central-service/account/details',
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

  fetchAccountInfoMock(mobileNo: string): Observable<AccountInfoResponse[]> {
    const accountInfo: AccountInfoResponse = {
      accountStatus: true,
      accountNo: 1234,
    };
    return of([accountInfo]).pipe(delay(2000));
  }

  getSufficiencyResult(payload: any): Observable<any> {
    const headers = this.referenceId
      ? new HttpHeaders({
          'x-session-id': this.referenceId,
        })
      : undefined;

    return this.http
      .post(
        'api/eligibility-service/cerebro/getSufficiencyResult',
        {
          ...payload,
        },
        { headers: headers, observe: 'response' }
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

  checkDuplicateOrders(
    mobileNumber: string,
    firstName: string,
    middleName: string,
    lastName: string,
    birthday: string,
    mothersMaidenName: string,
    email: string,
    address: string,
    applicationType: string,
    orderType: string
  ): Observable<any> {
    const headers = this.referenceId
      ? new HttpHeaders({
          'x-session-id': this.referenceId,
        })
      : undefined;

    return this.http
      .post(
        'api/eligibility-service/cerebro/checkDuplicateOrders',
        {
          firstName,
          middleName,
          lastName,
          birthday,
          mothersMaidenName,
          email,
          address,
          applicationType,
          orderType,
          mobileNumber,
        },
        { headers: headers, observe: 'response' }
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

  checkDuplicateOrdersMock(
    mobileNo: string
  ): Observable<DuplicateCheckResponse[]> {
    const duplicateInfo: DuplicateCheckResponse = {
      duplicateStatus: true,
    };
    return of([duplicateInfo]).pipe(delay(2000));
  }

  checkEligibility(
    individualInfo: any,
    addressInfo: any,
    otpRefId: string
  ): Observable<SuccessResponse | ErrorResponse> {
    const headers = new HttpHeaders({
      'x-session-id': otpRefId,
    });

    return this.http
      .post(
        'api/eligibility-service/account/searchindividualeligibility',
        {
          individualInfo,
          addressInfo,
        },
        { headers: headers, observe: 'response' }
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status == 200) {
            const temp: any = {};
            temp.data = res.body.data;

            if (temp.data.balanceCheck) {
              const b = this.processBalanceList(
                temp.data.balanceCheck.balanceCheckList
              );
              temp.data.processedBalanceList = b;
            }

            const value: SuccessResponse = temp;
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

  checkBalanceMock(mobileNo: string): Observable<BalanceCheckResponse[]> {
    const balanceInfo: BalanceCheckResponse = {
      balanceStatus: false,
      amount: 0,
    };
    return of([balanceInfo]).pipe(delay(2000));
  }

  checkAlerts(mobileNo: number): Observable<AlertsCheckResponse> {
    return this.http.post<AlertsCheckResponse>('/api/alerts', { mobileNo });
  }

  checkAlertsMock(mobileNo: string): Observable<AlertsCheckResponse[]> {
    const alertInfo: AlertsCheckResponse = {
      alertStatus: true,
    };
    return of([alertInfo]).pipe(delay(2000));
  }

  OBList(balanceInfo: any): Observable<OBBalanceDetails> {
    const OBObject: OBBalanceDetails = {
      accountNumber: balanceInfo.accountNumber,
      overdueBalance: balanceInfo.overdueBalance,
      product: balanceInfo.product,
    };

    return of(OBObject);
  }
  HBList(balanceInfo: any): Observable<HBBalanceDetails> {
    const HBObject: HBBalanceDetails = {
      accountNumber: balanceInfo.accountNumber,
      historicBalance: balanceInfo.historicBalance,
      product: balanceInfo.product,
    };
    console.log('In HB ist: ', HBObject);
    return of(HBObject);
  }
  processBalanceList(balanceInfo: any) {
    const HBObjects: any = [];
    const OBObjects: any = [];
    const main = {
      amount: 0,
      amtHb: 0,
      amtOb: 0,
      hbBalanceList: HBObjects,
      obBalanceList: OBObjects,
    };

    balanceInfo.map((b: any) => {
      if (b.historicBalance != null) {
        const object = this.HBList(b);
        object.subscribe(o => {
          main.amtHb = main.amtHb + parseFloat(o.historicBalance);
          main.amount = main.amount + parseFloat(o.historicBalance);
          HBObjects.push(o);
        });
      } else if (b.overdueBalance != null) {
        const object = this.OBList(b);
        object.subscribe(o => {
          main.amtOb = main.amtOb + parseFloat(o.overdueBalance);
          main.amount = main.amount + parseFloat(o.overdueBalance);
          OBObjects.push(o);
        });
      }
    });
    return main;
  }
}
