import { createAction, props } from '@ngrx/store';
import { BalanceCheckList } from './eligibility.model';

export const fetchBrandInfoInit = createAction(
  '[Eligibility Page] Fetch Account Brand Init',
  props<{ mobileNo: string; customerType: string }>()
);

export const fetchBrandSuccess = createAction(
  '[Eligibility Page] Fetch Account Brand Success',
  props<{ data?: any; mobileNo: string; customerType: string }>()
);

export const fetchBrandFail = createAction(
  '[Eligibility Page] Fetch Account Brand Fail',
  props<{ error: any }>()
);

export const fetchAccountInfoInit = createAction(
  '[Eligibility Page] Fetch Account Info Init',
  props<{ mobileNo: string; customerType: string }>()
);

export const fetchAccountSuccess = createAction(
  '[Eligibility Page] Fetch Account Success',
  props<{ data: any; mobileNo: string; customerType: string }>()
);

export const fetchAccountFail = createAction(
  '[Eligibility Page] Fetch Account Fail',
  props<{ error: any }>()
);

export const fetchCustomerSuccess = createAction(
  '[Eligibility Page] Fetch Customer Success',
  props<{ data: any; mobileNo: string; customerType: string }>()
);

export const fetchAccountCustomerSuccess = createAction(
  '[Eligibility Page] Fetch Account&Customer Success',
  props<{ mobileNo: string; customerType: string }>()
);

export const fetchCustomerFail = createAction(
  '[Eligibility Page] Fetch Customer Fail',
  props<{ error: any }>()
);

export const checkDuplicateOrdersInit = createAction(
  '[Eligibility Page] Check Duplicate Orders Init',
  props<{ data?: any; mobileNo: string; customerType: string }>()
);

export const checkSufficiencyInit = createAction(
  '[Eligibility Page] Check Sufficiency Init',
  props<{ payload: any }>()
);

export const sufficient = createAction(
  '[Eligibility Page] Check Sufficiency positive',
  props<{ data: any }>()
);

export const notSufficient = createAction(
  '[Eligibility Page] Check Sufficiency negative',
  props<{ data: any }>()
);

export const checkSufficiencyFail = createAction(
  '[Eligibility Page] Check Sufficiency Fail',
  props<{ error: any }>()
);

export const noDuplicateFoundFTA = createAction(
  '[Eligibility Page] No Duplicate Found FTA',
  props<{ data?: any; mobileNo: string; customerType: string }>()
);

export const noDuplicateFoundADA = createAction(
  '[Eligibility Page] No Duplicate Found ADA',
  props<{ data: any; mobileNo: string; customerType: string }>()
);

export const noDuplicateAndSufficient = createAction(
  '[Eligibility Page] No Duplicate & Sufficient',
  props<{ mobileNo: string; customerType: string }>()
);

export const duplicateFound = createAction(
  '[Eligibility Page] Duplicate Found',
  props<{ prevOrderStatus: boolean; prevOrderData?: any }>()
);

export const duplicateFetchFail = createAction(
  '[Eligibility Page] Duplicate Fetch Fail',
  props<{ error: any }>()
);

export const checkOBInit = createAction(
  '[Eligibility Page] Check OB Init',
  props<{ mobileNo: string; customerType: string }>()
);

export const checkOBPositive = createAction(
  '[Eligibility Page] Check OB Positive',
  props<{ eligibilityInfo: any }>()
);

export const checkOBNegative = createAction(
  '[Eligibility Page] Check OB Negative',
  props<{ eligibilityInfo: any }>()
);

export const checkOBFail = createAction(
  '[Eligibility Page] Check OB Fail',
  props<{ error: any }>()
);

export const checkAlertsInit = createAction(
  '[Eligibility Page] Check Alerts Init',
  props<{ mobileNo: string; customerType: string; balanceList?: any }>()
);

export const checkAlertsSuccess = createAction(
  '[Eligibility Page] Check Alerts Success'
);

export const startChecks = createAction(
  '[Eligibility Page] Start Eligibility Checks',
  props<{ mobileNo: string; customerType: string }>()
);

export const checkAlertsFail = createAction(
  '[Eligibility Page] Check Alerts Fail'
);
export const balanceCheckList = createAction(
  '[Eligibility Page] Check Balance List'
);

export const ftaInAda = createAction('[Eligibility Page] FTA in ADA');

export const ftaInAdaBtn = createAction(
  '[Eligibility Page] FTA in ADA Button',
  props<{ choice: string }>()
);
