import { createReducer, on } from '@ngrx/store';
import { OtpActions } from '../../otp/state/otp.actionTypes';
import { initialLobState } from '../../plan-selector/state/plan-selector.reducer';
import { EligibilityActions } from './eligibility.actionTypes';
import { EligibilityState } from './eligibility.model';
import { balanceCheckList } from './eligibility.selectors';

export const initialEligibilityState: EligibilityState = {
  mobileNo: '',
  accountInfoInit: undefined,
  accountInfoStatus: 'uninit',
  accountInfoRetryCount: 0,
  accountInfoTime: undefined,
  duplicateInit: undefined,
  duplicateStatus: 'uninit',
  duplicateRetryCount: 0,
  duplicateTime: undefined,
  eligibilityInit: undefined,
  eligibilityStatus: 'uninit',
  eligibilityRetryCount: 0,
  eligibilityTime: undefined,
  alertsInit: undefined,
  alertsStatus: 'uninit',
  alertsRetryCount: 0,
  alertsTime: undefined,
  loaderPercent: 0,
  balanceCheckList: [],
  customerType: undefined,
};

export const eligibilityReducer = createReducer(
  initialEligibilityState,

  on(EligibilityActions.fetchBrandSuccess, (state, action) => {
    return {
      ...state,
      brandInfo: action.data,
      brandErrorStatus: false,
      brandCheckStatus: true,
    };
  }),

  on(EligibilityActions.fetchBrandFail, (state, action) => {
    return {
      ...state,
      brandError: action.error,
      brandErrorStatus: true,
    };
  }),

  on(EligibilityActions.fetchBrandInfoInit, (state, action) => {
    return {
      ...state,
      mobileNo: action.mobileNo,
      accountInfoInit: true,
      accountInfoStatus: 'init',
    };
  }),

  on(EligibilityActions.fetchAccountInfoInit, (state, action) => {
    return {
      ...state,
      accountInfoRetryCount: state.accountInfoRetryCount + 1,
      customerType: action.customerType,
    };
  }),

  on(EligibilityActions.fetchAccountSuccess, (state, action) => {
    return {
      ...state,
      accountInfo: action.data,
      accountErrorStatus: false,
      accountCheckStatus: true,
    };
  }),

  on(EligibilityActions.fetchCustomerSuccess, (state, action) => {
    return {
      ...state,
      customerInfo: action.data,
      customerErrorStatus: false,
      customerCheckStatus: true,
    };
  }),

  on(EligibilityActions.fetchAccountCustomerSuccess, (state, action) => {
    return {
      ...state,
      accountInfoStatus: 'success',
      accountInfoTime: new Date(),
      loaderPercent: 0 + (state.customerType == 'ADA' ? 25 : 33.33),
    };
  }),

  on(EligibilityActions.fetchAccountFail, (state, action) => {
    return {
      ...state,
      accountInfoStatus: 'fail',
      accountInfoTime: new Date(),
      accountError: action.error,
      accountErrorStatus: true,
    };
  }),

  on(EligibilityActions.fetchCustomerFail, (state, action) => {
    return {
      ...state,
      accountInfoStatus: 'fail',
      accountInfoTime: new Date(),
      accountError: action.error,
      customerErrorStatus: true,
    };
  }),

  on(EligibilityActions.checkDuplicateOrdersInit, (state, action) => {
    return {
      ...state,
      duplicateInit: true,
      duplicateStatus: 'init',
      duplicateRetryCount: state.duplicateRetryCount + 1,
    };
  }),

  on(EligibilityActions.sufficient, (state, action) => {
    return {
      ...state,
      sufficiencyInfo: action.data,
      sufficiencyErrorStatus: false,
      sufficiencyCheckStatus: true,
    };
  }),

  on(EligibilityActions.notSufficient, (state, action) => {
    return {
      ...state,
      sufficiencyInfo: action.data,
      sufficiencyErrorStatus: false,
      sufficiencyCheckStatus: false,
    };
  }),

  on(EligibilityActions.noDuplicateFoundFTA, (state, action) => {
    return {
      ...state,
      duplicateStatus: 'success',
      duplicateTime: new Date(),
      loaderPercent:
        state.loaderPercent + (state.customerType == 'ADA' ? 25 : 33.33),
      duplicateInfo: action.data,
      duplicateErrorStatus: false,
      duplicateCheckStatus: true,
    };
  }),

  on(EligibilityActions.noDuplicateFoundADA, (state, action) => {
    return {
      ...state,
      duplicateInfo: action.data,
      duplicateErrorStatus: false,
      duplicateCheckStatus: true,
    };
  }),

  on(EligibilityActions.noDuplicateAndSufficient, (state, action) => {
    return {
      ...state,
      duplicateStatus: 'success',
      duplicateTime: new Date(),
      loaderPercent:
        state.loaderPercent + (state.customerType == 'ADA' ? 25 : 33.33),
    };
  }),

  on(EligibilityActions.duplicateFound, (state, action) => {
    return {
      ...state,
      duplicateTime: new Date(),
      loaderPercent:
        state.loaderPercent + (state.customerType == 'ADA' ? 25 : 33.33),
      prevOrderStatus: action.prevOrderStatus,
      prevOrderDetails: action.prevOrderData ? action.prevOrderData : undefined,
      duplicateErrorStatus: false,
      duplicateCheckStatus: false,
    };
  }),

  on(EligibilityActions.duplicateFetchFail, (state, action) => {
    return {
      ...state,
      duplicateStatus: 'fail',
      duplicateTime: new Date(),
      duplicateError: action.error,
      duplicateErrorStatus: true,
    };
  }),

  on(EligibilityActions.checkSufficiencyFail, (state, action) => {
    return {
      ...state,
      duplicateStatus: 'fail',
      duplicateTime: new Date(),
      sufficiencyError: action.error,
      sufficiencyErrorStatus: true,
    };
  }),

  on(EligibilityActions.checkOBInit, (state, action) => {
    return {
      ...state,
      eligibilityInit: true,
      eligibilityStatus: 'init',
      eligibilityRetryCount: state.eligibilityRetryCount + 1,
    };
  }),

  on(EligibilityActions.checkOBPositive, (state, action) => {
    // console.log('OB Success ', action);
    // console.log('Action in eligiblity service', action);
    return {
      ...state,
      eligibilityStatus: 'success',
      eligibilityTime: new Date(),
      loaderPercent:
        state.loaderPercent + (state.customerType == 'ADA' ? 25 : 33.33),
      eligibilityInfo: action.eligibilityInfo,
      eligibilityErrorStatus: false,
      eligibilityCheckStatus: true,
    };
  }),

  on(EligibilityActions.checkOBNegative, (state, action) => {
    // console.log('OB Success ', action);
    // console.log('Action in eligiblity service', action);
    return {
      ...state,
      eligibilityStatus: 'success',
      eligibilityTime: new Date(),
      loaderPercent:
        state.loaderPercent + (state.customerType == 'ADA' ? 25 : 33.33),
      eligibilityInfo: action.eligibilityInfo,
      eligibilityErrorStatus: false,
      eligibilityCheckStatus: false,
    };
  }),

  on(EligibilityActions.checkOBFail, (state, action) => {
    return {
      ...state,
      eligibilityStatus: 'fail',
      eligibilityTime: new Date(),
      eligibilityErrorStatus: true,
    };
  }),

  on(EligibilityActions.checkAlertsInit, (state, action) => {
    return {
      ...state,
      alertsInit: true,
      alertsStatus: 'init',
      alertsRetryCount: state.alertsRetryCount + 1,
      balanceCheckList: action.balanceList ? action.balanceList : undefined,
    };
  }),

  on(EligibilityActions.checkAlertsSuccess, (state, action) => {
    return {
      ...state,
      alertsStatus: 'success',
      alertsTime: new Date(),
      loaderPercent:
        state.loaderPercent + (state.customerType == 'ADA' ? 25 : 33.34),
      allEligibilityCheckStatus: true,
    };
  }),

  on(EligibilityActions.checkAlertsFail, (state, action) => {
    return {
      ...state,
      alertsStatus: 'fail',
      alertsTime: new Date(),
    };
  }),

  on(EligibilityActions.balanceCheckList, (state, action) => {
    return {
      ...state,
    };
  }),

  on(EligibilityActions.ftaInAda, (state, action) => {
    return {
      ...state,
      ftaInAda: true,
      brandErrorStatus: false,
      brandCheckStatus: false,
    };
  }),

  on(EligibilityActions.ftaInAdaBtn, (state, action) => {
    return initialEligibilityState;
  }),

  on(OtpActions.fetchOrderRecoverySuccess, (state, action) => {
    return {
      ...action.state.eligibility,
      duplicateErrorStatus:
        action.state.eligibility.duplicateErrorStatus === true
          ? undefined
          : action.state.eligibility.duplicateErrorStatus,
      sufficiencyErrorStatus:
        action.state.eligibility.sufficiencyErrorStatus === true
          ? undefined
          : action.state.eligibility.sufficiencyErrorStatus,
      eligibilityErrorStatus:
        action.state.eligibility.eligibilityErrorStatus === true
          ? undefined
          : action.state.eligibility.eligibilityErrorStatus,

      eligibilityInit:
        action.state.eligibility.eligibilityErrorStatus === true
          ? undefined
          : action.state.eligibility.eligibilityInit,
      eligibilityStatus:
        action.state.eligibility.eligibilityErrorStatus === true
          ? 'uninit'
          : action.state.eligibility.eligibilityStatus,
      eligibilityRetryCount: 0,
      eligibilityTime:
        action.state.eligibility.eligibilityErrorStatus === true
          ? undefined
          : action.state.eligibility.eligibilityTime,

      duplicateInit:
        action.state.eligibility.duplicateErrorStatus === true ||
        action.state.eligibility.sufficiencyErrorStatus === true
          ? undefined
          : action.state.eligibility.duplicateInit,
      duplicateStatus:
        action.state.eligibility.duplicateErrorStatus === true ||
        action.state.eligibility.sufficiencyErrorStatus === true
          ? 'uninit'
          : action.state.eligibility.duplicateStatus,
      duplicateRetryCount: 0,
      duplicateTime:
        action.state.eligibility.duplicateErrorStatus === true ||
        action.state.eligibility.sufficiencyErrorStatus === true
          ? undefined
          : action.state.eligibility.duplicateTime,
    };
  })
);
