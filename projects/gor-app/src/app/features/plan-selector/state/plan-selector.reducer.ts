import { createReducer, on } from '@ngrx/store';
import { EligibilityActions } from '../../eligibility/state/eligibility.actionTypes';
import { OtpActions } from '../../otp/state/otp.actionTypes';
import { RedirectActions } from '../../redirect/state/redirect.actionTypes';
import { PlanActions } from './plan-selector.actionTypes';
import {
  CustomerTypeState,
  LobState,
  PlanState,
  UserState,
} from './plan-selector.model';

export const initialCustomerState: CustomerTypeState = {
  customerType: undefined,
};

export const initialLobState: LobState = {
  lobType: undefined,
};

export const initialUserState: UserState = {
  userId: undefined,
};

export const initialPlanState: PlanState = {
  planName: undefined,
  dataTitle: undefined,
  dataContent: undefined,
  dataFeature: undefined,
  hasBadge: undefined,
  badgeContent: undefined,
  badgeColor: undefined,
  apps: undefined,
  duration: undefined,
  planFeatures: undefined,
  selectedPlan: undefined,
  link: undefined,
  backgroundColor: undefined,
  primaryColor: undefined,
  secondaryColor: undefined,
  dataFeatureColor: undefined,
  name: undefined,
  index: undefined,
  planType: undefined,
  subPlanType: undefined,
  amount: undefined,
  hasUnlimitedAccess: false,
  roamingTitle: undefined,
  roamingDays: undefined,
};

export const customerTypeReducer = createReducer(
  initialCustomerState,

  on(PlanActions.customerType, (state, action) => {
    return {
      ...state,
      customerType: action.customerType,
    };
  }),

  on(RedirectActions.initRecovery, (state, action) => {
    return {
      ...state,
      customerType: 'RECOVERY',
    };
  }),

  on(OtpActions.fetchOrderRecoverySuccess, (state, action) => {
    return {
      ...action.state.customerType,
    };
  }),

  on(EligibilityActions.ftaInAdaBtn, (state, action) => {
    if (action.choice == 'new') {
      return {
        ...state,
        customerType: 'FTA',
      };
    } else {
      return state;
    }
  })
);

export const lobReducer = createReducer(
  initialLobState,

  on(PlanActions.lobType, (state, action) => {
    return {
      ...state,
      lobType: action.deviceType,
    };
  })
);

export const userReducer = createReducer(
  initialUserState,

  on(PlanActions.generateUserId, (state, action) => {
    return {
      ...state,
      userId: action.userId,
    };
  })
);

export const planReducer = createReducer(
  initialPlanState,

  on(PlanActions.planSelection, (state, action) => {
    return {
      ...state,
      ...action.plan,
    };
  }),

  on(PlanActions.unliSelection, (state, action) => {
    return {
      ...state,
      ...action.unli,
    };
  }),

  on(OtpActions.fetchOrderRecoverySuccess, (state, action) => {
    return {
      ...action.state.plan,
    };
  })
);
