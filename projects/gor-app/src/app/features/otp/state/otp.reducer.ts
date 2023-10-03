import { createReducer, on } from '@ngrx/store';
import { EligibilityActions } from '../../eligibility/state/eligibility.actionTypes';
import { OtpActions } from './otp.actionTypes';

export interface OtpState {
  mobileNo?: string;
  initiated?: boolean;
  isLoading: boolean;
  initStatus?: boolean;
  initCount: number;
  initTime?: Date;
  expiryStatus?: boolean;
  verifyInitiated?: boolean;
  verifyStatus?: boolean;
  verifyFailCount: number;
  verifyTime?: Date;
  referenceId?: string;
  errorMsg?: string;
  errorBlock?: any;
  verifySuccess?: boolean;
  timerStatus?: boolean;
}

export const initialOtpState: OtpState = {
  isLoading: false,
  initCount: 0,
  verifyFailCount: 0,
};

export const otpReducer = createReducer(
  initialOtpState,

  on(OtpActions.init, (state, action) => {
    return {
      ...state,
      mobileNo: action.mobileNo,
      initiated: true,
      isLoading: true,
      verifyStatus: false,
    };
  }),

  on(EligibilityActions.ftaInAdaBtn, (state, action) => {
    return initialOtpState;
  }),

  on(OtpActions.initSuccess, (state, action) => {
    return {
      ...state,
      referenceId: action.referenceId,
      initStatus: true,
      isLoading: false,
      timerStatus: true,
      initCount: state.initCount + 1,
      initTime: new Date(),
    };
  }),

  on(OtpActions.initFailure, (state, action) => {
    return {
      ...state,
      errorBlock: action.error,
      initStatus: false,
      isLoading: false,
      initCount: state.initCount + 1,
    };
  }),

  on(OtpActions.verifyInit, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(OtpActions.verifyRequestSuccessValid, (state, action) => {
    return {
      ...state,
      isLoading: false,
      verifyStatus: true,
      verifyTime: new Date(),
    };
  }),

  on(OtpActions.verifyRequestSuccessInvalid, (state, action) => {
    console.log('verify action - ', action);
    return {
      ...state,
      isLoading: false,
      errorMsg: action.error.message,
      verifyStatus: false,
      verifyFailCount: state.verifyFailCount + 1,
    };
  }),

  on(OtpActions.verifyRequestFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
      verifyInitiated: false,
    };
  }),

  on(OtpActions.fetchOrderRecovery, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(OtpActions.fetchOrderRecoverySuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
    };
  }),

  on(OtpActions.fetchOrderRecoveryFail, (state, action) => {
    return {
      ...state,
      isLoading: false,
    };
  }),

  on(OtpActions.resetTimer, (state, action) => {
    return {
      ...state,
      timerStatus: false,
    };
  }),

  on(OtpActions.goBack, (state, action) => {
    return initialOtpState;
  })
);
