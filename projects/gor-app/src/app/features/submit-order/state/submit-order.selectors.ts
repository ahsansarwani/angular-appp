import { createFeatureSelector, createSelector } from '@ngrx/store';
import { allRoutes } from '../../../globals/redirection-links';
import { OrderState } from './submit-order.model';

export const selectOrderState = createFeatureSelector<OrderState>('order');

export const orderIdSelector = createSelector(selectOrderState, state =>
  state.orderId ? state.orderId : ''
);

export const orderStatusSelect = createSelector(selectOrderState, state =>
  state.orderStatus === true ? true : false
);

export const orderStatusSelect2 = createSelector(
  selectOrderState,
  state => state.orderStatus
);

export const leadStatusSelect2 = createSelector(
  selectOrderState,
  state => state.leadStatus
);

export const leadStatusSelect = createSelector(selectOrderState, state =>
  state.leadStatus === true ? true : false
);

export const payTokenSelector = createSelector(selectOrderState, state =>
  state.paymentTokenId ? state.paymentTokenId : undefined
);

export const payRetryCountSelect = createSelector(
  selectOrderState,
  state => state.payRetryCount
);

export const paymentStatusSelect = createSelector(selectOrderState, state =>
  state.paymentStatus === true ? true : false
);

export const paymentStatusSelect2 = createSelector(
  selectOrderState,
  state => state.paymentStatus
);

export const paymentMsgSelect = createSelector(
  selectOrderState,
  state => state.payStatusMessage
);

export const payPendingStatusSelect = createSelector(selectOrderState, state =>
  state.paymentPendingStatus === true ? true : false
);

export const retryModalStatus = createSelector(selectOrderState, state =>
  state.retryModal == true ? true : false
);

export const thankYouPathSelect = createSelector(selectOrderState, state =>
  state.orderStatus == true
    ? allRoutes.orderSuccess
    : state.paymentPendingStatus == true
    ? allRoutes.orderPaymentPending
    : state.leadStatus == true
    ? allRoutes.orderOffline
    : undefined
);

export const paySessionStatus = createSelector(selectOrderState, state =>
  state.paymentSessionStatus === false ? false : undefined
);

export const getPayStatus = createSelector(selectOrderState, state =>
  state.paymentStatusFail === false ? false : undefined
);

export const retryCountSelect = createSelector(
  selectOrderState,
  state => state.getPaymentCount
);

export const orderPayInfoSelect = createSelector(selectOrderState, state => {
  if (state.paymentTokenId && state.payStatusMessage) {
    return {
      payment: {
        tokenId: state.paymentTokenId,
        status: state.payStatusMessage,
      },
    };
  } else {
    return undefined;
  }
});
