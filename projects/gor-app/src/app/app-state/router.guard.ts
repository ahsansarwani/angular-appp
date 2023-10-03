import { inject } from '@angular/core';
import { NavigationEnd, Router, RouterStateSnapshot } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { firstValueFrom, of, tap, withLatestFrom } from 'rxjs';
import {
  customerTypeSelect,
  lobState,
  planSelect,
} from '../features/plan-selector/state/plan-selector.selectors';
import { ActivatedRouteSnapshot } from '@angular/router';
import {
  sendInitStatus,
  verifyInitStatus,
  verifyStatus,
} from '../features/otp/state/otp.selectors';
import {
  accountStatusSelect,
  allEligibilityStatusSelect,
  brandStatusSelect,
  customerStatusSelect,
  duplicateStatusSelect,
  eligStatusSelect,
  sufficiencyStatusSelect,
} from '../features/eligibility/state/eligibility.selectors';
import { formSubmitStatusSelect } from '../features/daf-fill/state/daf-fill.selector';
import {
  dafScanStatusSelect,
  idCheckRetrySelector,
} from '../features/daf-scan/state/daf-scan.selectors';
import {
  idCheckResultSelect,
  recoveryidMatched,
  recoverySelect,
} from '../features/redirect/state/redirect.selector';
import {
  getPayStatus,
  leadStatusSelect,
  leadStatusSelect2,
  orderStatusSelect,
  orderStatusSelect2,
  paymentMsgSelect,
  paymentStatusSelect,
  paymentStatusSelect2,
  payPendingStatusSelect,
  payRetryCountSelect,
  paySessionStatus,
} from '../features/submit-order/state/submit-order.selectors';
import {
  payModeSelect,
  payTodayTotal,
  reviewSubmitSelect,
} from '../features/daf-review/state/daf-review.selectors';
import { checkOBPositive } from '../features/eligibility/state/eligibility.actions';
import { TmplAstRecursiveVisitor } from '@angular/compiler';
import { allRoutes, toRoute } from '../globals/redirection-links';
import { UrlService } from './url.service';

export const routerGuard = async (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const router = inject(Router);
  const service = inject(Store);
  const urlService = inject(UrlService);

  // router.events.subscribe(())

  console.log('******** Router Guard Called **********');
  // console.log('next', next.url.at(0)?.path);
  // console.log('state', state.url);
  // console.log('prev url', urlService.getPreviousUrl());
  // console.log('is popped', urlService.isPopStateEvent());
  // console.log('status', router.url == '/');

  const toUrl = state.url;
  const fromUrl = urlService.getPreviousUrl();
  const isBackForward = urlService.isPopStateEvent();

  const customer = await firstValueFrom(
    service.pipe(select(customerTypeSelect))
  );
  const plan = await firstValueFrom(service.pipe(select(planSelect)));
  const lob = await firstValueFrom(service.pipe(select(lobState)));

  console.log('customer', customer);

  // if (customer == 'RECOVERY') return true;

  const plans = await checkPlans(router, customer, plan, lob);
  if (plans == true && customer !== 'RECOVERY') return true;

  if (customer == 'RECOVERY') {
    if (state.url == toRoute.error) return true;
    console.log('otp');
    const otp = await checkOtpADA(service, router, state);
    if (otp === true) return true;

    console.log('id');
    const id = await checkId(service, router, state, lob);
    if (id === true) return true;
  }

  if (customer == 'ADA') {
    if (isBackForward === true) {
      if (
        routePathADA[toUrl as keyof Paths] <
        routePathADA[fromUrl as keyof Paths]
      )
        return true;
    }

    console.log('otp');
    const otp = await checkOtpADA(service, router, state);
    if (otp === true) return true;

    console.log('elig');
    const elig = await checkEligibilityADA(service, router, state);
    if (elig === true) return true;
    console.log('1');
    console.log('daf');
    const daf = await checkDaf(service, router, state);
    if (daf === true) return true;
    console.log('2');

    console.log('review');
    const review = await checkReview(service, router, state);
    if (review === true) return true;
    console.log('3');

    console.log('pay');
    const pay = await checkPayment(service, router, state);
    if (pay === true) return true;
    console.log('4');

    return true;
  }

  if (customer == 'FTA' && lob === 'Mobile') {
    if (isBackForward === true) {
      if (
        routePathFTA[toUrl as keyof Paths] <
        routePathFTA[fromUrl as keyof Paths]
      )
        return true;
    }
    console.log('id check');
    const id = await checkId(service, router, state, lob);
    if (id === true) return true;

    console.log('daf');
    const daf = await checkDaf(service, router, state);
    if (daf === true) return true;

    console.log('otp');
    const otp = await checkOtpFTA(service, router, state);
    if (otp === true) return true;

    console.log('elig');
    const elig = await checkEligibilityFTA(service, router, state);
    if (elig === true) return true;

    console.log('review');
    const review = await checkReview(service, router, state);
    if (review === true) return true;

    console.log('pay');
    const pay = await checkPayment(service, router, state);
    if (pay === true) return true;

    return true;
  }

  if (customer == 'FTA' && lob !== 'Mobile') {
    console.log('daf');
    const offlineDaf = await checkOfflineDaf(service, router, state);
    if (offlineDaf === true) return true;

    console.log('lead');
    const lead = await checkLead(service, router, state);
    if (lead === true) return true;
  }

  return true;
};

