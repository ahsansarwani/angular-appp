import { Injectable, mergeApplicationConfig } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { EligibilityActions } from './eligibility.actionTypes';
import { delay, takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { catchError, map, mergeMap, of, combineLatest } from 'rxjs';
import { EligibilityService } from './eligibility.service';
import { AccountInfoResponse, EligibilityState } from './eligibility.model';
import {
  accountInfo,
  accountStatusSelect,
  brandStatusSelect,
  customerStatusSelect,
  duplicateInfoSelect,
  duplicateStatusSelect,
  eligibilityInfoSelect,
  eligStatusSelect,
  mobileNo,
  sufficiencyPayloadSelect,
  sufficiencyStatusSelect,
} from './eligibility.selectors';
import {
  CustomerTypeState,
  PlanState,
} from '../../plan-selector/state/plan-selector.model';
import {
  customerTypeSelect,
  planSelect,
} from '../../plan-selector/state/plan-selector.selectors';
import { accountInfoSelect, brandInfoSelect } from './eligibility.selectors';
import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { AppState } from '../../../app-state/app.model';
import { AppActions } from '../../../app-state/app.actionTypes';
import { DAFFillState } from '../../daf-fill/state/daf-fill.model';
import { formSelector } from '../../daf-fill/state/daf-fill.selector';
import { OtpState } from '../../otp/state/otp.reducer';
import { mobileNoSelect, refIdSelect } from '../../otp/state/otp.selectors';
import { RedirectActions } from '../../redirect/state/redirect.actionTypes';
import { DafReviewState } from '../../daf-review/state/daf-review.model';
import { DafReviewActions } from '../../daf-review/state/daf-review.actionTypes';
import {
  ADA_API_FAILED,
  FTA_ADVERSE_FINDING,
  FTA_API_FAILED,
} from '../../../globals/gtm-events/plan-selector/events';
import { GoogleTagManagerService } from '../../../app-state/gtm.service';
@Injectable()
export class EligibilityEffects {
  startChecks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.startChecks),
      concatLatestFrom(() => [
        this.customerType.select(customerTypeSelect),
        this.storeState.pipe(select(brandStatusSelect)),
        this.storeState.pipe(select(accountStatusSelect)),
        this.storeState.pipe(select(customerStatusSelect)),
        this.storeState.pipe(select(duplicateStatusSelect)),
        this.storeState.pipe(select(sufficiencyStatusSelect)),
        this.storeState.pipe(select(eligStatusSelect)),
        this.storeState.pipe(select(duplicateInfoSelect)),
      ]),
      mergeMap(
        ([
          action,
          customer,
          brand,
          accountInfo,
          customerInfo,
          duplicateInfo,
          suffInfo,
          eligInfo,
          duplicateDetails,
        ]) => {
          if (customer === 'FTA') {
            if (
              duplicateInfo.duplicateErrorStatus === true ||
              eligInfo.eligibilityErrorStatus === true
            ) {
              return of(
                AppActions.navigate({ from: 'ELIGIBILITY_FAIL_FTA_2' })
              );
            }

            if (duplicateInfo.duplicateErrorStatus === undefined) {
              return of(
                EligibilityActions.checkDuplicateOrdersInit({
                  mobileNo: action.mobileNo,
                  customerType: action.customerType,
                })
              );
            }
            if (
              duplicateInfo.duplicateErrorStatus === false &&
              duplicateInfo.duplicateCheckStatus === true &&
              eligInfo.eligibilityCheckStatus !== true
            ) {
              return of(
                EligibilityActions.noDuplicateFoundFTA({
                  mobileNo: action.mobileNo,
                  customerType: action.customerType,
                  data: duplicateDetails,
                })
              );
            }
          } else if (customer === 'ADA') {
            // console.log('Brand ----- ', brand);
            // console.log('customer ---', customerInfo);
            // console.log('account ---', accountInfo);
            if (brand.brandErrorStatus !== false) {
              return of(
                EligibilityActions.fetchBrandInfoInit({
                  mobileNo: action.mobileNo,
                  customerType: action.customerType,
                })
              );
            }

            if (
              brand.brandCheckStatus == true &&
              (customerInfo.customerErrorStatus !== false ||
                accountInfo.accountErrorStatus !== false)
            ) {
              return of(
                EligibilityActions.fetchBrandSuccess({
                  mobileNo: action.mobileNo,
                  customerType: action.customerType,
                })
              );
            }

            if (
              brand.brandCheckStatus === true &&
              customerInfo.customerCheckStatus === true &&
              accountInfo.accountCheckStatus === true &&
              (duplicateInfo.duplicateErrorStatus !== false ||
                suffInfo.sufficiencyErrorStatus !== false)
            ) {
              return of(
                EligibilityActions.fetchAccountCustomerSuccess({
                  mobileNo: action.mobileNo,
                  customerType: action.customerType,
                })
              );
            }

            if (
              brand.brandCheckStatus === true &&
              customerInfo.customerCheckStatus === true &&
              accountInfo.accountCheckStatus === true &&
              duplicateInfo.duplicateCheckStatus === true &&
              suffInfo.sufficiencyCheckStatus === true &&
              eligInfo.eligibilityErrorStatus !== false
            ) {
              return of(
                EligibilityActions.noDuplicateAndSufficient({
                  mobileNo: action.mobileNo,
                  customerType: action.customerType,
                })
              );
            }
          }
          return of(AppActions.navigate({ from: 'EMPTY' }));
        }
      )
    )
  );

  brandInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.fetchBrandInfoInit),
      delay(500),
      mergeMap(action => {
        return this.eligibilityService.getAccountBrand(action.mobileNo).pipe(
          map((accountBrand: any) => {
            console.log('got brand', accountBrand);
            if ('data' in accountBrand) {
              // console.log('in if');
              //this.eligibilityService.getAccountDetails(action.mobileNo)
              if (
                accountBrand.data.brand &&
                accountBrand.data.brandType &&
                accountBrand.data.brand === 'GHP' &&
                accountBrand.data.brandType === 'POSTPAID'
              ) {
                return EligibilityActions.fetchBrandSuccess({
                  data: accountBrand.data,
                  mobileNo: action.mobileNo,
                  customerType: action.customerType,
                });
              } else {
                return EligibilityActions.ftaInAda();
              }
            } else {
              // console.log('in else');
              // return EligibilityActions.fetchBrandSuccess({
              //   data: {
              //     brand: 'GHP',
              //     brandType: 'POSTPAID',
              //   },
              //   mobileNo: action.mobileNo,
              //   customerType: action.customerType,
              // });
              return EligibilityActions.fetchBrandFail({
                error: {
                  message: '',
                  details: '',
                },
              });
            }
          }),
          catchError(err => {
            return of(
              EligibilityActions.fetchBrandFail({
                error: {
                  message: '',
                  details: '',
                },
              })
            );
          })
          // catchError(error => of(EligibilityActions.fetchBrandFail()))
        );
      })
    )
  );

  brandSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.fetchBrandSuccess),
      map(action =>
        EligibilityActions.fetchAccountInfoInit({
          mobileNo: action.mobileNo,
          customerType: action.customerType,
        })
      ),
      catchError(() =>
        of(
          EligibilityActions.fetchAccountFail({
            error: {
              message: '',
              details: '',
            },
          })
        )
      )
    )
  );

  accountInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.fetchAccountInfoInit),
      mergeMap(action => {
        return this.eligibilityService.getAccountDetails(action.mobileNo).pipe(
          map((accountInfo: any) => {
            // console.log("Got account info - ", accountInfo);
            if ('data' in accountInfo) {
              //this.eligibilityService.getAccountDetails(action.mobileNo)
              return EligibilityActions.fetchAccountSuccess({
                data: accountInfo.data,
                mobileNo: action.mobileNo,
                customerType: action.customerType,
              });
            } else {
              return EligibilityActions.fetchAccountFail(accountInfo.error);
            }
          }),
          catchError(error =>
            of(
              EligibilityActions.fetchAccountFail({
                error: {
                  message: '',
                  details: '',
                },
              })
            )
          )
        );
      })
    )
  );

  getCustomerDetailsInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.fetchAccountSuccess),
      mergeMap(action => {
        return this.eligibilityService.getCustomerDetails(action.mobileNo).pipe(
          map((customerInfo: any) => {
            // console.log("Got account info - ", accountInfo);
            if ('data' in customerInfo) {
              //this.eligibilityService.getAccountDetails(action.mobileNo)
              return EligibilityActions.fetchCustomerSuccess({
                data: customerInfo.data,
                mobileNo: action.mobileNo,
                customerType: action.customerType,
              });
            } else {
              return EligibilityActions.fetchCustomerFail(customerInfo.error);
            }
          }),
          catchError(error =>
            of(
              EligibilityActions.fetchCustomerFail({
                error: {
                  message: '',
                  details: '',
                },
              })
            )
          )
        );
      })
    )
  );

  fetchAccountCustomerStatus$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(EligibilityActions.fetchAccountSuccess)),
      this.actions$.pipe(ofType(EligibilityActions.fetchCustomerSuccess)),
    ]).pipe(
      mergeMap(([action1, action2]) => {
        return of(
          EligibilityActions.fetchAccountCustomerSuccess({
            mobileNo: action1.mobileNo,
            customerType: action1.customerType,
          })
        );
      })
    )
  );

  fetchAccountCustomerSuccess1$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.fetchAccountCustomerSuccess),
      map(action =>
        EligibilityActions.checkDuplicateOrdersInit({
          mobileNo: action.mobileNo,
          customerType: action.customerType,
        })
      ),
      catchError(() =>
        of(
          EligibilityActions.fetchAccountFail({
            error: {
              message: '',
              details: '',
            },
          })
        )
      )
    )
  );

  fetchAccountCustomerSuccess2$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.noDuplicateFoundADA),
      concatLatestFrom(() => [
        this.storeState.select(sufficiencyPayloadSelect),
      ]),
      map(([action, payload]) => {
        if (payload != undefined) {
          return EligibilityActions.checkSufficiencyInit({
            payload: payload,
          });
        } else {
          return EligibilityActions.checkSufficiencyFail({
            error: {
              message: '',
              details: '',
            },
          });
        }
      }),
      catchError(() =>
        of(
          EligibilityActions.checkSufficiencyFail({
            error: {
              message: '',
              details: '',
            },
          })
        )
      )
    )
  );

  duplicateInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.checkDuplicateOrdersInit),
      concatLatestFrom(() => [
        this.storeState.select(accountInfoSelect),
        this.dafFillStore.select(formSelector),
        this.customerType.select(customerTypeSelect),
      ]),
      mergeMap(([action, accountInfo, formInfo, customerType]) => {
        // console.log('side effects duplicate', action);
        // console.log(accountInfo);
        const payload: any = {};
        payload.mobileNo = action.mobileNo;
        if (this.customer == 'ADA') {
          payload.firstName = accountInfo.firstName;
          payload.middleName = accountInfo.middleName;
          payload.lastName = accountInfo.lastName;
          payload.birthday = accountInfo.birthday;
          payload.motherMaidenName = accountInfo.motherMaidenName
            ? accountInfo.motherMaidenName
            : '';
          payload.email = accountInfo.email
            ? accountInfo.email
            : 'default@globe.com.ph';
          payload.address =
            accountInfo.street +
            ',' +
            accountInfo.subdivisionVillage +
            ',' +
            accountInfo.city +
            ',' +
            accountInfo.province +
            ',' +
            accountInfo.postalCode;
        } else {
          payload.firstName = formInfo.personalInfo.firstName;
          payload.middleName = formInfo.personalInfo.middleName;
          payload.lastName = formInfo.personalInfo.lastName;
          payload.birthday = formInfo.personalInfo.birthday;
          payload.motherMaidenName = formInfo.personalInfo.motherMaidenName;
          payload.email = formInfo.personalInfo.email;
          payload.address =
            (formInfo.addressInfo.street
              ? formInfo.addressInfo.street
              : formInfo.addressInfo._street
              ? formInfo.addressInfo._street
              : '') +
            ',' +
            formInfo.addressInfo.barangay +
            ',' +
            formInfo.addressInfo.city +
            ',' +
            formInfo.addressInfo.province +
            ',' +
            formInfo.addressInfo.zipCode;
        }
        return this.eligibilityService
          .checkDuplicateOrders(
            payload.mobileNo,
            payload.firstName,
            payload.middleName,
            payload.lastName,
            payload.birthday,
            payload.motherMaidenName,
            payload.email,
            payload.address,
            'Acquisition',
            customerType ? customerType : 'FTA'
          )
          .pipe(
            map(duplicateInfo => {
              console.log('Duplicate Info', duplicateInfo);
              if ('data' in duplicateInfo) {
                //this.eligibilityService.getAccountDetails(action.mobileNo)
                if (duplicateInfo.data.isDuplicate == false) {
                  console.log(
                    'duplicate result',
                    duplicateInfo.data.isDuplicate
                  );
                  if (customerType == 'ADA') {
                    return EligibilityActions.noDuplicateFoundADA({
                      data: duplicateInfo.data,
                      mobileNo: action.mobileNo,
                      customerType: action.customerType,
                    });
                  } else {
                    return EligibilityActions.noDuplicateFoundFTA({
                      data: duplicateInfo.data,
                      mobileNo: action.mobileNo,
                      customerType: action.customerType,
                    });
                  }
                } else if (duplicateInfo.data.isDuplicate == true) {
                  // console.log(
                  //   'duplicate status 1',
                  //   !duplicateInfo.data.previousOrderData
                  // );
                  // console.log(
                  //   'duplicate status 2',
                  //   duplicateInfo.data.previousOrderData &&
                  //     Object.keys(duplicateInfo.data.previousOrderData).length >
                  //       0
                  // );
                  if (
                    duplicateInfo.data.previousOrderData &&
                    Object.keys(duplicateInfo.data.previousOrderData).length > 0
                  ) {
                    return EligibilityActions.duplicateFound({
                      prevOrderStatus: true,
                      prevOrderData: duplicateInfo.data.previousOrderData,
                    });
                  } else {
                    return EligibilityActions.duplicateFound({
                      prevOrderStatus: false,
                    });
                  }
                } else {
                  return EligibilityActions.duplicateFetchFail({
                    error: {
                      message: '',
                      details: '',
                    },
                  });
                }
              } else {
                // return EligibilityActions.noDuplicateFoundFTA({
                //   data: { isDuplicate: false, previousOrderData: {} },
                //   mobileNo: action.mobileNo,
                //   customerType: action.customerType,
                // });
                return EligibilityActions.duplicateFetchFail(
                  duplicateInfo.error
                );
              }
            }),
            takeUntil(
              this.actions$.pipe(
                ofType(
                  EligibilityActions.notSufficient,
                  EligibilityActions.checkSufficiencyFail
                )
              )
            ),
            catchError(error =>
              of(
                EligibilityActions.duplicateFetchFail({
                  error: {
                    message: '',
                    details: '',
                  },
                })
              )
            )
          );
      })
    )
  );

  sufficiencyInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.checkSufficiencyInit),
      mergeMap(action => {
        return this.eligibilityService
          .getSufficiencyResult(action.payload)
          .pipe(
            map((sufficiencyInfo: any) => {
              console.log('Got sufficiency info - ', sufficiencyInfo);
              if ('data' in sufficiencyInfo) {
                if (
                  sufficiencyInfo.data.cslSufficiencyResultCode == 3 ||
                  sufficiencyInfo.data.cslSufficiencyResultCode == 1
                ) {
                  sufficiencyInfo.data.isSufficient = true;
                  return EligibilityActions.sufficient({
                    data: sufficiencyInfo.data,
                  });
                } else if (
                  sufficiencyInfo.data.cslSufficiencyResultCode == 2 ||
                  sufficiencyInfo.data.cslSufficiencyResultCode == 4
                ) {
                  sufficiencyInfo.data.isSufficient = false;
                  return EligibilityActions.notSufficient({
                    data: sufficiencyInfo.data,
                  });
                } else {
                  // sufficiencyInfo.data.isSufficient = false;
                  return EligibilityActions.checkSufficiencyFail({
                    error: {},
                  });
                }
              } else {
                return EligibilityActions.checkSufficiencyFail({ error: {} });
              }
            }),
            takeUntil(
              this.actions$.pipe(
                ofType(
                  EligibilityActions.duplicateFound,
                  EligibilityActions.duplicateFetchFail
                )
              )
            ),
            catchError(error => {
              console.log('Error is ', error);
              return of(
                EligibilityActions.checkSufficiencyFail({
                  error: {
                    message: '',
                    details: '',
                  },
                })
              );
            })
          );
      })
    )
  );

  duplicateFound$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.duplicateFound),
      map(action => {
        return AppActions.navigate({ from: 'ELIGIBILITY_DUPLICATE' });
      })
    )
  );

  notSufficient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.notSufficient),
      map(action => {
        return AppActions.navigate({ from: 'ELIGIBILITY_INSUFFICIENT' });
      })
    )
  );

  duplicateAndSufficientStatus$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(EligibilityActions.noDuplicateFoundADA)),
      this.actions$.pipe(ofType(EligibilityActions.sufficient)),
    ]).pipe(
      mergeMap(([action1, action2]) => {
        return of(
          EligibilityActions.noDuplicateAndSufficient({
            mobileNo: action1.mobileNo,
            customerType: action1.customerType,
          })
        );
      })
    )
  );

  noDuplicateSufficient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        EligibilityActions.noDuplicateAndSufficient,
        EligibilityActions.noDuplicateFoundFTA
      ),
      map(action =>
        EligibilityActions.checkOBInit({
          mobileNo: action.mobileNo,
          customerType: action.customerType,
        })
      ),
      catchError(() =>
        of(
          EligibilityActions.checkOBFail({
            error: {
              message: '',
              details: '',
            },
          })
        )
      )
    )
  );

  OBInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.checkOBInit),
      concatLatestFrom(() => [
        this.storeState.select(accountInfoSelect),
        this.dafFillStore.select(formSelector),
        this.otpStore.select(mobileNoSelect),
        this.otpStore.select(refIdSelect),
      ]),
      mergeMap(([action, accountInfo, formInfo, mobile, refId]) => {
        // console.log('side effects balance', action.mobileNo);
        const individualInfo: any = {};
        const addressInfo: any = {};
        addressInfo.billingAddress = {};
        if (this.customer == 'ADA') {
          individualInfo.fName = accountInfo.firstName;
          individualInfo.lName = accountInfo.lastName;
          individualInfo.midName = accountInfo.middleName;
          individualInfo.dob = accountInfo.birthday.includes('T')
            ? accountInfo.birthday.substring(0, 10)
            : accountInfo.birthday;
          individualInfo.idVal = '1234567';
          individualInfo.idType = '6';
          individualInfo.contactNumber = mobile;
          // individualInfo.email = formInfo.personalInfo.emailAddress;
          individualInfo.email = accountInfo.email
            ? accountInfo.email
            : 'default@globe.com.ph';

          individualInfo.companyName = '';
          // individualInfo.motherMaidenName = accountInfo.motherMaidenName
          //   ? accountInfo.motherMaidenName
          //   : '';
          addressInfo.billingAddress.floorRoomNo = accountInfo.floorNo
            ? accountInfo.floorNo
            : '';
          addressInfo.billingAddress.buildingName = accountInfo.building
            ? accountInfo.building
            : '';
          addressInfo.billingAddress.houseBuildingNo = accountInfo.houseNo
            ? accountInfo.houseNo
            : '';
          addressInfo.billingAddress.streetNameNo = accountInfo.street
            ? accountInfo.street
            : '';
          addressInfo.billingAddress.brgyVillage =
            accountInfo.subdivisionVillage
              ? accountInfo.subdivisionVillage
              : '';
          addressInfo.billingAddress.province = accountInfo.province
            ? accountInfo.province
            : '';
          addressInfo.billingAddress.city = accountInfo.city
            ? accountInfo.city
            : '';
          addressInfo.billingAddress.postalCode = accountInfo.postalCode
            ? accountInfo.postalCode
            : '';
        } else {
          individualInfo.fName = formInfo.personalInfo.firstName;
          individualInfo.lName = formInfo.personalInfo.lastName;
          individualInfo.midName = formInfo.personalInfo.middleName;
          individualInfo.dob = formInfo.personalInfo.birthday;
          individualInfo.idVal = '1234567';
          individualInfo.idType = '6';
          individualInfo.contactNumber = formInfo.personalInfo.mobileNumber;
          individualInfo.email = formInfo.personalInfo.emailAddress
            ? formInfo.personalInfo.emailAddress
            : formInfo.personalInfo.email
            ? formInfo.personalInfo.email
            : '';
          individualInfo.companyName = '';
          individualInfo.motherMaidenName =
            formInfo.personalInfo.mothersMaidenName;

          addressInfo.billingAddress.floorRoomNo = formInfo.addressInfo.floorNo
            ? formInfo.addressInfo.floorNo
            : '';
          addressInfo.billingAddress.buildingName = formInfo.addressInfo
            .building
            ? formInfo.addressInfo.building
            : '';
          addressInfo.billingAddress.houseBuildingNo = formInfo.addressInfo
            .houseNo
            ? formInfo.addressInfo.houseNo
            : '';
          addressInfo.billingAddress.streetNameNo = formInfo.addressInfo.street;
          addressInfo.billingAddress.brgyVillage =
            formInfo.addressInfo.barangay;
          addressInfo.billingAddress.province = formInfo.addressInfo.province;
          addressInfo.billingAddress.city = formInfo.addressInfo.city;
          addressInfo.billingAddress.postalCode = formInfo.addressInfo.zipCode;
        }
        return this.eligibilityService
          .checkEligibility(individualInfo, addressInfo, refId ? refId : '')
          .pipe(
            map(eligibilityInfo => {
              if ('data' in eligibilityInfo) {
                //this.eligibilityService.getAccountDetails(action.mobileNo)
                // console.log('In effects eligibility data is ', eligibilityInfo);
                if (
                  eligibilityInfo.data.eligibilityCheck.cndbResult !=
                    undefined &&
                  eligibilityInfo.data.eligibilityCheck.cndbResult
                    .toString()
                    .includes('Adverse')
                ) {
                  return EligibilityActions.checkOBNegative({
                    eligibilityInfo: eligibilityInfo.data,
                  });
                } else {
                  return EligibilityActions.checkOBPositive({
                    eligibilityInfo: eligibilityInfo.data,
                  });
                }
              } else {
                return EligibilityActions.checkOBFail({
                  error: eligibilityInfo.error,
                });
              }
              // return EligibilityActions.checkOBSuccess({ balanceInfo: b });
            }),
            catchError(error =>
              of(
                EligibilityActions.checkOBFail({
                  error: {
                    message: '',
                    details: '',
                  },
                })
              )
            )
          );
      })
    )
  );

  OBPositive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.checkOBPositive),
      map(action => {
        // console.log('in ob success');
        return EligibilityActions.checkAlertsInit({
          mobileNo: '',
          customerType: this.customer,
        });
      }),
      catchError(error => {
        // console.log('in error block', error);
        return of(EligibilityActions.checkAlertsFail());
      })
    )
  );

  OBNegative$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.checkOBNegative),
      map(action => {
        // console.log('in ob success');
        this.gtmService.captureGTMEvent(FTA_ADVERSE_FINDING);
        return AppActions.navigate({ from: 'ELIGIBILITY_ADVERSE' });
      }),
      catchError(error => {
        // console.log('in error block', error);
        return of(EligibilityActions.checkAlertsFail());
      })
    )
  );

  alertsInit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.checkAlertsInit),
      mergeMap(action => {
        // console.log('side effects alerts', action.mobileNo);
        return this.eligibilityService.checkAlertsMock(action.mobileNo).pipe(
          map(alertInfo => EligibilityActions.checkAlertsSuccess()),
          catchError(error => of(EligibilityActions.checkAlertsFail()))
        );
      })
    )
  );

  alertSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.checkAlertsSuccess),
      concatLatestFrom(() => [
        this.customerType.select(customerTypeSelect),
        this.storeState.pipe(select(eligibilityInfoSelect)),
        this.planStore.pipe(select(planSelect)),
      ]),
      mergeMap(([action, customer, eligibilityInfo, planInfo]) => {
        const historicBalanceList = eligibilityInfo?.processedBalanceList
          ? eligibilityInfo?.processedBalanceList.hbBalanceList
            ? eligibilityInfo?.processedBalanceList.hbBalanceList
            : []
          : [];
        const overdueBalanceList = eligibilityInfo?.processedBalanceList
          ? eligibilityInfo?.processedBalanceList.obBalanceList
            ? eligibilityInfo?.processedBalanceList.obBalanceList
            : []
          : [];

        const payTodayTotal = eligibilityInfo?.processedBalanceList
          ? eligibilityInfo?.processedBalanceList.amount
            ? eligibilityInfo?.processedBalanceList.amount
            : 0
          : 0;
        const hbTotal = eligibilityInfo?.processedBalanceList
          ? eligibilityInfo?.processedBalanceList.amtHb
            ? eligibilityInfo?.processedBalanceList.amtHb
            : 0
          : 0;
        const obTotal = eligibilityInfo?.processedBalanceList
          ? eligibilityInfo?.processedBalanceList.amtOb
            ? eligibilityInfo?.processedBalanceList.amtOb
            : 0
          : 0;

        let showHistoricBalanceListTitle = false;
        let showOverdueBalanceListTitle = false;
        let isVisible = false;
        let bText = 'Get your SIM now';

        if (historicBalanceList.length > 0) {
          showHistoricBalanceListTitle = true;
          isVisible = true;
          bText = 'Pay now and submit';
        }
        if (overdueBalanceList.length > 0) {
          showOverdueBalanceListTitle = true;
          isVisible = true;
          bText = 'Pay now and submit';
        }

        this.dafReviewStore.dispatch(
          DafReviewActions.fetchEligibilityDetails({
            details: {
              customerType: customer,
              historicBalanceList: historicBalanceList,
              overdueBalanceList: overdueBalanceList,
              isPaymentModeVisible: isVisible,
              buttonText: bText,
              historicBalanceTitle: showHistoricBalanceListTitle,
              overdueBalanceTitle: showOverdueBalanceListTitle,
              payTodayTotal: payTodayTotal,
              hbTotal: hbTotal,
              obTotal: obTotal,
              planInfo: planInfo,
            },
          })
        );

        if (customer === 'FTA') {
          return of(AppActions.navigate({ from: 'ELIGIBILITY_FTA' }));
        } else if (customer === 'ADA') {
          return of(AppActions.navigate({ from: 'ELIGIBILITY_ADA' }));
        } else {
          return of(AppActions.navigate({ from: 'EMPTY' }));
        }
      }),
      delay(2000)
    )
  );

  initiateChat$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.checkAlertsSuccess),
      concatLatestFrom(() => [this.customerType.select(customerTypeSelect)]),
      mergeMap(([action, customer]) => {
        if (customer == 'ADA') return of(AppActions.initChatToken());
        else return of(AppActions.navigate({ from: '' }));
      })
    )
  );

  ftaInAdaButton$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EligibilityActions.ftaInAdaBtn),
      map(action => {
        // console.log('button clicked');
        if (action.choice === 'new') {
          return AppActions.navigate({
            from: 'ELIGIBILITY_FTA_IN_ADA_TO_SCAN',
          });
        } else {
          return AppActions.navigate({
            from: 'ELIGIBILITY_FTA_IN_ADA_TO_OTP',
          });
        }
      }),
      catchError(error => {
        console.log('in error block', error);
        return of(EligibilityActions.checkAlertsFail());
      })
    )
  );

  apiFailure1$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          EligibilityActions.fetchBrandFail,
          EligibilityActions.fetchAccountFail,
          EligibilityActions.fetchCustomerFail
        ),
        tap(action => {
          // console.log('verify success effect triggered - ', action);
          if (this.customer == 'ADA') {
            this.store.dispatch(
              AppActions.navigate({ from: 'ELIGIBILITY_FAIL_ADA_1' })
            );
          } else {
            this.store.dispatch(
              AppActions.navigate({ from: 'ELIGIBILITY_FAIL_FTA_1' })
            );
          }
        })
      ),
    { dispatch: false }
  );

  apiFailure2$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          EligibilityActions.duplicateFetchFail,
          EligibilityActions.checkSufficiencyFail,
          EligibilityActions.checkOBFail
        ),
        tap(action => {
          // console.log('verify success effect triggered - ', action);
          if (this.customer == 'ADA') {
            this.gtmService.captureGTMEvent(ADA_API_FAILED);
            this.store.dispatch(
              AppActions.navigate({ from: 'ELIGIBILITY_FAIL_ADA_2' })
            );
          } else {
            this.gtmService.captureGTMEvent(FTA_API_FAILED);
            this.store.dispatch(
              AppActions.navigate({ from: 'ELIGIBILITY_FAIL_FTA_2' })
            );
          }
        })
      ),
    { dispatch: false }
  );

  customerType$: any;
  customer: any;

  constructor(
    private actions$: Actions,
    private eligibilityService: EligibilityService,
    private router: Router,
    private store: Store<AppState>,
    private storeState: Store<EligibilityState>,
    private customerType: Store<CustomerTypeState>,
    private planStore: Store<PlanState>,
    private dafFillStore: Store<DAFFillState>,
    private dafReviewStore: Store<DafReviewState>,
    private otpStore: Store<OtpState>,
    private gtmService: GoogleTagManagerService
  ) {
    this.customerType$ = this.customerType.pipe(select(customerTypeSelect));
    this.customerType$.subscribe((customer: any) => {
      this.customer = customer;
    });
    //var accountInfo=this.storeState.pipe(select())
  }
}
