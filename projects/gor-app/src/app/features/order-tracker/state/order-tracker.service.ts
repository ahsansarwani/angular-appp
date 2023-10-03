import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import { ErrorResponse } from '../../../app-state/app.model';
import { environment } from 'projects/gor-app/src/environments/environment';
import { OrderData, OrderToken } from './order-tracker.model';
import { ORDER_TRACKER_URLS } from './order-tracker.constants';

@Injectable()
export class OrderTrackerService {
  constructor(private http: HttpClient) { }

  fetchOrderToken(): Observable<OrderToken | ErrorResponse> {
    const header = new HttpHeaders().append('Authorization', environment.getOrderBasicToken);
    return this.http
      .post<OrderToken | ErrorResponse>(
        // 'https://0rc37vh83i.execute-api.ap-southeast-1.amazonaws.com/dev/v1/test',
        ORDER_TRACKER_URLS.GET_TOKEN,
        null,
        {
          headers: header,
          observe: 'response',
        }
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status == 200) {
            const value: OrderToken = res.body;
            return value;
          } else {
            const value: ErrorResponse = res.body;
            return value;
          }
        }),
        catchError((err) => {
          console.log('error found - ', err);
          return of({ error: { message: '', details: '' } });
        })
      );
  }

  fetchOrderDetails(token: string, refId: string, email: string): Observable<OrderData | ErrorResponse> {
    const params = new HttpParams().append('orderReferenceId', refId).append('email', email);
    const header = new HttpHeaders().append('Authorization', 'Bearer ' + token);
    return this.http
      .get<OrderData | ErrorResponse>(
        // 'https://0rc37vh83i.execute-api.ap-southeast-1.amazonaws.com/dev/v1/test',
        ORDER_TRACKER_URLS.GET_ORDER_HISTORY,
        {
          headers: header,
          params,
          observe: 'response',
        }
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status == 200 && 'result' in res.body) {
            const value: OrderData = res.body;
            return value;
          } else {
            const value: ErrorResponse = res.body;
            return value;
          }
        }),
        catchError((err) => {
          console.log('error found - ', err);
          return of({ error: { message: '', details: '' } });
        })
      );
  }

  formatDate(date: string, type = 'date'): any {
    if (type == 'date'){
      return `${new Date(date).toLocaleString("en-us", { 
        month: "long", day: "2-digit", year: "numeric" })}`
    } else if (type == 'timestamp') {
      return `${new Date(date).toLocaleString("en-us", {
        month: "long", day: "2-digit", year: "numeric", hour: 'numeric', minute: 'numeric', hour12: true })}`
        .replace(' at', ',')
    }
  }
}