export const checkPlans = (router: any, customer: any, plan: any, lob: any) => {
  if (!customer || !plan || !lob) {
    router.navigateByUrl(toRoute.planSelector);
    return true;
  }
  return false;
};

export const checkOtpADA = async (service: any, router: any, state: any) => {
  const sendOtpInitStatus = await firstValueFrom(
    service.pipe(select(sendInitStatus))
  );

  const verifyOtpInitStatus = await firstValueFrom(
    service.pipe(select(verifyInitStatus))
  );

  const verifyOtpStatus = await firstValueFrom(
    service.pipe(select(verifyStatus))
  );

  if (sendOtpInitStatus == false || verifyOtpInitStatus == false) {
    if (state.url == toRoute.error) return true;
    router.navigateByUrl(toRoute.error);
    return true;
  }

  if (sendOtpInitStatus !== true && verifyOtpStatus !== true) {
    if (state.url == toRoute.otp) return true;
    router.navigateByUrl(toRoute.otp);
    return true;
  }

  console.log('OTP check end');

  return false;
};

export const checkOtpFTA = async (service: any, router: any, state: any) => {
  const sendOtpInitStatus = await firstValueFrom(
    service.pipe(select(sendInitStatus))
  );

  const verifyOtpInitStatus = await firstValueFrom(
    service.pipe(select(verifyInitStatus))
  );

  const verifyOtpStatus = await firstValueFrom(
    service.pipe(select(verifyStatus))
  );

  const leadStatus: any = await firstValueFrom(
    service.pipe(select(leadStatusSelect2))
  );

  if (sendOtpInitStatus === false || verifyOtpInitStatus === false) {
    if (leadStatus === undefined) {
      if (state.url == toRoute.submitOrder) return true;
      router.navigateByUrl(toRoute.submitOrder);
      return true;
    } else if (leadStatus === true) {
      if (state.url == toRoute.orderOffline) return true;
      router.navigateByUrl(toRoute.orderOffline);
      return true;
    } else if (leadStatus === false) {
      if (state.url == toRoute.error) return true;
      router.navigateByUrl(toRoute.error);
      return true;
    }
  }

  // if (verifyOtpStatus === true) {
  //   if (state.url == toRoute.eligibility) return true;
  //   router.navigateByUrl(toRoute.eligibility);
  //   return true;
  // }

  if (sendOtpInitStatus !== true && verifyOtpStatus !== true) {
    if (state.url == toRoute.otp) return true;
    router.navigateByUrl(toRoute.otp);
    return true;
  }

  console.log('OTP check end');

  return false;
};

