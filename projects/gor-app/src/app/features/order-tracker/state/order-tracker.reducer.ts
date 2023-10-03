import { createReducer, on } from '@ngrx/store';
import { OrderTrackerState } from './order-tracker.model';
import { OrderTrackerActions } from './order-tracker.actionTypes';

export const initialOrderTrackerState: OrderTrackerState = {
  order: undefined,
  token: undefined,
  queryParams: undefined,
  retryCount: 0
};

export const orderTrackerReducer = createReducer(
  initialOrderTrackerState,

  on(OrderTrackerActions.setQueryParams, (state, action) => {
    return {
      ...state,
      queryParams: action.queryParams,
    };
  }),

  on(OrderTrackerActions.tokenFetchInit, (state) => {
    return {
      ...state,
    };
  }),

  on(OrderTrackerActions.tokenFetchSuccess, (state, action) => {
    return {
      ...state,
      token: action.tokenData,
    };
  }),

  on(OrderTrackerActions.tokenFetchFail, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(OrderTrackerActions.orderFetchInit, (state: any) => {
    return {
      ...state,
    };
  }),

  on(OrderTrackerActions.orderFetchSuccess, (state, action) => {
    return {
      ...state,
      order: action.orderData
    };
  }),

  on(OrderTrackerActions.orderFetchFail, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  on(OrderTrackerActions.updateRetryCount, (state, action) => {
    return {
      ...state,
      retryCount: action.retryCount,
    };
  }),
)