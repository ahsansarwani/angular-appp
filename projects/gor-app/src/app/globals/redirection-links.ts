import { environment } from '../../environments/environment';

export const redirectionLinks = {
  gplansimonly1299:
    environment.homeUrl +
    '/postpaid-plans/customize-plan/sim-only?plan=gplansimonly1299',
  gplansimonly1499:
    environment.homeUrl +
    '/postpaid-plans/customize-plan/sim-only?plan=gplansimonly1499',
  gplansimonly1799:
    environment.homeUrl +
    '/postpaid-plans/customize-plan/sim-only?plan=gplansimonly1799',
  gplansimonly1999:
    environment.homeUrl +
    '/postpaid-plans/customize-plan/sim-only?plan=gplansimonly1999',
  gplansimonly2499:
    environment.homeUrl +
    '/postpaid-plans/customize-plan/sim-only?plan=gplansimonly2499',
  gplansimonly3799:
    environment.homeUrl +
    '/postpaid-plans/customize-plan/sim-only?plan=platgplanplus3799',
  gplansimonly4999:
    environment.homeUrl +
    '/postpaid-plans/customize-plan/sim-only?plan=platgplanplus4999',
  gplansimonly7999:
    environment.homeUrl +
    '/postpaid-plans/customize-plan/sim-only?plan=platgplanplus7999',
  renewal: environment.homeUrl + '/renew',
};

export const allRoutes = {
  planSelector: '',
  selectUnli: 'select-unliapp',
  otp: 'otp',
  uploadId: 'upload-id',
  eligibility: 'eligibility-check',
  daf: 'personal-info',
  offlineDaf: 'personal-info-offline',
  review: 'review',
  redirect: 'redirect',
  submitOrder: 'submit-order',
  orderTracker: 'order-tracker',
  orderExists: 'duplicate',
  orderSuccess: 'thank-you',
  orderOffline: 'thank-you-offline',
  errorCreditLimit: 'insufficient-credit-limit',
  error: 'error',
  orderPaymentPending: 'payment-pending',
  errorMaximumAttemptsReached: 'maximum-attempts-reached',
  errorIdMismatch: 'id-mismatch',
  errorRecovery:'error-recovery'
};

export const toRoute = {
  planSelector: '/',
  selectUnli: '/select-unliapp',
  otp: '/otp',
  uploadId: '/upload-id',
  eligibility: '/eligibility-check',
  daf: '/personal-info',
  offlineDaf: '/personal-info-offline',
  review: '/review',
  redirect: '/redirect',
  submitOrder: '/submit-order',
  orderTracker: '/order-tracker',
  orderExists: '/duplicate',
  orderSuccess: '/thank-you',
  orderOffline: '/thank-you-offline',
  errorCreditLimit: '/insufficient-credit-limit',
  error: '/error',
  orderPaymentPending: '/payment-pending',
  errorMaximumAttemptsReached: '/maximum-attempts-reached',
  errorIdMismatch: '/id-mismatch',
  errorRecovery:'/error-recovery'
};

export const tags_plan: SEO = {
  title: 'SIM-Only Plans - Globe Online Shop',
  description:
    "With Globe Postpaid's SIM-Only plans, you can enjoy unli all-net calls and texts, up to 100 GB of data, 3 GB GoWiFi, and an app of your choice.",
  keywords: 'globe postapid sim-only plan',
};

export const tags_unli: SEO = {
  title: 'SIM-Only Plans - Globe Online Shop',
  description: 'Select unli app',
};

export const tags_uploadId: SEO = {
  title: 'Upload Your ID - SIM-Only Plans - Globe Online Shop',
  description: 'Upload your ID.',
};

export const tags_personalInfo: SEO = {
  title: 'Personal Information - SIM-Only Plans - Globe Online Shop',
  description: 'Submit your personal information.',
};

export const tags_otp: SEO = {
  title: 'OTP - SIM-Only Plans - Globe Online Shop',
  description:
    'Enter the One-Time Password (OTP) to complete the verification process.',
};

export const tags_eligibility: SEO = {
  title: 'Eligibility Check - SIM-Only Plans - Globe Online Shop',
  description:
    "Please provide your information and we'll assess your eligibility for the selected SIM-Only plan.",
};

export const tags_review: SEO = {
  title: 'Review Your Details - SIM-Only Plans - Globe Online Shop',
  description: 'Review your details.',
};

export const tags_thankYou: SEO = {
  title: 'Thank You - SIM-Only Plans - Globe Online Shop',
  description:
    'Thank you for your interest in applying for a Globe Postpaid SIM-Only plan.',
};

export const tags_thankYouOffline: SEO = {
  title: 'Thank You (Offline) - SIM-Only Plans - Globe Online Shop',
  description:
    "Thank you for your interest in applying for a Globe Postpaid SIM-Only plan. We'll be in touch!",
};

export const tags_duplicate: SEO = {
  title: 'Duplicate Orded - SIM-Only Plans - Globe Online Shop',
  description: 'You made a duplicate order.',
};

export const tags_creditLimit: SEO = {
  title: 'Insufficient Credit Limit - SIM-Only Plans - Globe Online Shop',
  description: 'You have insufficient credit limit.',
};

export const tags_offlineDaf: SEO = {
  title: 'Personal Information (Offline) - SIM-Only Plans - Globe Online Shop',
  description: 'Please provide your information.',
};

interface SEO {
  title: string;
  description: string;
  keywords?: string;
}