export const checkEligibilityADA = async (
  service: any,
  router: any,
  state: any
) => {
  const brandStatus: any = await firstValueFrom(
    service.pipe(select(brandStatusSelect))
  );

  const accountStatus: any = await firstValueFrom(
    service.pipe(select(accountStatusSelect))
  );

  const customerStatus: any = await firstValueFrom(
    service.pipe(select(customerStatusSelect))
  );

  if (
    brandStatus.brandErrorStatus === undefined &&
    accountStatus.accountErrorStatus === undefined &&
    customerStatus.customerErrorStatus === undefined
  ) {
    if (state.url == toRoute.eligibility) return true;
    router.navigateByUrl(toRoute.eligibility);
    return true;
  }

  // console.log();

  if (
    brandStatus.brandErrorStatus == true ||
    accountStatus.accountErrorStatus == true ||
    customerStatus.customerErrorStatus == true
  ) {
    if (state.url == toRoute.error) return true;
    router.navigateByUrl(toRoute.error);
    return true;
  }

  if (
    brandStatus.brandErrorStatus === false &&
    brandStatus.brandCheckStatus === false
  ) {
    if (state.url == toRoute.eligibility) return true;
    router.navigateByUrl(toRoute.eligibility);
    return true;
  }

  const duplicateStatus: any = await firstValueFrom(
    service.pipe(select(duplicateStatusSelect))
  );

  const sufficiencyStatus: any = await firstValueFrom(
    service.pipe(select(sufficiencyStatusSelect))
  );

  const leadStatus: any = await firstValueFrom(
    service.pipe(select(leadStatusSelect2))
  );

  // console.log('Duplicate status', duplicateStatus);
  if (
    duplicateStatus.duplicateErrorStatus === undefined &&
    sufficiencyStatus.sufficiencyErrorStatus === undefined
  ) {
    if (state.url == toRoute.eligibility) return true;
    router.navigateByUrl(toRoute.eligibility);
    return true;
  }

  if (
    duplicateStatus.duplicateErrorStatus === true ||
    sufficiencyStatus.sufficiencyErrorStatus === true
  ) {
    // console.log('Error in duplicate and suff found', leadStatus);
    if (leadStatus === undefined) {
      if (state.url == toRoute.submitOrder) return true;
      router.navigateByUrl(toRoute.submitOrder);
      return true;
    }

    if (leadStatus === true) {
      if (state.url == toRoute.orderOffline) return true;
      router.navigateByUrl(toRoute.orderOffline);
      return true;
    }

    if (leadStatus === false) {
      if (state.url == toRoute.error) return true;
      router.navigateByUrl(toRoute.error);
      return true;
    }
  }

  if (
    duplicateStatus.duplicateErrorStatus === false &&
    duplicateStatus.duplicateCheckStatus === false
  ) {
    if (state.url == toRoute.orderExists) return true;
    router.navigateByUrl(toRoute.orderExists);
    return true;
  }

  if (
    sufficiencyStatus.sufficiencyErrorStatus === false &&
    sufficiencyStatus.sufficiencyCheckStatus === false
  ) {
    if (state.url == toRoute.errorCreditLimit) return true;
    router.navigateByUrl(toRoute.errorCreditLimit);
    return true;
  }

  const obStatus: any = await firstValueFrom(
    service.pipe(select(eligStatusSelect))
  );

  if (obStatus.eligibilityErrorStatus === undefined) {
    if (state.url == toRoute.eligibility) return true;
    router.navigateByUrl(toRoute.eligibility);
    return true;
  }

  if (obStatus.eligibilityErrorStatus === true) {
    if (leadStatus === undefined) {
      if (state.url == toRoute.submitOrder) return true;
      router.navigateByUrl(toRoute.submitOrder);
      return true;
    }

    if (leadStatus === true) {
      if (state.url == toRoute.orderOffline) return true;
      router.navigateByUrl(toRoute.orderOffline);
      return true;
    }

    if (leadStatus === false) {
      if (state.url == toRoute.error) return true;
      router.navigateByUrl(toRoute.error);
      return true;
    }
  }

  if (obStatus.eligibilityCheckStatus === false) {
    if (state.url == toRoute.error) return true;
    router.navigateByUrl(toRoute.error);
    return true;
    //   return router.navigateByUrl('/error');
  }

  console.log('Eligibility check end');

  return false;
};

const checkDaf = async (service: any, router: any, state: any) => {
  const eligibilityStatus = await firstValueFrom(
    service.pipe(select(allEligibilityStatusSelect))
  );

  const formSubmitStatus = await firstValueFrom(
    service.pipe(select(formSubmitStatusSelect))
  );

  if (formSubmitStatus === undefined || formSubmitStatus !== true) {
    if (state.url == toRoute.daf) return true;
    router.navigateByUrl(toRoute.daf);
    return true;
  }

  console.log('Daf check end');

  return false;
};

