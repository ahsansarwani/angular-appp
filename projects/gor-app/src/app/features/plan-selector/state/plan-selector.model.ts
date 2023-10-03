export interface PlanState {
  planName: string | undefined;
  planName_?: string;
  dataTitle: string | undefined;
  dataContent: string | undefined;
  dataFeature: string | undefined;
  hasBadge: boolean | undefined;
  badgeContent: string | undefined;
  badgeColor: string | undefined;
  apps: Array<any> | undefined;
  duration: string | undefined;
  selectedPlan: string | undefined;
  link: string | undefined;
  planTitle?: string;
  goWifi?: string;
  hasUnli?: boolean;
  callNText?: string;
  contractDuration?: string;
  selectedUnliAppName?: string;
  selectedUnliApp?: string;
  selectedAppImage?: string;
  planAmount?: string;
  payableAmt?: string;
  payableAmtNo?: number;
  simType?: string;
  backgroundColor: any;
  primaryColor: any;
  secondaryColor: any;
  dataFeatureColor: any;
  name: any;
  index: any;
  planType: any;
  subPlanType: any;
  amount: any;
  hasUnlimitedAccess: boolean;
  roamingTitle: any;
  roamingDays: any;
  planFeatures: any;
}

export interface CustomerTypeState {
  customerType: string | undefined;
}

export interface LobState {
  lobType?: string;
}

export interface UserState {
  userId?: string;
}

export interface PlanBreakDown {
  planTitle: string;
  dataContent: string;
  goWifi: string;
  hasUnli: boolean;
  callNText: string;
  contractDuration: string;
  selectedAppImage: string;
  selectedUnliApp: string;
  selectedUnliAppName: string;
}
// export interface cardData {}
