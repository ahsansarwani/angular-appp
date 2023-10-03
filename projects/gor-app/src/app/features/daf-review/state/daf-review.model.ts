export interface DafReviewState {
  overdueBalanceList: any;
  historicBalanceList: any;
  customerType: any;
  isPaymentModeVisible: any;
  buttonText: any;
  isTncChecked: any;
  historicBalanceTitle: any;
  overdueBalanceTitle: any;
  isOverdue?: any;
  payTodayTotal?: any;
  hbTotal?: any;
  obTotal?: any;
  planInfo?: any;
  payMode?: string;
  acceptedTCDate?: Date;
  drawerStatus?: boolean;
  xenditInit?: boolean;
  xenditInitStatus?: boolean;
  xenditToken?: string;
  authModal: string;
  authUrl: string;
  authSuccess?: boolean;
  reviewSubmit?: boolean;
  tncCheck?: {
    check0: boolean;
    check1: boolean;
    checkAll: boolean;
  };
}
