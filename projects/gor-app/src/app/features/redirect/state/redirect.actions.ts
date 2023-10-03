import { createAction, props } from '@ngrx/store';
import { CheckResultSuccess, CheckResultFail } from './redirect.model';

export const checkResultSuccessInit = createAction(
  '[Redirect Page] Check Result Init Success',
  props<{ transactionId: string }>()
);

export const checkResultFailInit = createAction(
  '[Redirect Page] Check Result Init Fail',
  props<{ transactionId: string }>()
);

export const initRecovery = createAction(
  '[Redirect Page] Init Recovery flow',
  props<{ orderId: string }>()
);

export const successCheckResultSuccess = createAction(
  '[Redirect Page] Positive Check Result Success',
  props<CheckResultSuccess>()
);

export const checkResultSuccessRecovery = createAction(
  '[Redirect Page] Positive Check Result Success Recovery',
  props<CheckResultSuccess>()
);

export const checkResultFailRecovery = createAction(
  '[Redirect Page] Positive Check Result Fail Recovery',
  props<CheckResultFail>()
);

export const successCheckResultFail = createAction(
  '[Redirect Page] Positive Check Result Fail',
  props<CheckResultFail>()
);

export const failCheckResultSuccess = createAction(
  '[Redirect Page] Negative Check Result Success',
  props<CheckResultSuccess>()
);

export const failCheckResultFail = createAction(
  '[Redirect Page] Negative Check Result Fail',
  props<CheckResultFail>()
);

export const successRecoveryMobile = createAction(
  '[Redirect Page] Success Recovery Mobile fetch',
  props<{ mobileNo: string }>()
);

export const recoveryIdCheck = createAction(
  '[Redirect Page] Recovery ID Check',
  props<{
    status: boolean;
    firstName?: string;
    middleName?: string;
    lastName?: string;
  }>()
);

export const failRecoveryMobile = createAction(
  '[Redirect Page] Fail Recovery Mobile fetch'
);
