import { act } from '@ngrx/effects';
import { createReducer, on } from '@ngrx/store';
import { OtpActions } from '../../otp/state/otp.actionTypes';
import { activeButton } from '../../otp/state/otp.selectors';
import { OrderActions } from '../../submit-order/state/submit-order.actionTypes';
import { authModalOpen } from './daf-review.actions';
import { DafReviewActions } from './daf-review.actionTypes';
import { DafReviewState } from './daf-review.model';

export const initialDafReviewState: DafReviewState = {
  overdueBalanceList: [],
  historicBalanceList: [],
  customerType: undefined,
  buttonText: 'Get your SIM now',
  isPaymentModeVisible: undefined,
  historicBalanceTitle: undefined,
  overdueBalanceTitle: undefined,
  planInfo: undefined,
  isTncChecked: false,
  authUrl: '',
  authModal: 'close',
};
export const dafReviewReducer = createReducer(
  initialDafReviewState,
  on(DafReviewActions.fetchEligibilityDetails, (state, action) => {
    console.log('In action,', action);
    return {
      ...state,
      customerType: action.details.customerType,
      overdueBalanceList: action.details.overdueBalanceList,
      historicBalanceList: action.details.historicBalanceList,
      isPaymentModeVisible: action.details.isPaymentModeVisible,
      buttonText: action.details.buttonText,
      payTodayTotal: action.details.payTodayTotal,
      hbTotal: action.details.hbTotal,
      obTotal: action.details.obTotal,
      planInfo: action.details.planInfo,
    };
  }),
  on(DafReviewActions.getSim, (state, action) => {
    // console.log('Inside second reducer', action);
    return {
      ...state,
      acceptedTCDate: new Date(),
      reviewSubmit: true,
    };
  }),
  on(DafReviewActions.checkTnC, (state, action) => {
    // console.log('Inside checktnc reducer', action);
    return {
      ...state,
      isTncChecked: action.isTncChecked == true ? action.isTncChecked : false,
      tncCheck: {
        check0: action.check0 == true ? true : false,
        check1: action.check1 == true ? true : false,
        checkAll: action.checkAll == true ? true : false,
      },
    };
  }),
  on(DafReviewActions.payMode, (state, action) => {
    // console.log('Inside action', action.mode);
    return {
      ...state,
      payMode: action.mode,
    };
  }),
  on(DafReviewActions.initXendit, (state, action) => {
    return {
      ...state,
      xenditInitStatus: true,
    };
  }),

  on(DafReviewActions.failXendit, (state, action) => {
    return {
      ...state,
      xenditInitStatus: false,
      authModal: 'close',
    };
  }),

  on(DafReviewActions.callBackSuccessXendit, (state, action) => {
    if (state.authUrl) {
      return {
        ...state,
        reviewSubmit: true,
        authSuccess: state.authModal == 'open' ? true : false,
        authModal: 'close',
        authUrl: '',
      };
    } else {
      return {
        ...state,
        reviewSubmit: true,
        authModal: 'close',
        xenditInitStatus: false,
        xenditToken: action.token,
      };
    }
  }),
  on(DafReviewActions.authModalOpen, (state, action) => {
    return {
      ...state,
      xenditInitStatus: false,
      xenditToken: action.token,
      authModal: 'open',
      authUrl: action.url,
    };
  }),
  on(OtpActions.fetchOrderRecoverySuccess, (state, action) => {
    return {
      ...action.state.dafReview,
      payMode: undefined,
      acceptedTCDate: undefined,
      reviewSubmit: undefined,
    };
  }),
  on(OrderActions.openRetryOption, (state, action) => {
    return {
      ...state,
      reviewSubmit: undefined,
    };
  })
);
