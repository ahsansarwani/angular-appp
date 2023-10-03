import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState, ChatState, ErrorState } from './app.model';

// export const selectFeature = (state: AppState) => state;

export const selectAppState = createFeatureSelector<AppState>('app');

export const appSelector = createSelector(selectAppState, state => state);

export const chatStateSelector = createFeatureSelector<ChatState>('chat');

export const errorStateSelector = createFeatureSelector<ErrorState>('error');

export const tokenSelect = createSelector(chatStateSelector, state =>
  state.token ? state.token : undefined
);

export const tokenTimeSelect = createSelector(chatStateSelector, state =>
  state.tokenTime ? state.tokenTime : undefined
);

export const orderErrorSelect = createSelector(errorStateSelector, state => {
  return { error: state };
});
