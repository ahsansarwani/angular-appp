import { createReducer, on } from '@ngrx/store';
import { OtpActions } from '../../otp/state/otp.actionTypes';
import { RedirectActions } from './redirect.actionTypes';
import { RecoveryState, RedirectState } from './redirect.model';

export const initialRedirectState: RedirectState = {
  ekycResult: undefined,
  FIRST_NAME: undefined,
  LAST_NAME: undefined,
  DATE_OF_BIRTH: undefined,
  ID_NUMBER: undefined,
};

export const initialRecoveryState: RecoveryState = {};

export const recoveryReducer = createReducer(
  initialRecoveryState,
  on(RedirectActions.initRecovery, (state, action) => {
    return {
      ...state,
      status: true,
    };
  }),
  on(RedirectActions.recoveryIdCheck, (state, action) => {
    return {
      ...state,
      recoveryIdCheck: action.status,
    };
  })
);

export const redirectReducer = createReducer(
  initialRedirectState,
  on(
    RedirectActions.successCheckResultSuccess,
    RedirectActions.successCheckResultFail,
    RedirectActions.failCheckResultSuccess,
    RedirectActions.failCheckResultSuccess,
    RedirectActions.checkResultSuccessRecovery,
    (state, action) => {
      return {
        ...state,
        ...action,
        verifyTime: new Date(),
      };
    }
  ),

  on(OtpActions.fetchOrderRecoverySuccess, (state, action) => {
    return {
      ...action.state.redirect,
    };
  })
);
