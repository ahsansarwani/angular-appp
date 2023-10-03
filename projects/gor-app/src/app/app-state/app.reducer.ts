import { Order } from '@datorama/akita';
import {
  createReducer,
  on,
  ActionReducerMap,
  MetaReducer,
  ActionReducer,
  INIT,
  UPDATE,
} from '@ngrx/store';
import { DAFFillActions } from '../features/daf-fill/state/daf-fill.actionTypes';
import { EligibilityActions } from '../features/eligibility/state/eligibility.actionTypes';
import { OtpActions } from '../features/otp/state/otp.actionTypes';
import { lobState } from '../features/plan-selector/state/plan-selector.selectors';
import { RedirectActions } from '../features/redirect/state/redirect.actionTypes';
import { OrderActions } from '../features/submit-order/state/submit-order.actionTypes';
import { AppActions } from './app.actionTypes';
import { AppState, ChatState, ErrorState } from './app.model';

export const initialAppState: AppState = {};

export const initialChatState: ChatState = {};

export const initialErrorState: ErrorState = {};

// export const appReducer = createReducer(
//   initialAppState,
//   on(AppActions.navigate, (state, action) => {
//     console.log('in app reducer');
//     return state;
//   })
// );

// export const reducers: ActionReducerMap<AppState> = {
//     count: counterReducer
// }

// Hydrate Block

// export function clearStateMetaReducer<State extends {}>(reducer: ActionReducer<App>): ActionReducer<State> {
//   return function clearStateFn(state: State, action: Action) {
//       if (action.type === LOGOUT) {
//           state = {} as State; // ==> Emptying state here
//   }
//   return reducer(state, action);
//  };
// }

export const chatReducer = createReducer(
  initialChatState,
  on(AppActions.initChatToken, (state, action) => {
    return {
      ...state,
      tokenInit: true,
    };
  }),
  on(AppActions.tokenSuccess, (state, action) => {
    return {
      ...state,
      token: action.token,
      tokenTime: new Date(),
    };
  })
);

export const errorReducer = createReducer(
  initialErrorState,
  on(AppActions.setErrorState, (state, action) => {
    return {
      ...state,
    };
  }),
  on(OtpActions.initFailure, OtpActions.verifyRequestFail, (state, action) => {
    return {
      ...state,
      scenario: 'Failed OTP',
      description: '',
    };
  }),
  on(
    RedirectActions.successCheckResultFail,
    RedirectActions.failCheckResultFail,
    (state, action) => {
      return {
        ...state,
        scenario: 'Failed Zoloz',
        description: '',
      };
    }
  ),
  on(
    EligibilityActions.fetchBrandFail,
    EligibilityActions.duplicateFetchFail,
    EligibilityActions.checkSufficiencyFail,
    (state, action) => {
      return {
        ...state,
        scenario: 'Failed Eligibility Check',
        description: '',
      };
    }
  ),
  on(EligibilityActions.checkOBFail, (state, action) => {
    return {
      ...state,
      scenario: 'Failed OB/HB Check',
      description: '',
    };
  }),
  on(OrderActions.paymentSessionFail, (state, action) => {
    return {
      ...state,
      scenario: 'CreatePaymentSession API Failed',
      description: '',
    };
  }),
  on(OrderActions.getPaymentStatusPending, (state, action) => {
    return {
      ...state,
      scenario: 'Payment Pending Status',
      description: '',
    };
  }),
  on(DAFFillActions.formSubmitFta, (state, action) => {
    if (action.offlineMode == true && action.lob && action.lob !== 'Mobile') {
      return {
        ...state,
        scenario: 'Desktop Offline DAF',
        description: '',
      };
    } else return state;
  })
);

const hydrationMetaReducer = (
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> => {
  return (state, action) => {
    // console.log('Action type', action);
    if (action.type === INIT || action.type === UPDATE) {
      // console.log('app state action triggered', action.type);
      const storageValue = localStorage.getItem('state');
      if (storageValue) {
        try {
          return JSON.parse(storageValue);
        } catch {
          localStorage.removeItem('state');
        }
      }
    } else if (action.type == '[App] Init App') {
      state = {} as AppState;
    }
    const nextState = reducer(state, action);
    localStorage.setItem('state', JSON.stringify(nextState));
    return nextState;
  };
};

export const metaReducers: MetaReducer[] = [hydrationMetaReducer];

// Rehydrate Block
