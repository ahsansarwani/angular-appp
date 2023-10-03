export interface OrderTrackerState {
  order: OrderData | undefined,
  token: OrderToken | undefined,
  queryParams: QueryParamsState | undefined
  retryCount: number
}

export interface OrderData {
  orderDetails: OrderDetails;
  orderHistory: OrderHistory[] | [];
}

export interface OrderDetails {
  firstName: string;
  referenceNumber: string;
  planName: string;
}

export interface OrderHistory {
  status: string;
  internalStatus: string;
  statusDescription: string;
  timestamp: string
}

export interface Error {
  error: string,
  errorDetails: string;
}

export interface OrderToken {
  accessToken: string,
  expiresIn: string,
  tokenType: string
}

export interface QueryParamsState {
  orderReferenceId: string,
  email: string
}

export interface StatusDisplay {
  header: string,
  details: string,
  icon: string
}