const checkOfflineDaf = async (service: any, router: any, state: any) => {
  const formSubmitStatus = await firstValueFrom(
    service.pipe(select(formSubmitStatusSelect))
  );

  if (formSubmitStatus === undefined || formSubmitStatus !== true) {
    if (state.url == toRoute.offlineDaf) return true;
    router.navigateByUrl(toRoute.offlineDaf);
    return true;
  }

  // if (eligibilityStatus === true && formSubmitStatus !== true) {
  //   if (state.url == '/personal-info') return true;
  //   router.navigateByUrl('/personal-info');
  //   return false;
  //   //   router.navigateByUrl('/personal-info');
  // }

  return false;
};

const checkReview = async (service: any, router: any, state: any) => {
  const reviewStatus = await firstValueFrom(
    service.pipe(select(reviewSubmitSelect))
  );

  if (reviewStatus !== true) {
    if (state.url == toRoute.daf) return true;
    if (state.url == toRoute.review) return true;
    router.navigateByUrl(toRoute.review);
    return true;
  }

  return false;
};

const checkPayment = async (service: any, router: any, state: any) => {
  const payToday = await firstValueFrom(service.pipe(select(payTodayTotal)));

  const payStatus = await firstValueFrom(
    service.pipe(select(paymentStatusSelect2))
  );

  const payPendingStatus = await firstValueFrom(
    service.pipe(select(payPendingStatusSelect))
  );

  const payRetryCount: any = await firstValueFrom(
    service.pipe(select(payRetryCountSelect))
  );

  const orderStatus = await firstValueFrom(
    service.pipe(select(orderStatusSelect2))
  );

  const leadStatus = await firstValueFrom(
    service.pipe(select(leadStatusSelect2))
  );

  console.log('pay today', payToday);

  if (payToday == 0) {
    // console.log('No Pay Today');
    if (orderStatus === false || leadStatus === false) {
      console.log('failed  submit order');
      if (state.url == toRoute.error) return true;
      router.navigateByUrl(toRoute.error);
      return true;
    } else if (orderStatus === undefined && leadStatus === undefined) {
      // console.log('returing submit order');
      if (state.url == toRoute.submitOrder) return true;
      router.navigateByUrl(toRoute.submitOrder);
      return true;
    } else if (orderStatus == true) {
      if (state.url == toRoute.orderSuccess) return true;
      router.navigateByUrl(toRoute.orderSuccess);
      return true;
    } else if (leadStatus == true) {
      if (state.url == toRoute.orderOffline) return true;
      router.navigateByUrl(toRoute.orderOffline);
      return true;
    }
  } else {
    // console.log('else returing submit order');
    const payMode = await firstValueFrom(service.pipe(select(payModeSelect)));

    const payMsg = await firstValueFrom(service.pipe(select(paymentMsgSelect)));

    const reviewStatus = await firstValueFrom(
      service.pipe(select(reviewSubmitSelect))
    );

    const sessionStatus = await firstValueFrom(
      service.pipe(select(paySessionStatus))
    );

    const getPaymentStatus = await firstValueFrom(
      service.pipe(select(getPayStatus))
    );

    if (payRetryCount > 3) {
      if (state.url === toRoute.error) return true;
      router.navigateByUrl(toRoute.error);
      return true;
    }

    if (sessionStatus == false || getPaymentStatus == false) {
      if (leadStatus === undefined) {
        if (state.url === toRoute.submitOrder) return true;
        router.navigateByUrl(toRoute.submitOrder);
        return true;
      }
      if (leadStatus === true) {
        if (state.url === toRoute.orderOffline) return true;
        router.navigateByUrl(toRoute.orderOffline);
        return true;
      }
    }

    if (payPendingStatus == true) {
      if (leadStatus === false) {
        // console.log('failed submit lead');
        if (state.url === toRoute.error) return true;
        router.navigateByUrl(toRoute.error);
        return true;
      }
      if (leadStatus === undefined) {
        if (state.url === toRoute.submitOrder) return true;
        router.navigateByUrl(toRoute.submitOrder);
        return true;
      }

      if (leadStatus === true) {
        if (state.url === toRoute.orderPaymentPending) return true;
        router.navigateByUrl(toRoute.orderPaymentPending);
        return true;
      }
    }

    if (payMode == 'xendit') {
      if (reviewStatus !== true) {
        if (state.url == toRoute.review) return true;
        router.navigateByUrl(toRoute.review);
        return true;
      }

      if (orderStatus === false) {
        console.log('failed  submit order');
        if (state.url == toRoute.error) return true;
        router.navigateByUrl(toRoute.error);
        return true;
      }

      if (reviewStatus === true && orderStatus === undefined) {
        if (state.url == toRoute.submitOrder) return true;
        router.navigateByUrl(toRoute.submitOrder);
        return true;
      }

      if (payStatus === true && reviewStatus === true && orderStatus == true) {
        if (state.url == toRoute.orderSuccess) return true;
        router.navigateByUrl(toRoute.orderSuccess);
        return true;
      }

      if (payStatus === true && reviewStatus === true && orderStatus == false) {
        if (state.url == toRoute.error) return true;
        router.navigateByUrl(toRoute.error);
        return true;
      }
    }

    if (payMode == 'gcash') {
      if (reviewStatus !== true) {
        if (state.url == toRoute.review) return true;
        router.navigateByUrl(toRoute.review);
        return true;
      }

      if (reviewStatus == true && payStatus !== true) {
        if (state.url == toRoute.submitOrder) return true;
        router.navigateByUrl(toRoute.submitOrder);
        return true;
      }

      if (reviewStatus == true && payStatus == true && orderStatus == true) {
        if (state.url == toRoute.orderSuccess) return true;
        router.navigateByUrl(toRoute.orderSuccess);
        return true;
      }

      if (reviewStatus == true && payStatus == true && orderStatus == false) {
        if (state.url == toRoute.error) return true;
        router.navigateByUrl(toRoute.error);
        return true;
      }
    }
  }
  return false;
};

