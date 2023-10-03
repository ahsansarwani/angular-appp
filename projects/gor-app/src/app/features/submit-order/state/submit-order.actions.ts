import { createAction, props } from '@ngrx/store';

export const submitOrderInit = createAction(
  '[SubmitOrder Page] Submit Order Init',
  props<{ paypending: boolean }>()
);

export const submitOrderSuccess = createAction(
  '[SubmitOrder Page] Submit Order Success',
  props<{ orderId: string }>()
);

export const submitPendingOrderSuccess = createAction(
  '[SubmitOrder Page] Submit Order Success (Pending Pay)',
  props<{ orderId: string }>()
);

export const submitOrderFail = createAction(
  '[SubmitOrder Page] Submit Order Fail',
  props<{ error: any }>()
);

export const submitLeadInit = createAction(
  '[SubmitOrder Page] Submit Lead Init'
);

export const submitLeadSuccess = createAction(
  '[SubmitOrder Page] Submit Lead Success',
  props<{ orderId: string }>()
);

export const submitLeadFail = createAction(
  '[SubmitOrder Page] Submit Order Fail',
  props<{ error: any }>()
);

export const paymentInit = createAction('[SubmitOrder Page] Payment Init');

export const closeRetryModal = createAction(
  '[SubmitOrder Page] Close Retry Modal'
);

export const retryPayment = createAction('[SubmitOrder Page] Payment Retry');

export const openRetryOption = createAction(
  '[SubmitOrder Page] Open Retry Option',
  props<{ message: string }>()
);

export const paymentSessionSuccessGcash = createAction(
  '[SubmitOrder Page] Payment Session Success Gcash',
  props<{ data: any }>()
);

export const paymentSessionSuccessXendit = createAction(
  '[SubmitOrder Page] Payment Session Success Xendit',
  props<{ data: any }>()
);

export const paymentSessionFail = createAction(
  '[SubmitOrder Page] Payment Session Fail'
);

export const getPaymentStatusGcash = createAction(
  '[SubmitOrder Page] Payment Status Success Gcash 1',
  props<{ paymentTokenId: string }>()
);

export const getPaymentStatusSuccessXendit = createAction(
  '[SubmitOrder Page] Payment Status Success Xendit',
  props<{ message: string }>()
);

export const retryPaymentStatusSuccessXendit = createAction(
  '[SubmitOrder Page] Retry Payment Status Success Xendit',
  props<{ data: any }>()
);

export const getPaymentStatusSuccessGcash = createAction(
  '[SubmitOrder Page] Payment Status Success Gcash 2',
  props<{ message: string }>()
);

export const getPaymentStatusFail = createAction(
  '[SubmitOrder Page] Payment Status Fail'
);

export const getPaymentStatusPending = createAction(
  '[SubmitOrder Page] Payment Status Pending',
  props<{ message: string }>()
);
