import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';

export const fetchEligibilityDetails = createAction(
  '[Daf Review Page] Fetch Eligibility Details',
  props<{ details: any }>()
);

export const payMode = createAction(
  '[Daf Review Page] Pay Mode Select',
  props<{ mode: string | undefined }>()
);

export const getSim = createAction('[Daf Review Page] Get SIM');

export const checkTnC = createAction(
  '[Daf Review Page] Enable Submit Button',
  props<{
    isTncChecked?: any;
    check0?: any;
    check1?: any;
    checkAll?: any;
  }>()
);

export const initXendit = createAction(
  '[Daf Review Page] Init Xendit Pay',
  props<{ cardNo: string; validity: string; cvn: string }>()
);

export const callBackSuccessXendit = createAction(
  '[Daf Review Page] CallBack Xendit',
  props<{ token: any }>()
);

export const failXendit = createAction('[Daf Review Page] Fail Xendit');

export const authModalOpen = createAction(
  '[Daf Review Page] Auth Modal Open',
  props<{ token: string; url: string }>()
);