const checkId = async (service: any, router: any, state: any, lob: any) => {
  const dafScanStatus = await firstValueFrom(
    service.pipe(select(dafScanStatusSelect))
  );
  const idCheckStatus = await firstValueFrom(
    service.pipe(select(idCheckResultSelect))
  );

  const recoverStatus = await firstValueFrom(
    service.pipe(select(recoverySelect))
  );

  const formSubmitStatus = await firstValueFrom(
    service.pipe(select(formSubmitStatusSelect))
  );

  const leadStatus = await firstValueFrom(
    service.pipe(select(leadStatusSelect2))
  );

  if (dafScanStatus != true || idCheckStatus === undefined) {
    if (lob !== 'Mobile' && recoverStatus == true) {
      if (state.url == toRoute.error) return true;
      router.navigateByUrl(toRoute.error);
      return true;
    } else {
      if (state.url == toRoute.uploadId) return true;
      router.navigateByUrl(toRoute.uploadId);
      return true;
    }
  }

  if (recoverStatus === true) {
    const retryCount: number = await firstValueFrom(
      service.pipe(select(idCheckRetrySelector))
    );

    const formSubmitStatus = await firstValueFrom(
      service.pipe(select(formSubmitStatusSelect))
    );

    const idMatched = await firstValueFrom(
      service.pipe(select(recoveryidMatched))
    );

    if (
      idMatched == true &&
      idCheckStatus == true &&
      formSubmitStatus !== true
    ) {
      if (state.url == toRoute.daf) return true;
      router.navigateByUrl(toRoute.daf);
      return true;
    }

    if (retryCount < 3 && idCheckStatus !== true && idMatched === undefined) {
      if (state.url == toRoute.uploadId) return true;
      router.navigateByUrl(toRoute.uploadId);
      return true;
    } else if (
      retryCount < 3 &&
      (idCheckStatus === false || idMatched === false)
    ) {
      if (state.url == toRoute.uploadId) return true;
      if (state.url == toRoute.errorIdMismatch) return true;
      router.navigateByUrl(toRoute.errorIdMismatch);
      return true;
    } else if (
      retryCount >= 3 &&
      (idCheckStatus === false || idMatched !== true)
    ) {
      if (state.url == toRoute.errorMaximumAttemptsReached) return true;
      router.navigateByUrl(toRoute.errorMaximumAttemptsReached);
      return true;
    }
  } else {
    if (idCheckStatus === false) {
      if (formSubmitStatus !== true) {
        if (state.url == toRoute.offlineDaf) return true;
        router.navigateByUrl(toRoute.offlineDaf);
        return true;
      }

      if (leadStatus === undefined) {
        if (state.url == toRoute.submitOrder) return true;
        router.navigateByUrl(toRoute.submitOrder);
        return true;
      }

      if (leadStatus === true) {
        if (state.url == toRoute.orderOffline) return true;
        router.navigateByUrl(toRoute.orderOffline);
        return true;
      }

      if (leadStatus === false) {
        if (state.url == toRoute.error) return true;
        router.navigateByUrl(toRoute.error);
        return true;
      }
    }
  }

  return false;
};

