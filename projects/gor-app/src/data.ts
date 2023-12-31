import { InnerCard } from './app/features/plan-selector/components/inner-card/inner-card.model';
import { redirectionLinks } from './app/globals/redirection-links';
import {
  dummyPlanBenefits,
  platinumPlanBenefits,
  premiumPlanBenefits,
} from './dummy-data';

// *************** Group 1 ***********************************
export const basicPlanFeatures = [
  'Unli Allnet Calls & Text + Landline',
  '3GB GoWiFi Access',
];
export const unlimitedDataPlanFeature = [
  'Unli data for 6 months on your chosen app',
];
export const unlimited5GDataPlanFeature = ['Unli 5G data for 6 months'];
export const premiumPlanFeatures = [
  unlimitedDataPlanFeature,
  unlimited5GDataPlanFeature,
  ...basicPlanFeatures,
];
export const planFeatures799 = [
  'Unli Allnet Calls & Text + Landline',
  'Unli 5G data for 6 months',
  '3GB GoWiFi Access',
];
export const cardPlan599: InnerCard = {
  svg: 'assets/Sim plans/svg/plan599.svg',
  id: 'Basic599',
  planName: 'Plan 599',
  planName_: 'GPlan PLUS 599',
  planTitle: 'GPlan PLUS SIM-Only 599',
  goWifi: '3GB',
  hasUnli: false,
  callNText: 'Unli All-net Calls, Text, & Landline calls',
  contractDuration: 'No Lockup Period',
  planAmount: '₱599.00',
  payableAmt: '1,198.00',
  payableAmtNo: 1198,
  simType: 'Physical',
  dataTitle: 'All-access data',
  dataContent: '6GB',
  dataFeature: `Get add-ons in new `,
  link: `GlobeOne App`,
  badgeContent: 'Basic',
  badgeColor: {
    backgroundColor: '#FCE8B2',
    color: '#A66B11',
  },
  apps: undefined,
  duration: 'monthly',
  backgroundColor: undefined,
  border: '1px solid #eee',
  primaryColor: undefined,
  secondaryColor: undefined,
  dataFeatureColor: '#4C627A',
  name: 'GPlan with SIM Only 599',
  index: 2,
  planType: 'gplan',
  subPlanType: 'basic',
  amount: 599,
  accessDataTitle: 'All-access Data',
  accessData: '6 GB',
  hasUnlimitedAccess: false,
  hasBadge: true,
  planFeatures: basicPlanFeatures,
  planBenefits: dummyPlanBenefits,
};
export const cardPlan799: InnerCard = {
  svg: 'assets/Sim plans/svg/plan799.svg',
  id: 'Basic799',
  planName: 'Plan 799',

  planTitle: 'GPlan PLUS SIM-Only 799',
  goWifi: '3GB',
  hasUnli: false,
  callNText: 'Unli All-net Calls, Text, & Landline calls',
  contractDuration: 'No Lockup Period',
  planAmount: '₱799.00',
  payableAmt: '1,598.00',
  payableAmtNo: 1598,
  simType: 'Physical',
  dataTitle: 'All-access data',
  dataContent: '10GB',
  dataFeature: `Get add-ons in new `,
  apps: undefined,
  duration: 'monthly',
  link: 'GlobeOne App',
  backgroundColor: undefined,
  border: '1px solid #eee',
  primaryColor: undefined,
  secondaryColor: undefined,
  dataFeatureColor: '#4C627A',
  name: 'GPlan with SIM Only 799',
  index: 3,
  planType: 'gplan',
  subPlanType: 'basic',
  amount: 799,
  accessDataTitle: 'All-access Data',
  accessData: '10 GB',
  hasUnlimitedAccess: false,
  hasBadge: true,
  badgeContent: 'Starter',
  badgeColor: {
    backgroundColor: '#CFDDF4',
    color: '#1A458B',
  },
  planName_: 'GPlan PLUS 799',
  planFeatures: planFeatures799,
  planBenefits: dummyPlanBenefits,
};
export const cardPlan999: InnerCard = {
  svg: 'assets/Sim plans/svg/plan999.svg',
  index: 4,
  planType: 'gplan',
  subPlanType: 'basic',
  amount: 999,
  accessDataTitle: 'All-access Data',
  accessData: '20 GB',
  appDataTitle: 'App Data',
  appData: 'Unlimited',
  hasUnlimitedAccess: true,
  hasBadge: true,
  badgeContent: 'Best Value',
  badgeColor: {
    backgroundColor: '#FCE8B2',
    color: '#A66B11',
  },
  planName_: 'GPlan PLUS 999',
  planFeatures: unlimitedDataPlanFeature.concat(
    unlimited5GDataPlanFeature,
    basicPlanFeatures
  ),
  id: 'Basic999',
  planName: 'Plan 999',
  planTitle: 'GPlan PLUS SIM-Only 999',
  goWifi: '3GB',
  hasUnli: true,
  callNText: 'Unli All-net Calls, Text, & Landline calls',
  contractDuration: 'No Lockup Period',
  planAmount: '₱999.00',
  payableAmt: '1,998.00',
  payableAmtNo: 1998,
  simType: 'Physical',
  dataTitle: 'All-access data',
  dataContent: '20GB',
  dataFeature: 'Unli Data for 1 Chosen App',
  duration: 'monthly',
  link: undefined,
  backgroundColor: undefined,
  border: '1px solid #eee',
  primaryColor: undefined,
  secondaryColor: undefined,
  dataFeatureColor: '#4D97FF',
  name: 'GPlan with SIM Only 999',
  planBenefits: dummyPlanBenefits,
};
// *************** Group 2 ***********************************
export const cardPlan1299: InnerCard = {
  svg: 'assets/Sim plans/svg/plan1299.svg',
  index: 5,
  planType: 'gplan',
  subPlanType: 'premium',
  amount: 1299,
  accessDataTitle: 'All-access Data',
  accessData: '30 GB',
  appDataTitle: 'App Data',
  appData: 'Unlimited',
  hasUnlimitedAccess: true,
  hasBadge: false,
  planName_: 'GPlan PLUS 1299',
  planFeatures: premiumPlanFeatures,
  planName: 'Plan 1299',
  planTitle: 'GPlan with SIM Only 1299',
  goWifi: '3GB',
  hasUnli: true,
  callNText: 'Unli All-net Calls, Text, & Landline calls',
  contractDuration: 'No Lockup Period',
  planAmount: '₱1299.00',
  payableAmt: '2598.00',
  dataTitle: 'All-access data',
  dataContent: '30GB',
  dataFeature: 'Unli Data for 1 Chosen App',
  badgeContent: '',
  badgeColor: '',
  apps: undefined,
  duration: 'monthly',
  link: undefined,
  backgroundColor: undefined,
  border: '1px solid #eee',
  primaryColor: undefined,
  secondaryColor: undefined,
  dataFeatureColor: '#4D97FF',
  name: 'GPlan with SIM Only 1299',
  redirectionLink: redirectionLinks.gplansimonly1299,
  planBenefits: premiumPlanBenefits,
};

