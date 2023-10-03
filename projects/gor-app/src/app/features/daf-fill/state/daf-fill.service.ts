import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, delay, map, catchError, firstValueFrom } from 'rxjs';
import { AddressResponse } from './daf-fill.model';
import { ErrorResponse, SuccessResponse } from '../../../app-state/app.model';
import { OtpState } from '../../otp/state/otp.reducer';
import { DAFScanState } from '../../daf-scan/state/daf-scan.model';
import { refIdSelect } from '../../otp/state/otp.selectors';
import { select, Store } from '@ngrx/store';
import { orderTransacIdSelect } from '../../daf-scan/state/daf-scan.selectors';

@Injectable()
export class DAFFillService {
  otpRefId: any;
  transactionId: any;
  sessionId: any;

  constructor(
    private http: HttpClient,
    private otpStore: Store<OtpState>,
    private scanStore: Store<DAFScanState>
  ) {
    const fetchValues = async () => {
      this.otpRefId = await firstValueFrom(
        this.otpStore.pipe(select(refIdSelect))
      );
      this.transactionId = await firstValueFrom(
        this.scanStore.pipe(select(orderTransacIdSelect))
      );

      this.sessionId = this.otpRefId
        ? this.otpRefId
        : this.transactionId.transactionId;
    };
    fetchValues();
  }

  fetchProvinces(): Observable<SuccessResponse | ErrorResponse> {
    const params = new HttpParams()
      .set('countryId', 'PH')
      .set('division', 'province');

    return this.http
      .get<SuccessResponse | ErrorResponse>('/api/central-service/db/address', {
        params,
        observe: 'response',
      })
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

  fetchCities(
    provinceCode: string
  ): Observable<SuccessResponse | ErrorResponse> {
    const params = new HttpParams()
      .set('countryId', 'PH')
      .set('division', 'city')
      .set('codeName', 'province')
      .set('code', provinceCode);

    return this.http
      .get<SuccessResponse | ErrorResponse>('/api/central-service/db/address', {
        params,
        observe: 'response',
      })
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

  fetchBgys(cityCode: string): Observable<SuccessResponse | ErrorResponse> {
    const params = new HttpParams()
      .set('countryId', 'PH')
      .set('division', 'barangay')
      .set('codeName', 'city')
      .set('code', cityCode);

    return this.http
      .get<SuccessResponse | ErrorResponse>('/api/central-service/db/address', {
        params,
        observe: 'response',
      })
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

  fetchPostal(
    barangayCode: string
  ): Observable<SuccessResponse | ErrorResponse> {
    const params = new HttpParams()
      .set('countryId', 'PH')
      .set('division', 'postalCode')
      .set('codeName', 'barangay')
      .set('code', barangayCode);

    return this.http
      .get<SuccessResponse | ErrorResponse>('/api/central-service/db/address', {
        params,
        observe: 'response',
      })
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

  validateEmail(email: string): Observable<boolean> {
    const params = new HttpParams().set('email', email);
    const headers = new HttpHeaders({
      'x-session-id': this.sessionId,
    });

    return this.http
      .get<boolean>('/api/verification-service/zb/validate', {
        params,
        headers,
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status === 204) {
            return true;
          } else {
            return false;
          }
        }),
        catchError((err, caught) => {
          console.log('error found - ', err);
          return of(false);
        })
      );
  }
}
