export interface OrderState {
  orderInit?: boolean;
  orderId?: string;
  orderInitTime?: Date;
  orderStatus?: boolean;
  leadInit?: boolean;
  leadInitTime?: Date;
  leadStatus?: boolean;
  payInit?: boolean;
  payInitTime?: Date;
  payRetryCount: number;
  paymentTokenId?: string;
  payStatusMessage?: string;
  paymentStatus?: boolean;
  paymentPendingStatus?: boolean;
  getPaymentCount: number;
  retryModal?: boolean;
  isRecovery?: boolean;
  paymentSessionStatus?: boolean;
  paymentStatusFail?: boolean;
}
