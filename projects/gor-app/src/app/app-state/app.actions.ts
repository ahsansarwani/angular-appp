import { createAction, props } from '@ngrx/store';
import { AppState } from './app.model';

export const navigate = createAction(
  '[App] Navigate',
  props<{ from: string }>()
);

export const initApp = createAction('[App] Init App');

export const initChatToken = createAction('[App] Init Chat Token');

export const tokenSuccess = createAction(
  '[App] Token Success',
  props<{ token: string; fName: string; lName: string }>()
);

export const tokenFail = createAction(
  '[App] Token Fail',
  props<{ error: any }>()
);

export const setErrorState = createAction(
  '[App] Set Error State',
  props<{ scenario: any }>()
);

export const initChatSuccess = createAction('[App] Init Chat Success');

export const initChatFail = createAction('[App] Init Chat Fail');
