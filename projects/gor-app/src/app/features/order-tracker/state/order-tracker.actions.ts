import { createAction, props } from '@ngrx/store';
import { OrderData, OrderToken, QueryParamsState } from './order-tracker.model';

export const setQueryParams = createAction(
  '[Order Tracker Page] Set Query Params',
  props<{ queryParams: QueryParamsState }>()
);

export const tokenFetchInit = createAction(
  '[Order Tracker Page] Order Token Init',
);

export const tokenFetchSuccess = createAction(
  '[Order Tracker Page] Token Fetch Success',
  props<{ tokenData: OrderToken }>()
);

export const tokenFetchFail = createAction(
  '[Order Tracker Page] Token Fetch Fail',
  props<{ error: object }>()
);

export const orderFetchInit = createAction(
  '[Order Tracker Page] Order Fetch Init',
  props<{ token: string, id: string, email: string }>()
);

export const orderFetchSuccess = createAction(
  '[Order Tracker Page] Order Fetch Success',
  props<{ orderData: OrderData }>()
);

export const orderFetchFail = createAction(
  '[Order Tracker Page] Order Fetch Fail',
  props<{ error: object }>()
);

export const updateRetryCount = createAction(
  '[Order Tracker Page] Update Retry Count',
  props<{ retryCount: number }>()
);