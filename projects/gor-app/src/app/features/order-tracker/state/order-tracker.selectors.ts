import { createFeatureSelector, createSelector } from '@ngrx/store';
import { OrderTrackerState } from './order-tracker.model';

export const selectOrderTrackerState =
  createFeatureSelector<OrderTrackerState>('orderTracker');

export const queryParamsSelector = createSelector(
  selectOrderTrackerState,
  (state: OrderTrackerState) => (state.queryParams ? state.queryParams : undefined)
);

export const orderTokenSelector = createSelector(
  selectOrderTrackerState,
  (state: OrderTrackerState) => (state.token ? state.token : undefined)
);

export const orderSelector = createSelector(
  selectOrderTrackerState,
  (state: OrderTrackerState) => (state.order ? state.order : undefined)
);

export const retryCountSelector = createSelector(
  selectOrderTrackerState,
  (state: OrderTrackerState) => (state.retryCount)
);
