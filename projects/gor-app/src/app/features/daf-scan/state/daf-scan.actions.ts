import { createAction, props } from '@ngrx/store';
import { ErrorResponse } from '../../../app-state/app.model';
import { Countries, IDs } from './daf-scan.model';

export const IdCheckInit = createAction(
  '[DAF Scan Page] Init Id Check',
  props<{ docType: string }>()
);

export const IdCheckInitSuccess = createAction(
  '[DAF Scan Page] Init Id Check Init Success',
  props<{ transactionId: string; clientCfg: string }>()
);

export const IdCheckInitFail = createAction(
  '[DAF Scan Page] Init Id Check Init Fail',
  props<{ error: any }>()
);

export const nationalityFetchInit = createAction(
  '[DAF Scan Page] Nationality Fetch Init'
);

export const nationalityFetchSuccess = createAction(
  '[DAF Scan Page] Nationality Fetch Success',
  props<{ countries: Countries[] }>()
);

export const nationalityFetchFail = createAction(
  '[DAF Scan Page] Nationality Fetch Fail',
  props<{ countries: Countries[] }>()
);

export const idFetchInit = createAction(
  '[DAF Scan Page] ID Fetch Init',
  props<{ code: string; name: string }>()
);

export const idFetchSuccess = createAction(
  '[DAF Scan Page] ID Fetch Success',
  props<{ idList: IDs[] }>()
);

export const idFetchFail = createAction(
  '[DAF Scan Page] ID Fetch Fail',
  props<{ idList: IDs[] }>()
);

export const updateSelection = createAction(
  '[DAF Scan Page] Update Nationality ID Selection',
  props<{ country: string; id: string; name: string }>()
);