export const cardPlan1499: InnerCard = {
  svg: 'assets/Sim plans/svg/plan1499.svg',
  index: 6,
  planType: 'gplan',
  subPlanType: 'premium',
  amount: 1499,
  accessDataTitle: 'All-access Data',
  accessData: '40 GB',
  appDataTitle: 'App Data',
  appData: 'Unlimited',
  hasUnlimitedAccess: true,
  hasBadge: false,
  planName_: 'GPlan PLUS 1499',
  planFeatures: premiumPlanFeatures,
  planName: 'Plan 1499',
  planTitle: 'GPlan with SIM Only 1499',
  goWifi: '3GB',
  hasUnli: true,
  callNText: 'Unli All-net Calls, Text, & Landline calls',
  contractDuration: 'No Lockup Period',
  planAmount: '₱1,499.00',
  payableAmt: '2,998.00',
  dataTitle: 'All-access data',
  dataContent: '40GB',
  dataFeature: 'Unli Data for 1 Chosen App',
  apps: undefined,
  badgeContent: '',
  badgeColor: '',
  duration: 'monthly',
  link: undefined,
  backgroundColor: undefined,
  border: '1px solid #eee',
  primaryColor: undefined,
  secondaryColor: undefined,
  dataFeatureColor: '#4D97FF',
  name: 'GPlan with SIM Only 1499',
  redirectionLink: redirectionLinks.gplansimonly1499,
  planBenefits: premiumPlanBenefits,
};

export const cardPlan1799: InnerCard = {
  svg: 'assets/Sim plans/svg/plan1799.svg',
  index: 7,
  planType: 'gplan',
  subPlanType: 'premium',
  amount: 1799,
  accessDataTitle: 'All-access Data',
  accessData: '50 GB',
  appDataTitle: 'App Data',
  appData: 'Unlimited',
  hasUnlimitedAccess: true,
  hasBadge: true,
  badgeContent: 'Best Seller',
  badgeColor: {
    backgroundColor: '#FFC3A7',
    color: '#B91E28',
  },
  planBenefits: premiumPlanBenefits,
  planName_: 'GPlan PLUS 1799',
  planFeatures: premiumPlanFeatures,
  planName: 'Plan 1799',
  planTitle: 'GPlan with SIM Only 1799',
  goWifi: '3GB',
  hasUnli: true,
  callNText: 'Unli All-net Calls, Text, & Landline calls',
  contractDuration: 'No Lockup Period',
  planAmount: '₱1,799.00',
  payableAmt: '3,598.00',
  dataTitle: 'All-access data',
  dataContent: '50GB',
  dataFeature: 'Unli Data for 1 Chosen App',
  apps: undefined,
  duration: 'monthly',
  link: undefined,
  backgroundColor: undefined,
  border: '1px solid #eee',
  primaryColor: undefined,
  secondaryColor: undefined,
  dataFeatureColor: '#4D97FF',
  name: 'GPlan with SIM Only 1799',
  redirectionLink: redirectionLinks.gplansimonly1799,
};

