import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecoveryState, RedirectState } from './redirect.model';
import { AppState } from '../../../app-state/app.model';

export const selectFeature = (state: AppState) => state.redirect;

export const selectRedirectState =
  createFeatureSelector<RedirectState>('redirect');

export const recoveryState = createFeatureSelector<RecoveryState>('recovery');

export const recoverySelect = createSelector(recoveryState, state =>
  state.status == true ? true : false
);

export const idNumberSelector = createSelector(selectRedirectState, state => {
  if (state.ID_NUMBER) {
    return state.ID_NUMBER;
  } else {
    return undefined;
  }
});

export const firstNameSelector = createSelector(
  selectRedirectState,
  state => state.FIRST_NAME
);

export const lastNameSelector = createSelector(
  selectRedirectState,
  state => state.LAST_NAME
);

export const middleNameSelector = createSelector(selectRedirectState, state =>
  state.MIDDLE_NAME ? state.MIDDLE_NAME : undefined
);

export const dobSelector = createSelector(
  selectRedirectState,
  state => state.DATE_OF_BIRTH
);

export const sexSelector = createSelector(
  selectRedirectState,
  state => state.SEX
);

export const genderSelector = createSelector(
  selectRedirectState,
  state => state.GENDER
);

export const idCheckResultSelect = createSelector(selectRedirectState, state =>
  state.ekycResult ? (state.ekycResult === 'Success' ? true : false) : false
);

export const recoveryDetailsCheck = createSelector(
  selectRedirectState,
  state => {
    return {
      firstName: state.FIRST_NAME ? state.FIRST_NAME.toUpperCase() : undefined,
      middleName: state.MIDDLE_NAME
        ? state.MIDDLE_NAME.toUpperCase()
        : undefined,
      lastName: state.LAST_NAME ? state.LAST_NAME.toUpperCase() : undefined,
      birthday: state.DATE_OF_BIRTH ? state.DATE_OF_BIRTH : undefined,
      gender: state.GENDER ? state.GENDER.toUpperCase() : undefined,
    };
  }
);

export const recoveryidMatched = createSelector(recoveryState, state => {
  return state.recoveryIdCheck;
});

// export const addressSelector = createSelector(
//   selectRedirectState,
//   state => state.ADDRESS
// );
export const orderResultSelector = createSelector(
  selectRedirectState,
  state => {
    // if (state.ekycResult === '')
    const result = state.ekycResult
      ? state.ekycResult.toString().toLowerCase() == 'success'
        ? true
        : false
      : false;

    return {
      verified: result,
      result: state.ekycResult ? state.ekycResult : 'Not found',
      verifyTime: state.verifyTime ? state.verifyTime : new Date(),
    };
  }
);
