import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DafReviewState } from './daf-review.model';

export const selectDafReviewState =
  createFeatureSelector<DafReviewState>('dafReview');

export const customerType = createSelector(
  selectDafReviewState,
  state => state.customerType
);

export const overdueBalanceList = createSelector(
  selectDafReviewState,
  state => state.overdueBalanceList
);

export const historicBalanceList = createSelector(
  selectDafReviewState,
  state => state.historicBalanceList
);

export const isPaymentModeVisible = createSelector(
  selectDafReviewState,
  state => state.isPaymentModeVisible
);

export const buttonText = createSelector(
  selectDafReviewState,
  state => state.buttonText
);

export const isTncChecked = createSelector(
  selectDafReviewState,
  state => state.isTncChecked
);

export const historicBalanceTitle = createSelector(
  selectDafReviewState,
  state => state.historicBalanceTitle
);

export const overdueBalanceTitle = createSelector(
  selectDafReviewState,
  state => state.overdueBalanceTitle
);

export const payTodayTotal = createSelector(selectDafReviewState, state =>
  state.payTodayTotal ? state.payTodayTotal.toString() : '0.00'
);

export const payStatusSelect = createSelector(selectDafReviewState, state =>
  state.payTodayTotal ? state.payTodayTotal : 0
);

export const payModeSelect = createSelector(selectDafReviewState, state =>
  state.payMode ? state.payMode : ''
);

export const payInitSelect = createSelector(selectDafReviewState, state =>
  state.xenditInitStatus == true ? true : false
);

export const hbTotal = createSelector(selectDafReviewState, state =>
  state.hbTotal ? '₱' + state.hbTotal.toString() : undefined
);

export const obTotal = createSelector(selectDafReviewState, state =>
  state.obTotal ? '₱' + state.obTotal.toString() : undefined
);

export const planInfo = createSelector(
  selectDafReviewState,
  state => state.planInfo
);

export const drawerSelect = createSelector(selectDafReviewState, state =>
  state.drawerStatus === true ? true : false
);

export const xenditTokenSelect = createSelector(selectDafReviewState, state =>
  state.xenditToken ? state.xenditToken : undefined
);

export const authUrl = createSelector(selectDafReviewState, state =>
  state.authModal == 'open'
    ? {
        authUrl: state.authUrl,
        authStatus: true,
      }
    : { authStatus: false }
);

export const authModalSelect = createSelector(
  selectDafReviewState,
  state => state.authModal
);

export const authSuccess = createSelector(selectDafReviewState, state =>
  state.authSuccess == true ? true : false
);

export const reviewSubmitSelect = createSelector(selectDafReviewState, state =>
  state.reviewSubmit == true ? true : false
);

export const check0Select = createSelector(
  selectDafReviewState,
  state => state.tncCheck?.check0
);

export const check1Select = createSelector(
  selectDafReviewState,
  state => state.tncCheck?.check1
);

export const checkAllSelect = createSelector(
  selectDafReviewState,
  state => state.tncCheck?.checkAll
);

export const orderTodayAmtSelect = createSelector(
  selectDafReviewState,
  (state: DafReviewState) => {
    const due = state.payTodayTotal ? state.payTodayTotal : 0;
    return {
      // dueAmount: {
      today: due.toString(),
      // },
    };
  }
);

export const orderTcTimeSelect = createSelector(
  selectDafReviewState,
  (state: DafReviewState) => {
    const time = state.acceptedTCDate ? state.acceptedTCDate : new Date();
    return {
      acceptedTCDate: time,
    };
  }
);

export const orderDeliverySelect = createSelector(
  selectDafReviewState,
  (state: DafReviewState) => {
    return {
      deliveryMethod: 'Regular',
    };
  }
);
