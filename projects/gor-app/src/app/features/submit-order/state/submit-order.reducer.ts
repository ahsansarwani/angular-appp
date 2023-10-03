import { Order } from '@datorama/akita';
import { createReducer, on } from '@ngrx/store';
import { DafReviewActions } from '../../daf-review/state/daf-review.actionTypes';
import { OtpActions } from '../../otp/state/otp.actionTypes';
import { RedirectActions } from '../../redirect/state/redirect.actionTypes';
import { OrderActions } from './submit-order.actionTypes';
import { OrderState } from './submit-order.model';

export const initialOrderState: OrderState = {
  getPaymentCount: 0,
  payRetryCount: 0,
};

export const orderReducer = createReducer(
  initialOrderState,
  // on(OrderActions.submitOrderInit, (state, action) => {
  //   return {
  //     ...state,
  //     orderInit: true,
  //     orderInitTime: new Date(),
  //   };
  // }),
  on(OrderActions.submitOrderSuccess, (state, action) => {
    return {
      ...state,
      orderStatus: true,
      orderId: action.orderId,
    };
  }),
  on(OrderActions.submitPendingOrderSuccess, (state, action) => {
    return {
      ...state,
      leadStatus: true,
      orderId: action.orderId,
    };
  }),
  on(OrderActions.submitOrderFail, (state, action) => {
    return {
      ...state,
      orderStatus: false,
    };
  }),
  on(OrderActions.submitLeadInit, (state, action) => {
    return {
      ...state,
      leadInit: true,
      leadInitTime: new Date(),
    };
  }),
  on(OrderActions.submitLeadSuccess, (state, action) => {
    return {
      ...state,
      leadStatus: true,
      orderId: action.orderId,
    };
  }),
  on(OrderActions.submitLeadFail, (state, action) => {
    return {
      ...state,
      leadStatus: false,
    };
  }),

  on(DafReviewActions.callBackSuccessXendit, (state, action) => {
    return {
      ...state,
      xenditToken: action.token,
    };
  }),

  on(OrderActions.paymentSessionSuccessGcash, (state, action) => {
    return {
      ...state,
      paymentTokenId: action.data.paymentTokenId,
      payRetryCount: state.payRetryCount + 1,
    };
  }),

  on(DafReviewActions.failXendit, (state, action) => {
    return {
      ...state,
      payRetryCount: state.payRetryCount + 1,
    };
  }),

  on(OrderActions.paymentSessionSuccessXendit, (state, action) => {
    return {
      ...state,
      paymentTokenId: action.data.paymentTokenId,
      getPaymentCount: state.getPaymentCount + 1,
    };
  }),

  on(
    OrderActions.getPaymentStatusSuccessGcash,
    OrderActions.getPaymentStatusSuccessXendit,
    (state, action) => {
      return {
        ...state,
        paymentStatus: true,
        payStatusMessage: action.message,
      };
    }
  ),

  on(OrderActions.openRetryOption, (state, action) => {
    return {
      ...state,
      retryModal: true,
      payStatusMessage: action.message,
    };
  }),

  on(OrderActions.getPaymentStatusPending, (state, action) => {
    return {
      ...state,
      payStatusMessage: action.message,
      paymentPendingStatus: true,
    };
  }),

  on(OrderActions.closeRetryModal, (state, action) => {
    return {
      ...state,
      retryModal: false,
    };
  }),

  on(RedirectActions.initRecovery, (state, action) => {
    return {
      payRetryCount: 0,
      getPaymentCount: 0,
      orderId: action.orderId,
      isRecovery: true,
    };
  }),

  on(OtpActions.fetchOrderRecoverySuccess, (state, action) => {
    return {
      ...state,
      ...action.state.order,
      paymentSessionStatus: undefined,
      paymentPendingStatus: undefined,
      orderStatus: undefined,
      leadStatus: undefined,
      orderId: undefined,
    };
  }),
  on(OrderActions.paymentSessionFail, (state, action) => {
    return {
      ...state,
      paymentSessionStatus: false,
    };
  }),
  on(OrderActions.getPaymentStatusFail, (state, action) => {
    return {
      ...state,
      paymentStatusFail: false,
    };
  })
);
