import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CustomerTypeState,
  LobState,
  PlanBreakDown,
  PlanState,
  UserState,
} from './plan-selector.model';
import { initialLobState, initialPlanState } from './plan-selector.reducer';

export const planState = createFeatureSelector<PlanState>('plan');

export const planSelect = createSelector(planState, state => state);

export const customerTypeState =
  createFeatureSelector<CustomerTypeState>('customerType');

export const lobTypeState = createFeatureSelector<LobState>('lob');

export const lobState = createSelector(
  lobTypeState,
  (state: LobState) => state.lobType
);

export const userState = createFeatureSelector<UserState>('user');

export const userIdSelect = createSelector(
  userState,
  (state: UserState) => state.userId
);

export const customerTypeSelect = createSelector(
  customerTypeState,
  (state: CustomerTypeState) => state.customerType
);

export const planBreakdownSelect = createSelector(
  planState,
  (state: PlanState) => {
    return {
      planTitle: state.planTitle,
      dataContent: state.dataContent,
      goWifi: state.goWifi,
      hasUnli: state.hasUnli,
      callNText: state.callNText,
      contractDuration: state.contractDuration,
      selectedUnliApp: state.selectedUnliApp,
      selectedUnliAppName: state.selectedUnliAppName,
      selectedAppImage: state.selectedAppImage,
    } as PlanBreakDown;
  }
);

export const planTitleSelect = createSelector(planState, (state: PlanState) =>
  state.planTitle ? state.planTitle : 'GPlan PLUS SIM-Only'
);

export const planAmountSelect = createSelector(planState, (state: PlanState) =>
  state.planAmount ? state.planAmount : 'Not found'
);

export const payableAmtSelect = createSelector(planState, (state: PlanState) =>
  state.payableAmt ? state.payableAmt : 'Not found'
);

export const orderPlanSelect = createSelector(planState, (state: PlanState) => {
  const plan = state.planTitle ? state.planTitle : 'Not found';
  const unli = state.selectedUnliApp ? state.selectedUnliApp : undefined;
  return {
    planDetails: {
      name: plan,
      unliApp: unli,
    },
  };
});

export const orderUpcomingAmtSelect = createSelector(
  planState,
  (state: PlanState) => {
    const upcoming = state.payableAmtNo ? state.payableAmtNo : 0;
    return {
      // dueAmount: {
      upcoming: upcoming.toString(),
      // },
    };
  }
);

export const orderSimTypeSelect = createSelector(
  planState,
  (state: PlanState) => {
    const type = state.simType ? state.simType : 'Not found';
    return {
      simType: type,
    };
  }
);

export const orderTypeSelect = createSelector(
  customerTypeState,
  (state: CustomerTypeState) => {
    const type = state.customerType ? state.customerType : 'Not Found';
    return {
      orderType: type,
    };
  }
);

export const orderLobSelect = createSelector(
  lobTypeState,
  (state: LobState) => {
    const type = state.lobType ? state.lobType : 'Unknown';
    return {
      lobType: type,
    };
  }
);
export const selectIndex = createSelector(
  planState,
  (state: PlanState) => state.index
);
