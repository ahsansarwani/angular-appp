export interface AccountInfoResponse {
  accountStatus: boolean;
  accountNo: number;
}

export interface DuplicateCheckResponse {
  duplicateStatus: boolean;
}

export interface BalanceCheckResponse {
  balanceStatus: boolean;
  amount: number;
}

export interface AlertsCheckResponse {
  alertStatus: boolean;
}

export interface EligibilityState {
  balanceCheckList: BalanceCheckList[];
  mobileNo: string;
  accountInfoInit: boolean | undefined;
  accountInfoStatus: string;
  accountInfoRetryCount: number;
  accountInfoTime: Date | undefined;
  accountInfo?: any;
  accountError?: any;
  accountErrorStatus?: boolean;
  accountCheckStatus?: boolean;
  brandInfo?: any;
  brandError?: any;
  brandErrorStatus?: boolean;
  brandCheckStatus?: boolean;
  customerInfo?: any;
  customerError?: any;
  customerErrorStatus?: boolean;
  customerCheckStatus?: boolean;
  sufficiencyInfo?: any;
  sufficiencyError?: any;
  sufficiencyErrorStatus?: boolean;
  sufficiencyCheckStatus?: boolean;
  duplicateInfo?: any;
  duplicateError?: any;
  duplicateErrorStatus?: boolean;
  duplicateCheckStatus?: boolean;
  eligibilityInfo?: any;
  eligibilityError?: any;
  eligibilityErrorStatus?: boolean;
  eligibilityCheckStatus?: boolean;
  allEligibilityCheckStatus?: boolean;
  ftaInAda?: boolean;
  duplicateInit: boolean | undefined;
  duplicateStatus: string;
  prevOrderStatus?: boolean;
  prevOrderDetails?: any;
  duplicateRetryCount: number;
  duplicateTime: Date | undefined;
  eligibilityInit: boolean | undefined;
  eligibilityStatus: string;
  eligibilityRetryCount: number;
  eligibilityTime: Date | undefined;
  alertsInit: boolean | undefined;
  alertsStatus: string;
  alertsRetryCount: number;
  alertsTime: Date | undefined;
  loaderPercent: number;
  customerType: any;
  processedBalanceList?: ProcessedBalanceList;
}
export interface HBBalanceDetails {
  accountNumber: string;
  historicBalance: string;
  product?: string;
}
export interface OBBalanceDetails {
  accountNumber: string;
  overdueBalance: string;
  product?: string;
}

export interface BalanceCheckList {
  accountNumber: string;
  historicBalance?: number | null;
  overdueBalance?: number | null;
  product: string;
}

export interface ProcessedBalanceList {
  amount: number;
  amtHb: number;
  amtOb: number;
  hbBalanceList: Array<HBBalanceDetails>;
  obBalanceList: Array<OBBalanceDetails>;
}
