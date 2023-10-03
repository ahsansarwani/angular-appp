import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import {
  HttpClient,
  HttpResponse,
  HttpParams,
  HttpHeaders,
} from '@angular/common/http';
import {
  Observable,
  of,
  delay,
  map,
  catchError,
  debounceTime,
  firstValueFrom,
} from 'rxjs';
import { select, Store } from '@ngrx/store';
import { OtpState } from '../../otp/state/otp.reducer';
import { DAFScanState } from '../../daf-scan/state/daf-scan.model';
import { refIdSelect } from '../../otp/state/otp.selectors';
import { orderTransacIdSelect } from '../../daf-scan/state/daf-scan.selectors';

@Injectable()
export class EmailValidators {
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
          // console.log('error found 123 - ', err);
          return of(false);
        })
      );
  }
  noEmptySpacesValidator(control: any) {
    if (control.value && control.value.trim() === '') {
      return { emptySpaces: true };
    }
    return null;
  }
  noLeadingSpaceValidator(control: any): { [key: string]: any } | null {
    if (control.value && control.value.trimLeft() !== control.value) {
      return { leadingSpace: true };
    }
    return null;
  }
  createValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      return this.validateEmail(control.value).pipe(
        debounceTime(400),
        map((result: boolean) => {
          // console.log('Email result - ', result);
          if (result) {
            return null;
          } else {
            return { emailValid: true };
          }
        }),
        catchError((err, caught) => {
          // console.log('error found - ', err);
          return of({ emailValid: true });
        })
      );
    };
  }
}
