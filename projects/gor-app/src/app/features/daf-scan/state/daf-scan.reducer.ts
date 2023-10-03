import { state } from '@angular/animations';
import { act } from '@ngrx/effects';
import { createReducer, on } from '@ngrx/store';
import { OtpActions } from '../../otp/state/otp.actionTypes';
import { DAFScanActions } from './daf-scan.actionTypes';
import { DAFScanState } from './daf-scan.model';

export const initialDAFScanState: DAFScanState = {
  idNumber: undefined,
  idType: undefined,
  transactionId: undefined,
  clientCfg: undefined,
  idCheckInitStatus: undefined,
  idCheckInitRetryCount: 0,
  idCheckInitSuccess: undefined,
  idCheckInitFail: undefined,
  idCheckResultStatus: undefined,
  idCheckResultRetryCount: 0,
  idCheckResultSuccess: undefined,
  idCheckResultFail: undefined,
};

export const dafScanReducer = createReducer(
  initialDAFScanState,

  on(DAFScanActions.IdCheckInit, (state, action: any) => {
    return {
      ...state,
      idCheckInitStatus: true,
      idNumber: action.idNumber,
      idType: action.idType,
    };
  }),

  on(DAFScanActions.IdCheckInitSuccess, (state, action) => {
    return {
      ...state,
      transactionId: action.transactionId,
      clientCfg: action.clientCfg,
      idCheckInitSuccess: true,
      idCheckInitRetryCount: state.idCheckInitRetryCount + 1,
    };
  }),

  on(DAFScanActions.IdCheckInitFail, (state, action) => {
    return {
      ...state,
      idCheckInitFail: true,
    };
  }),

  on(DAFScanActions.nationalityFetchInit, (state, action: any) => {
    return {
      ...state,
      idCheckInitStatus: true,
    };
  }),

  on(DAFScanActions.nationalityFetchSuccess, (state, action) => {
    return {
      ...state,
      idCheckInitStatus: false,
      nationalityList: action.countries,
    };
  }),

  on(DAFScanActions.nationalityFetchFail, (state, action) => {
    return {
      ...state,
      idCheckInitStatus: false,
      nationalityList: action.countries,
    };
  }),

  on(DAFScanActions.updateSelection, (state, action) => {
    return {
      ...state,
      selectedNationality: action.country,
      selectedId: action.id,
      selectedIdName: action.name,
    };
  }),

  on(DAFScanActions.idFetchInit, (state, action) => {
    return {
      ...state,
      idCheckInitStatus: true,
    };
  }),

  on(DAFScanActions.idFetchSuccess, (state, action) => {
    console.log(action.idList);
    return {
      ...state,
      idCheckInitStatus: false,
      idList: action.idList,
    };
  }),

  on(DAFScanActions.idFetchFail, (state, action) => {
    return {
      ...state,
      idCheckInitStatus: false,
      idList: action.idList,
    };
  }),

  on(OtpActions.fetchOrderRecoverySuccess, (state, action) => {
    return {
      ...action.state.dafScan,
      idCheckInitRetryCount: 0,
    };
  })
);
