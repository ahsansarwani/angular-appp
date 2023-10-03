import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of, delay, map, catchError } from 'rxjs';
import { Countries, DAFInitResponse, IDs } from './daf-scan.model';
import { SuccessResponse, ErrorResponse } from '../../../app-state/app.model';
@Injectable()
export class DAFScanService {
  constructor(private http: HttpClient) {}

  checkIdInit(
    docType: string,
    docName: any,
    refId: any
  ): Observable<SuccessResponse | ErrorResponse> {
    let headers = refId
      ? new HttpHeaders({
          'x-session-id': refId,
        })
      : undefined;

    return this.http
      .post<SuccessResponse | ErrorResponse>(
        '/api/verification-service/zoloz/initialize',
        {
          docType,
          docName,
        },
        { headers: headers, observe: 'response' }
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status == 200) {
            const value: SuccessResponse = res.body.data;
            return value;
          } else {
            const value: ErrorResponse = res.body.error;
            return value;
          }
        }),
        catchError((err, caught) => {
          console.log('error found - ', err);
          return of({ error: { message: '', details: '' } });
        })
      );
  }

  checkIdInitMock(docType: string): Observable<DAFInitResponse> {
    const initInfo: DAFInitResponse = {
      transactionId: 'id',
      clientCfg: 'cfg',
    };
    return of(initInfo).pipe(delay(2000));
  }

  fetchNationality(): Observable<SuccessResponse | ErrorResponse> {
    return this.http
      .get<SuccessResponse | ErrorResponse>(
        '/api/central-service/db/countrydetails',
        {
          observe: 'response',
        }
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status == 200) {
            const value: SuccessResponse = res.body.data;
            return value;
          } else {
            const value: ErrorResponse = res.body.error;
            return value;
          }
        }),
        catchError((err, caught) => {
          console.log('error found - ', err);
          return of({ error: { message: '', details: '' } });
        })
      );
  }

  fetchIdList(
    countryCode: string
  ): Observable<SuccessResponse | ErrorResponse> {
    const params = new HttpParams().append('nationality', countryCode);
    return this.http
      .get<SuccessResponse | ErrorResponse>('/api/central-service/db/poid', {
        params,
        observe: 'response',
      })
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status == 200) {
            const value: SuccessResponse = res.body.data;
            return value;
          } else {
            const value: ErrorResponse = res.body.error;
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
