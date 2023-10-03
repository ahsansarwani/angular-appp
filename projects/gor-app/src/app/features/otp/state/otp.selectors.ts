import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OtpState } from './otp.reducer';
import { AppState } from '../../../app-state/app.model';
import { otpConfirmInterval } from '../../../globals/config';

export const selectFeature = (state: AppState) => state.otp;

export const selectOtpState = createFeatureSelector<OtpState>('otp');

export const loadingStatus = createSelector(
  selectOtpState,
  state => state.isLoading
);

export const timerStatus = createSelector(
  selectOtpState,
  state => state.timerStatus
);

export const showTimer = createSelector(
  selectOtpState,
  timerStatus,
  (state, timerStatus) => {
    if (state.initStatus !== true) {
      return false;
    } else if (
      state.initStatus == true &&
      state.verifyStatus !== true &&
      timerStatus == false
    ) {
      return false;
    } else if (
      state.initStatus == true &&
      state.initTime &&
      state.verifyStatus !== true &&
      Math.abs(new Date().getTime() - state.initTime.getTime()) / 1000 <
        otpConfirmInterval
    ) {
      return true;
    }
    return false;
  }
);

export const activeButton = createSelector(
  selectOtpState,
  showTimer,
  (state, timer) => {
    // console.log('checkin - 123', state);
    if (state.initStatus == true && timer == true) {
      // console.log('returned init');
      return false;
    } else if (state.verifyStatus == true) {
      // console.log('returned verify');
      return false;
    } else if (state.verifyFailCount > 6) {
      // console.log('returned verify');
      return false;
    } else {
      // console.log('returned def true');
      return true;
    }
  }
);

export const activeInput = createSelector(selectOtpState, state => {
  // console.log('checkin - 123', state);
  if (state.verifyStatus == true) {
    return false;
  } else if (state.initStatus == true) {
    return true;
  } else {
    return false;
  }
});

export const elapsedTime = createSelector(
  selectOtpState,
  state => state.initTime
);

export const sendInitStatus = createSelector(
  // (state : AppState)=> state.otp,
  selectOtpState,
  (otp: OtpState) => {
    return otp.initStatus;
  }
);

export const verifyInitStatus = createSelector(
  // (state : AppState)=> state.otp,
  selectOtpState,
  (otp: OtpState) => {
    return otp.verifyInitiated;
  }
);

export const verifyStatus = createSelector(
  // (state : AppState)=> state.otp,
  selectOtpState,
  (otp: OtpState) => {
    return otp.verifyStatus;
  }
);

export const initCountSelect = createSelector(
  // (state : AppState)=> state.otp,
  selectOtpState,
  (otp: OtpState) => {
    return otp.initCount;
  }
);

export const verifyFailCount = createSelector(
  // (state : AppState)=> state.otp,
  selectOtpState,
  (otp: OtpState) => {
    return otp.verifyFailCount;
  }
);

export const verifySuccessSelect = createSelector(
  // (state : AppState)=> state.otp,
  selectOtpState,
  (otp: OtpState) => {
    return otp.verifySuccess;
  }
);

export const errorMsg = createSelector(
  // (state : AppState)=> state.otp,
  selectOtpState,
  (otp: OtpState) => {
    return otp.errorMsg ? otp.errorMsg : '';
  }
);

export const mobileNoSelect = createSelector(
  selectOtpState,
  state => state.mobileNo
);

export const refIdSelect = createSelector(
  selectOtpState,
  state => state.referenceId
);

export const orderOtpSelect = createSelector(
  selectOtpState,
  (state: OtpState) => {
    const verified = state.verifyStatus
      ? state.verifyStatus === true
        ? true
        : false
      : false;
    const refId = state.referenceId ? state.referenceId : 'Not found';
    const verifyTime = state.verifyTime ? state.verifyTime : '';
    return {
      otp: {
        verified: verified,
        referenceId: refId,
        verifyTime: verifyTime,
      },
    };
  }
);
