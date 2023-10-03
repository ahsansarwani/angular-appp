import { Injectable, NgZone } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable, of, delay, map, catchError, debounceTime } from 'rxjs';
import { DafReviewState } from './daf-review.model';
import { select, Store } from '@ngrx/store';
import { payStatusSelect } from './daf-review.selectors';
import { DafReviewActions } from './daf-review.actionTypes';
declare let Xendit: any;
@Injectable()
export class CardValidator {
  payTodayTotal$: Observable<any | undefined>;
  amount: any;

  constructor(
    private http: HttpClient,
    private store: Store<DafReviewState>,
    private zone: NgZone
  ) {
    this.payTodayTotal$ = this.store.pipe(select(payStatusSelect));
    this.payTodayTotal$.subscribe(val => {
      this.amount = val;
    });
  }

  validateCardNo(cardNo: string): Observable<boolean> {
    // console.log('card no', cardNo);
    const status = Xendit.card.validateCardNumber(cardNo.replace(/\s/g, '')); // true
    return of(status);
  }

  validateCardValidity(validity: string): Observable<boolean> {
    // console.log('validity received', validity);
    const validityArray = validity.split('/').map(val => val.trim());
    const status = Xendit.card.validateExpiry(
      validityArray[0],
      '20' + validityArray[1]
    ); // true
    return of(status);
  }

  validateCardCvn(cvn: string): Observable<boolean> {
    // console.log('cvv received', cvn);
    const status = Xendit.card.validateCvn(cvn); // true
    return of(status);
  }

  noEmptySpacesValidator(control: any) {
    if (control.value && control.value.trim() === '') {
      return { emptySpaces: true };
    }
    return null;
  }

  cardNoValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      return this.validateCardNo(control.value).pipe(
        debounceTime(400),
        map((result: boolean) => {
          //   console.log('Card number - ', result);
          if (result === true) {
            return null;
          } else {
            return { cardNo: true };
          }
        }),
        catchError((err, caught) => {
          // console.log('error found - ', err);
          return of({ cardNo: true });
        })
      );
    };
  }

  cardValidityValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      return this.validateCardValidity(control.value).pipe(
        debounceTime(400),
        map((result: boolean) => {
          //   console.log('Card vaild - ', result);
          if (result === true) {
            return null;
          } else {
            return { cardValidity: true };
          }
        }),
        catchError((err, caught) => {
          // console.log('error found - ', err);
          return of({ cardValidity: true });
        })
      );
    };
  }
  cardCvnValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<{ [key: string]: any } | null> => {
      return this.validateCardCvn(control.value).pipe(
        debounceTime(400),
        map((result: boolean) => {
          //   console.log('card cvv - ', result);
          if (result === true) {
            return null;
          } else {
            return { cardCvn: true };
          }
        }),
        catchError((err, caught) => {
          // console.log('error found - ', err);
          return of({ cardCvn: true });
        })
      );
    };
  }

  getToken(cardNo: string, validity: string, cvn: string) {
    const validityArray = validity.split('/').map(val => val.trim());
    Xendit.card.createToken(
      {
        amount:
          this.amount?.toString() != '0' ? this.amount.toString() : '0.01',
        card_number: cardNo.replace(/\s/g, ''),
        card_exp_month: validityArray[0],
        card_exp_year: '20' + validityArray[1],
        card_cvn: cvn,
        is_multiple_use: false,
        should_authenticate: true,
        currency: 'PHP',
        on_behalf_of: '',
        token_id: '',
        external_id: '',
      },
      this.xenditResponseHandler
    );
  }

  xenditResponseHandler = (err: any, creditCardToken: any) => {
    this.zone.run(() => {
      if (err) {
        // Show the errors on the form
        console.log('Error', err);
        this.store.dispatch(DafReviewActions.failXendit());
      } else if (creditCardToken.status) {
        console.log('status', creditCardToken.status);
        if (creditCardToken.status === 'VERIFIED') {
          // Get the token ID:
          let token = creditCardToken.id;
          console.log('Success', token);
          this.store.dispatch(
            DafReviewActions.callBackSuccessXendit({ token: token })
          );
        } else if (creditCardToken.status === 'IN_REVIEW') {
          let token = creditCardToken.id;
          let authUrl = creditCardToken.payer_authentication_url;
          this.store.dispatch(
            DafReviewActions.authModalOpen({ token: token, url: authUrl })
          );
        } else if (creditCardToken.status === 'FAILED') {
          this.store.dispatch(DafReviewActions.failXendit());
        }
      } else {
        this.store.dispatch(DafReviewActions.failXendit());
      }
    });
  };
}
