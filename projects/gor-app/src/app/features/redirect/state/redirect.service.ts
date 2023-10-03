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
  timeout,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { RedirectState } from './redirect.model';
import { ErrorResponse, SuccessResponse } from '../../../app-state/app.model';
import { delayInterval } from '../../../globals/config';
import { action } from '@datorama/akita';
@Injectable()
export class RedirectService {
  constructor(private http: HttpClient, private store: Store<RedirectState>) {}

  checkResultSuccessCallback(
    transactionId: string,
    refId: any
  ): Observable<SuccessResponse | ErrorResponse> {
    let headers = refId
      ? new HttpHeaders({
          'x-session-id': refId,
        })
      : new HttpHeaders({
          'x-session-id': transactionId,
        });

    return this.http
      .post<SuccessResponse | ErrorResponse>(
        '/api/verification-service/zoloz/check-result',
        {
          transactionId: transactionId,
        },
        { headers: headers, observe: 'response' }
      )
      .pipe(
        delay(delayInterval),
        map((res: HttpResponse<any>) => {
          if (res.status == 200) {
            const value: SuccessResponse = res.body.data;
            return value;
          } else {
            // console.log('temp', res.body);
            const value: ErrorResponse = res.body.error;
            return value;
          }
        }),
        catchError((err, caught) => {
          // console.log('error found - ', err);
          // console.log(err.status, err.status == 502, err.status == 400);
          if (err.status == 502) {
            const message = err.error.error.message
              ? err.error.error.message.split('.')[1].trim()
              : 'not found';
            // console.log(message);
            return of({ error: { message: message, details: '' } });
          } else if (err.status == 400) {
            return of({ error: { message: 'Failure', details: '' } });
          } else {
            return of({ error: { message: 'CatchBlock', details: '' } });
          }
        })
      );
  }

  checkResultFailCallback(
    transactionId: string,
    refId: any
  ): Observable<SuccessResponse | ErrorResponse> {
    let headers = refId
      ? new HttpHeaders({
          'x-session-id': refId,
        })
      : new HttpHeaders({
          'x-session-id': transactionId,
        });

    return this.http
      .post<SuccessResponse | ErrorResponse>(
        '/api/verification-service/zoloz/check-result',
        {
          transactionId: transactionId,
        },
        { headers: headers, observe: 'response' }
      )
      .pipe(
        delay(delayInterval),
        map((res: HttpResponse<any>) => {
          if (res.status == 200) {
            const value: SuccessResponse = res.body.data;
            return value;
          } else {
            // console.log('temp', res.body);
            const value: ErrorResponse = res.body.error;
            return value;
          }
        }),
        catchError((err, caught) => {
          // console.log('error found - ', err);
          // console.log(err.status, err.status == 502, err.status == 400);
          if (err.status == 502) {
            const message = err.error.error.message
              ? err.error.error.message.split('.')[1].trim()
              : 'not found';
            // console.log(message);
            return of({ error: { message: message, details: '' } });
          } else if (err.status == 400) {
            return of({ error: { message: 'Failure', details: '' } });
          } else {
            return of({ error: { message: 'CatchBlock', details: '' } });
          }
        })
      );
  }

  recoveryFetchMobile(
    orderId: string
  ): Observable<SuccessResponse | ErrorResponse> {
    const params = new HttpParams().set('orderId', orderId);
    return this.http
      .get<SuccessResponse | ErrorResponse>(
        '/api/recovery-api-service/db/mobileNo',
        { params, observe: 'response' }
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
