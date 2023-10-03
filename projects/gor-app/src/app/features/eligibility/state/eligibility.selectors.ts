import { IfStmt } from '@angular/compiler';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DAFFillState } from '../../daf-fill/state/daf-fill.model';
import { OtpState } from '../../otp/state/otp.reducer';
import { PlanState } from '../../plan-selector/state/plan-selector.model';
import {
  EligibilityState,
  HBBalanceDetails,
  OBBalanceDetails,
} from './eligibility.model';

export const selectEligibilityState =
  createFeatureSelector<EligibilityState>('eligibility');

export const selectOtpState = createFeatureSelector<OtpState>('otp');

export const selectPlanState = createFeatureSelector<PlanState>('plan');

export const dafFillState = createFeatureSelector<DAFFillState>('dafFill');

export const accountInfo = createSelector(
  selectEligibilityState,
  state => state.accountInfo
);
export const accountLoader = createSelector(
  selectEligibilityState,
  state => state.accountInfoStatus
);

export const mobileNo = createSelector(
  selectEligibilityState,
  state => state.mobileNo
);

export const duplicateLoader = createSelector(
  selectEligibilityState,
  state => state.duplicateStatus
);

export const OBLoader = createSelector(
  selectEligibilityState,
  state => state.eligibilityStatus
);

export const alertLoader = createSelector(
  selectEligibilityState,
  state => state.alertsStatus
);

export const percent = createSelector(
  selectEligibilityState,
  state => state.loaderPercent
);

export const balanceCheckList = createSelector(
  selectEligibilityState,
  state => state.balanceCheckList
);

export const accountInfoSelect = createSelector(
  selectEligibilityState,
  state => state.accountInfo
);

export const accountStatusSelect = createSelector(
  selectEligibilityState,
  state => {
    return {
      accountErrorStatus: state.accountErrorStatus,
      accountCheckStatus: state.accountCheckStatus,
    };
  }
);

export const brandInfoSelect = createSelector(
  selectEligibilityState,
  state => state.brandInfo
);

export const brandStatusSelect = createSelector(
  selectEligibilityState,
  state => {
    return {
      brandErrorStatus: state.brandErrorStatus,
      brandCheckStatus: state.brandCheckStatus,
    };
  }
);

export const customerStatusSelect = createSelector(
  selectEligibilityState,
  state => {
    return {
      customerErrorStatus: state.customerErrorStatus,
      customerCheckStatus: state.customerCheckStatus,
    };
  }
);

export const duplicateInfoSelect = createSelector(
  selectEligibilityState,
  state => state.duplicateInfo
);

export const duplicateStatusSelect = createSelector(
  selectEligibilityState,
  state => {
    return {
      duplicateErrorStatus: state.duplicateErrorStatus,
      duplicateCheckStatus: state.duplicateCheckStatus,
    };
  }
);

export const sufficiencyStatusSelect = createSelector(
  selectEligibilityState,
  state => {
    return {
      sufficiencyErrorStatus: state.sufficiencyErrorStatus,
      sufficiencyCheckStatus: state.sufficiencyCheckStatus,
    };
  }
);

export const eligStatusSelect = createSelector(
  selectEligibilityState,
  state => {
    return {
      eligibilityErrorStatus: state.eligibilityErrorStatus,
      eligibilityCheckStatus: state.eligibilityCheckStatus,
    };
  }
);

export const allEligibilityStatusSelect = createSelector(
  selectEligibilityState,
  state => state.allEligibilityCheckStatus
);

export const sufficiencyPayloadSelect = createSelector(
  selectEligibilityState,
  selectOtpState,
  selectPlanState,
  (elig, otp, plan) => {
    if (elig.accountInfo.street == undefined) {
      elig.accountInfo.street = 'NULL';
    }
    if (elig.accountInfo.province == undefined) {
      elig.accountInfo.province = 'NULL';
    }
    if (elig.accountInfo.city == undefined) {
      elig.accountInfo.city = 'NULL';
    }
    if (elig.accountInfo.postalCode == undefined) {
      elig.accountInfo.postalCode = 'NULL';
    }

    if (
      elig.customerInfo?.customerId &&
      otp.mobileNo &&
      plan.planName &&
      elig.accountInfo &&
      elig.accountInfo.street &&
      elig.accountInfo.province &&
      elig.accountInfo.city &&
      elig.accountInfo.subdivisionVillage &&
      elig.accountInfo.postalCode
    ) {
      return {
        customerId: elig.customerInfo.customerId,
        mobileNumber: otp.mobileNo,
        planName: plan.planName,
        streetName: elig.accountInfo.street,
        province: elig.accountInfo.province,
        city: elig.accountInfo.city,
        barangay: elig.accountInfo.subdivisionVillage,
        zipCode: elig.accountInfo.postalCode,
      };
    } else {
      return undefined;
    }
  }
);

export const pendingStatusSelect = createSelector(
  selectEligibilityState,
  state => (state.prevOrderStatus === true ? true : false)
);

export const prevOrderIdSelect = createSelector(selectEligibilityState, state =>
  state.prevOrderDetails.referenceId
    ? state.prevOrderDetails.referenceId
    : 'GLS-XXXXXXXXXX'
);

export const prevsubmitDateSelect = createSelector(
  selectEligibilityState,
  state =>
    state.prevOrderDetails?.createdAt
      ? new Date(state.prevOrderDetails?.createdAt)
      : state.prevOrderDetails?.acceptedTCDate
      ? new Date(state.prevOrderDetails?.acceptedTCDate)
      : new Date()
);

