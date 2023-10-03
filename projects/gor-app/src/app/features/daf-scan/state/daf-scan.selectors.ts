import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DAFScanState } from './daf-scan.model';

export const selectDAFScanState =
  createFeatureSelector<DAFScanState>('dafScan');

export const checkIdInitSelector = createSelector(
  selectDAFScanState,
  (state: DAFScanState) =>
    state.idCheckInitStatus ? state.idCheckInitStatus : false
);

export const nationalitySelector = createSelector(
  selectDAFScanState,
  (state: DAFScanState) => (state.nationalityList ? state.nationalityList : [])
);

export const idTypeSelector = createSelector(
  selectDAFScanState,
  (state: DAFScanState) => (state.idList ? state.idList : [])
);

export const idCheckRetrySelector = createSelector(
  selectDAFScanState,
  (state: DAFScanState) =>
    state.idCheckInitRetryCount ? state.idCheckInitRetryCount : 0
);

export const selectedIdNoSelector = createSelector(
  selectDAFScanState,
  (state: DAFScanState) => (state.selectedId ? state.selectedId : undefined)
);

export const selectedIdNameSelector = createSelector(
  selectDAFScanState,
  (state: DAFScanState) =>
    state.selectedIdName ? state.selectedIdName : undefined
);

export const selectedNationSelector = createSelector(
  selectDAFScanState,
  (state: DAFScanState) =>
    state.selectedNationality ? state.selectedNationality : undefined
);

export const dafScanStatusSelect = createSelector(
  selectDAFScanState,
  (state: DAFScanState) =>
    state.selectedNationality &&
    state.selectedId &&
    state.selectedIdName &&
    state.transactionId &&
    state.clientCfg &&
    state.idCheckInitSuccess === true
      ? true
      : false
);

export const orderPoidSelect = createSelector(
  selectDAFScanState,
  (state: DAFScanState) => {
    const idName = state.selectedIdName ? state.selectedIdName : '1234567';
    const idNo = state.selectedId ? state.selectedId : '1';

    return {
      poid: {
        idType: idName,
        idNumber: idNo,
      },
    };
  }
);

export const orderTransacIdSelect = createSelector(
  selectDAFScanState,
  (state: DAFScanState) => {
    const idNo = state.transactionId ? state.transactionId : '';

    return {
      transactionId: idNo,
    };
  }
);
