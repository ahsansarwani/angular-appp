import { createAction, props } from '@ngrx/store';

export const init = createAction(
  '[Otp Page] Init',
  props<{ mobileNo: string }>()
);

export const initSuccess = createAction(
  '[Otp Page] Init Success',
  props<{ referenceId: string }>()
);

export const initFailure = createAction(
  '[Otp Page] Init Failure',
  props<{ error: object }>()
);

export const initCountExceed = createAction('[Otp Page] Init Count Exceed');

export const verifyInit = createAction(
  '[Otp Page] Verify Init',
  props<{ code: string }>()
);

export const verifyRequestSuccessValid = createAction(
  '[Otp Page] Verify Request Valid'
);

export const verifyRequestSuccessInvalid = createAction(
  '[Otp Page] Verify Request Invalid',
  props<{ error: any }>()
);

export const verifyRequestFail = createAction('[Otp Page] Verify Request Fail');

export const verifySuccess = createAction('[Otp Page] Verify Success');

export const verifyFail = createAction('[Otp Page] Verify Fail');

export const verifyCountExceed = createAction('[Otp Page] Verify Count Exceed');

export const resetTimer = createAction('[Otp Page] Reset Timer');

export const goBack = createAction('[Otp Page] Go Back');

export const fetchOrderRecovery = createAction(
  '[Otp Page] Recovery Order',
  props<{ orderId: string }>()
);

export const fetchOrderRecoverySuccess = createAction(
  '[Otp Page] Recovery Order Fetch Success',
  props<{ state: any }>()
);

export const fetchOrderRecoveryFail = createAction(
  '[Otp Page] Recovery Order Fetch Fail'
);