export const cardPlan1999: InnerCard = {
  svg: 'assets/Sim plans/svg/plan1999.svg',
  index: 8,
  planType: 'gplan',
  subPlanType: 'premium',
  amount: 1999,
  accessDataTitle: 'All-access Data',
  accessData: '60 GB',
  appDataTitle: 'App Data',
  appData: 'Unlimited',
  hasUnlimitedAccess: true,
  hasBadge: false,
  planName_: 'GPlan PLUS 1999',
  planFeatures: premiumPlanFeatures,
  planName: 'Plan 1999',
  planTitle: 'GPlan with SIM Only 1999',
  goWifi: '3GB',
  hasUnli: true,
  callNText: 'Unli All-net Calls, Text, & Landline calls',
  contractDuration: 'No Lockup Period',
  planAmount: '₱1,999.00',
  payableAmt: '3,998.00',
  dataTitle: 'All-access data',
  dataContent: '60GB',
  dataFeature: 'Unli Data for 1 Chosen App',
  dataFeatureColor: '#4D97FF',
  badgeContent: '',
  badgeColor: '',
  duration: 'monthly',
  link: undefined,
  backgroundColor: undefined,
  border: '1px solid #eee',
  primaryColor: undefined,
  secondaryColor: undefined,
  name: 'GPlan with SIM Only 1999',
  redirectionLink: redirectionLinks.gplansimonly1999,
  planBenefits: premiumPlanBenefits,
};

export const cardPlan2499: InnerCard = {
  svg: 'assets/Sim plans/svg/plan2499.svg',
  index: 9,
  planType: 'gplan',
  subPlanType: 'premium',
  amount: 2499,
  accessDataTitle: 'All-access Data',
  accessData: '100 GB',
  appDataTitle: 'App Data',
  appData: 'Unlimited',
  hasUnlimitedAccess: true,
  hasBadge: false,
  planName_: 'GPlan PLUS 2499',
  planFeatures: premiumPlanFeatures,
  planName: 'Plan 2499',
  planAmount: '₱1,999.00',
  payableAmt: '3,998.00',
  dataTitle: 'All-access data',
  dataContent: '100GB',
  dataFeature: 'Unli Data for 1 Chosen App',
  dataFeatureColor: '#4D97FF',
  badgeContent: '',
  badgeColor: '',
  apps: undefined,
  duration: 'monthly',
  link: undefined,
  backgroundColor: undefined,
  border: '1px solid #eee',
  primaryColor: undefined,
  secondaryColor: undefined,
  name: 'GPlan with SIM Only 2499',
  redirectionLink: redirectionLinks.gplansimonly2499,
  planBenefits: premiumPlanBenefits,
};

// *************** Group 3 ***********************************

export const cardPlan3799: InnerCard = {
  svg: 'assets/Sim plans/svg/plan3799.svg',
  index: 10,
  planType: 'platinum',
  subPlanType: 'platinum',
  amount: 3799,
  accessDataTitle: 'All-access Data',
  accessData: 'Unli',
  monthlyConsumableAllowanceTitle: 'Monthly Consumable',
  monthlyConsumableAllowance: '1500',
  hasUnlimitedAccess: false,
  roamingTitle: 'Roaming',
  roamingDays: '1 Day',
  hasBadge: false,
  planName_: 'GPlan PLUS 3799',
  planFeatures: basicPlanFeatures,
  planName: 'GPlan Plus 3799',
  planTitle: 'GPlan with SIM Only 3799',
  goWifi: '3GB',
  hasUnli: true,
  callNText: 'Unli All-net Calls, Text, & Landline calls',
  contractDuration: 'No Lockup Period',
  dataTitle: 'All-access Data',
  dataContent: 'Unli',
  dataFeature: '1 Day Data Roaming',
  badgeContent: '',
  badgeColor: '',
  apps: undefined,
  duration: 'monthly',
  link: undefined,
  backgroundColor: '#3B5A87',
  border: '0px solid',
  primaryColor: '#BF9890',
  secondaryColor: '#F5F9FC',
  dataFeatureColor: '#fff',
  name: 'GPlan with SIM Only 3799',
  redirectionLink: redirectionLinks.gplansimonly3799,
  centerText: true,
  planBenefits: platinumPlanBenefits,
};

