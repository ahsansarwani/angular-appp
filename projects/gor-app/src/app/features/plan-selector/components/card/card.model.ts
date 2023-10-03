export class Card {
  mainTitle: string | undefined;
  planId: string | undefined;
  planType: string | undefined;
  planSubtitle: string | undefined;
  planBenefits: Array<any> | undefined;
  innerCard?:any;
  planFeaturesTitle?: string | undefined;
  planFeatures?: Array<string> | undefined;
  backgroundColor: any;
  primaryColor: any;
  secondaryColor: any;
  planFeaturesIcon?: any;
}