export const prevPlanTitleSelect = createSelector(
  selectEligibilityState,
  state =>
    state.prevOrderDetails?.planDetails.name
      ? state.prevOrderDetails?.planDetails.name
      : 'Plan Not Found'
);

export const prevupdateDateSelect = createSelector(
  selectEligibilityState,
  state =>
    state.prevOrderDetails?.createdAt
      ? new Date(state.prevOrderDetails?.updatedAt)
      : state.prevOrderDetails?.acceptedTCDate
      ? new Date(state.prevOrderDetails?.acceptedTCDate)
      : new Date()
);

export const settleInfoSelect = createSelector(
  selectEligibilityState,
  dafFillState,
  (state, daf) => {
    let hbInfo = [];
    let obInfo = [];
    const email = daf.formValues?.personalInfo.email;

    if (state.eligibilityInfo?.processedBalanceList?.hbBalanceList && email) {
      hbInfo = state.eligibilityInfo.processedBalanceList?.hbBalanceList.map(
        (val: HBBalanceDetails) => {
          return {
            accountNumber: val.accountNumber,
            emailAddress: email,
            amount: parseFloat(val.historicBalance),
          };
        }
      );
    }

    if (state.eligibilityInfo?.processedBalanceList?.obBalanceList && email) {
      obInfo = state.eligibilityInfo.processedBalanceList?.obBalanceList.map(
        (val: OBBalanceDetails) => {
          return {
            accountNumber: val.accountNumber,
            emailAddress: email,
            amount: parseFloat(val.overdueBalance),
          };
        }
      );
    }

    return [...obInfo, ...hbInfo];
  }
);

export const eligibilityInfoSelect = createSelector(
  selectEligibilityState,
  state => state.eligibilityInfo
);

export const ftaInAdaSelect = createSelector(
  selectEligibilityState,
  state => state.ftaInAda
);

export const fnameAdaSelector = createSelector(
  selectEligibilityState,
  (state: EligibilityState) =>
    state.accountInfo?.firstName ? state.accountInfo.firstName : ''
);

export const lnameAdaSelector = createSelector(
  selectEligibilityState,
  (state: EligibilityState) =>
    state.accountInfo?.lastName ? state.accountInfo.lastName : ''
);

export const orderCustomerIdAda = createSelector(
  selectEligibilityState,
  (state: EligibilityState) =>
    state.customerInfo?.customerId
      ? { customerId: state.customerInfo.customerId }
      : undefined
);

export const orderEligibilitySelect = createSelector(
  selectEligibilityState,
  (state: EligibilityState) => {
    const error =
      state.accountInfoStatus === 'fail' ||
      state.duplicateStatus === 'fail' ||
      state.eligibilityStatus === 'fail'
        ? { error: 'true' }
        : { error: 'false' };
    const accountInfo =
      state.accountInfoStatus == 'success'
        ? {
            accountBrand: state.brandInfo
              ? state.brandInfo
              : {
                  brand: '',
                  brandType: '',
                },
          }
        : undefined;

    const duplicateInfo =
      state.duplicateStatus == 'success'
        ? {
            duplicateOrder: {
              verified: state.duplicateInfo
                ? state.duplicateInfo.isDuplicate == true ||
                  state.duplicateInfo.isDuplicate == false
                : false,
              isDuplicate: state.duplicateInfo.isDuplicate
                ? state.duplicateInfo.isDuplicate
                : false,
              details: 'undefined',
            },
          }
        : undefined;

    const balObj: any = [];

    if (
      state.eligibilityInfo?.balanceCheck?.balanceCheckList &&
      state.eligibilityInfo?.balanceCheck?.balanceCheckList.length > 0
    ) {
      const balanceList = state.eligibilityInfo?.balanceCheck?.balanceCheckList;
      balanceList.forEach((each: any) => {
        if (each.historicBalance == null) {
          balObj.push({
            accountNo: each.accountNumber,
            historicBalance: '',
            overdueBalance: each.overdueBalance,
            product: each.product,
          });
        } else {
          balObj.push({
            accountNo: each.accountNumber,
            historicBalance: each.historicBalance,
            overdueBalance: '',
            product: each.product,
          });
        }
      });
    }

    const sufficiencyInfo = state.sufficiencyInfo
      ? {
          sufficiencyResult: state.sufficiencyInfo,
        }
      : undefined;

    const eligibilityInfo = state.eligibilityInfo
      ? {
          cndb: {
            result: state.eligibilityInfo.eligibilityCheck.cndbResult
              ? state.eligibilityInfo.eligibilityCheck.cndbResult
              : '',
            referenceNumber: state.eligibilityInfo.eligibilityCheck
              .referenceNumber
              ? state.eligibilityInfo.eligibilityCheck.referenceNumber
              : '',
            checkDateTime: state.eligibilityTime ? state.eligibilityTime : '',
          },
          fraudCheck: state.eligibilityInfo.fraudCheck
            ? state.eligibilityInfo.fraudCheck
            : {
                recordsCount: '0',
                fraudDetails: [],
              },
          sgFraudCheck: state.eligibilityInfo.sgFraudCheck
            ? state.eligibilityInfo.sgFraudCheck
            : {
                recordsCount: '0',
                sgFraudDetails: [],
              },
          balanceCheck: state.eligibilityInfo.balanceCheck
            ? {
                recordsCount:
                  state.eligibilityInfo.balanceCheck.recordsCount.toString(),
                balanceDetails: balObj,
              }
            : {
                recordsCount: '0',
                balanceDetails: [],
              },
        }
      : undefined;

    return {
      eligibility: {
        ...error,
        ...accountInfo,
        ...duplicateInfo,
        ...sufficiencyInfo,
        ...eligibilityInfo,
      },
    };
  }
);