const checkEligibilityFTA = async (service: any, router: any, state: any) => {
  console.log('Elig FTA');
  const duplicateStatus: any = await firstValueFrom(
    service.pipe(select(duplicateStatusSelect))
  );

  const leadStatus = await firstValueFrom(
    service.pipe(select(leadStatusSelect2))
  );

  // const recoverStatus = await firstValueFrom(
  //   service.pipe(select(recoverySelect))
  // );

  console.log('Duplicate FTA', duplicateStatus);
  if (
    duplicateStatus.duplicateErrorStatus === undefined &&
    duplicateStatus.duplicateCheckStatus === undefined
  ) {
    if (state.url == toRoute.eligibility) return true;
    router.navigateByUrl(toRoute.eligibility);
    return true;
  }

  console.log('Duplicate FTA', duplicateStatus);

  if (duplicateStatus.duplicateErrorStatus == true) {
    if (leadStatus === undefined) {
      if (state.url === toRoute.submitOrder) return true;
      router.navigateByUrl(toRoute.submitOrder);
      return true;
    } else if (leadStatus === true) {
      if (state.url == toRoute.orderOffline) return true;
      router.navigateByUrl(toRoute.orderOffline);
      return true;
    } else if (leadStatus === false) {
      if (state.url === toRoute.error) return true;
      router.navigateByUrl(toRoute.error);
      return true;
    }
  }

  if (
    duplicateStatus.duplicateErrorStatus === false &&
    duplicateStatus.duplicateCheckStatus === false
  ) {
    if (state.url == toRoute.orderExists) return true;
    router.navigateByUrl(toRoute.orderExists);
    return true;
  }

  const obStatus: any = await firstValueFrom(
    service.pipe(select(eligStatusSelect))
  );

  if (
    obStatus.eligibilityErrorStatus === undefined &&
    obStatus.eligibilityCheckStatus === undefined
  ) {
    if (state.url == toRoute.eligibility) return true;
    router.navigateByUrl(toRoute.eligibility);
    return true;
  }

  if (obStatus.eligibilityErrorStatus === true) {
    if (leadStatus === undefined) {
      if (state.url === toRoute.submitOrder) return true;
      router.navigateByUrl(toRoute.submitOrder);
      return true;
    } else if (leadStatus === true) {
      if (state.url == toRoute.orderOffline) return true;
      router.navigateByUrl(toRoute.orderOffline);
      return true;
    } else if (leadStatus === false) {
      if (state.url === toRoute.error) return true;
      router.navigateByUrl(toRoute.error);
      return true;
    }
  }

  if (obStatus.eligibilityCheckStatus === false) {
    if (state.url == toRoute.error) return true;
    router.navigateByUrl(toRoute.error);
    return true;
  }

  return false;
};

const checkLead = async (service: any, router: any, state: any) => {
  const leadStatus = await firstValueFrom(
    service.pipe(select(leadStatusSelect2))
  );

  if (leadStatus === false) {
    console.log('failed  submit order');
    if (state.url == toRoute.error) return true;
    router.navigateByUrl(toRoute.error);
    return true;
  } else if (leadStatus === undefined) {
    console.log('returing submit order');
    if (state.url == toRoute.submitOrder) return true;
    router.navigateByUrl(toRoute.submitOrder);
    return true;
  } else if (leadStatus === true) {
    if (state.url == toRoute.orderOffline) return true;
    router.navigateByUrl(toRoute.orderOffline);
    return true;
  }

  return false;
};

const routeTo = (state: any, router: any, to: any) => {
  if (state.url == to) return true;
  router.navigateByUrl(to);
  return true;
};

const routePathADA: Paths = {
  '/': 0,
  '/otp': 1,
  '/eligibility-check': 2,
  '/personal-info': 3,
  '/review': 4,
  '/submit-order': 5,
  '/thank-you': 6,
  '/upload-id': 999,
};

const routePathFTA: Paths = {
  '/': 0,
  '/upload-id': 1,
  '/personal-info': 2,
  '/otp': 3,
  '/eligibility-check': 4,
  '/review': 5,
  '/submit-order': 6,
  '/thank-you': 7,
};

interface Paths {
  '/': number;
  '/otp': number;
  '/eligibility-check': number;
  '/review': number;
  '/submit-order': number;
  '/thank-you': number;
  '/personal-info': number;
  '/upload-id': number;
}