export const cardPlan4999: InnerCard = {
  svg: 'assets/Sim plans/svg/plan4999.svg',
  index: 0,
  planType: 'platinum',
  subPlanType: 'platinum',
  amount: 4999,
  accessDataTitle: 'All-access Data',
  accessData: 'Unli',
  monthlyConsumableAllowanceTitle: 'Monthly Consumable',
  monthlyConsumableAllowance: '2250',
  hasUnlimitedAccess: false,
  roamingTitle: 'Roaming',
  roamingDays: '3 Days',
  hasBadge: false,
  planName_: 'GPlan PLUS 4999',
  planFeatures: basicPlanFeatures,
  planName: 'GPlan Plus 4999',
  planTitle: 'GPlan with SIM Only 4999',
  goWifi: '3GB',
  hasUnli: true,
  callNText: 'Unli All-net Calls, Text, & Landline calls',
  contractDuration: 'No Lockup Period',
  planAmount: '₱4,999.00',
  payableAmt: '9,998.00',
  dataTitle: 'All-access Data',
  dataContent: 'Unli',
  dataFeature: '3 Days Data Roaming',
  badgeContent: '',
  badgeColor: '',
  apps: undefined,
  duration: 'monthly',
  link: undefined,
  backgroundColor: '#3B5A87',
  border: '0px solid',
  primaryColor: '#BF9890',
  secondaryColor: '#F5F9FC',
  dataFeatureColor: '#fff',
  name: 'GPlan with SIM Only 4999',
  redirectionLink: redirectionLinks.gplansimonly4999,
  centerText: true,
  planBenefits: platinumPlanBenefits,
};

export const cardPlan7999: InnerCard = {
  svg: 'assets/Sim plans/svg/plan7999.svg',
  index: 1,
  planType: 'platinum',
  subPlanType: 'platinum',
  amount: 7999,
  accessDataTitle: 'All-access Data',
  accessData: 'Unli',
  monthlyConsumableAllowanceTitle: 'Monthly Consumable',
  monthlyConsumableAllowance: '4250',
  hasUnlimitedAccess: false,
  roamingTitle: 'Roaming',
  roamingDays: '5 Days',
  hasBadge: false,
  planName_: 'GPlan PLUS 7999',
  planFeatures: basicPlanFeatures,
  planName: 'GPlan Plus 7999',
  planTitle: 'GPlan with SIM Only 7999',
  goWifi: '3GB',
  hasUnli: true,
  callNText: 'Unli All-net Calls, Text, & Landline calls',
  contractDuration: 'No Lockup Period',
  planAmount: '₱7,999.00',
  payableAmt: '15,998.00',
  dataTitle: 'All-access Data',
  dataContent: 'Unli',
  dataFeature: ' 5 Days Data Roaming',
  badgeContent: '',
  badgeColor: '',
  apps: undefined,
  duration: 'monthly',
  link: undefined,
  backgroundColor: '#3B5A87',
  border: '0px solid',
  primaryColor: '#BF9890',
  secondaryColor: '#F5F9FC',
  dataFeatureColor: '#fff',
  name: 'GPlan with SIM Only 7999',
  redirectionLink: redirectionLinks.gplansimonly7999,
  centerText: true,
  planBenefits: platinumPlanBenefits,
};

export const swiperArrayElements = {
  elementAtIndex0: cardPlan4999,
  elementAtIndex1: cardPlan7999,
  elementAtIndex2: cardPlan599,
  elementAtIndex3: cardPlan799,
  elementAtIndex4: cardPlan999,
  elementAtIndex5: cardPlan1299,
  elementAtIndex6: cardPlan1499,
  elementAtIndex7: cardPlan1799,
  elementAtIndex8: cardPlan1999,
  elementAtIndex9: cardPlan2499,
  elementAtIndex10: cardPlan3799,
};
export const swiperArray = [
  swiperArrayElements.elementAtIndex0,
  swiperArrayElements.elementAtIndex1,
  swiperArrayElements.elementAtIndex2,
  swiperArrayElements.elementAtIndex3,
  swiperArrayElements.elementAtIndex4,
  swiperArrayElements.elementAtIndex5,
  swiperArrayElements.elementAtIndex6,
  swiperArrayElements.elementAtIndex7,
  swiperArrayElements.elementAtIndex8,
  swiperArrayElements.elementAtIndex9,
  swiperArrayElements.elementAtIndex10,
];
