import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EligibilityState } from '../../eligibility/state/eligibility.model';
import { OtpState } from '../../otp/state/otp.reducer';
import { DAFFillState } from './daf-fill.model';

export const selectDAFFillState =
  createFeatureSelector<DAFFillState>('dafFill');

export const selectEligibilityState =
  createFeatureSelector<EligibilityState>('eligibility');

export const selectOtpState = createFeatureSelector<OtpState>('otp');

export const provinceSelector = createSelector(
  selectDAFFillState,
  (state: DAFFillState) => (state.provinceList ? state.provinceList : undefined)
);

export const citySelector = createSelector(
  selectDAFFillState,
  (state: DAFFillState) => (state.cityList ? state.cityList : undefined)
);

export const bgySelector = createSelector(
  selectDAFFillState,
  (state: DAFFillState) => (state.barangayList ? state.barangayList : undefined)
);

export const postalSelector = createSelector(
  selectDAFFillState,
  (state: DAFFillState) => (state.postalCode ? state.postalCode : undefined)
);

export const mobileNoSelector = createSelector(
  selectDAFFillState,
  (state: DAFFillState) =>
    state.formValues ? state.formValues.personalInfo.mobileNumber : ''
);

export const formSelector = createSelector(
  selectDAFFillState,
  (state: DAFFillState) =>
    state.formValues ? state.formValues : { personalInfo: {}, addressInfo: {} }
);

export const personalInfoSelect = createSelector(
  selectDAFFillState,
  (state: DAFFillState) => {
    return state.formValues?.personalInfo;
  }
);

export const addressInfoSelect = createSelector(
  selectDAFFillState,
  (state: DAFFillState) => {
    return state.formValues?.addressInfo;
  }
);

export const nameFtaSelector = createSelector(
  selectDAFFillState,
  (state: DAFFillState) =>
    state.formValues?.personalInfo.firstName
      ? state.formValues.personalInfo.firstName
      : ''
);

export const fullNameSelector = createSelector(
  selectDAFFillState,
  (state: DAFFillState) => {
    const firstName = state.formValues?.personalInfo.firstName
      ? state.formValues.personalInfo.firstName
      : '';
    const middleName = state.formValues?.personalInfo.middleName
      ? state.formValues.personalInfo.middleName
      : '';
    const lastName = state.formValues?.personalInfo.lastName
      ? state.formValues.personalInfo.lastName
      : '';

    return firstName + ' ' + middleName + ' ' + lastName;
  }
);

export const formSubmitStatusSelect = createSelector(
  selectDAFFillState,
  (state: DAFFillState) => (state.formSubmitStatus == true ? true : false)
);

export const recoveryFormDetailsCheck = createSelector(
  selectDAFFillState,
  (state: DAFFillState) => {
    return {
      firstName: state.formValues?.personalInfo.firstName
        ? state.formValues?.personalInfo.firstName.toString().toUpperCase()
        : undefined,
      middleName: state.formValues?.personalInfo.middleName
        ? state.formValues?.personalInfo.middleName.toString().toUpperCase()
        : undefined,
      lastName: state.formValues?.personalInfo.lastName
        ? state.formValues?.personalInfo.lastName.toString().toUpperCase()
        : undefined,
      birthday: state.formValues?.personalInfo.birthday
        ? state.formValues?.personalInfo.birthday
        : undefined,
      gender: state.formValues?.personalInfo.gender
        ? state.formValues?.personalInfo.gender.toString().toUpperCase() ==
          'MALE'
          ? 'M'
          : state.formValues?.personalInfo.gender.toString().toUpperCase() ==
            'FEMALE'
          ? 'F'
          : undefined
        : undefined,
    };
  }
);

export const orderPersonInfoSelect = createSelector(
  selectDAFFillState,
  selectOtpState,
  selectEligibilityState,
  (state: DAFFillState, otp: OtpState, eligibility: EligibilityState) => {
    const pInfo = state.formValues?.personalInfo
      ? {
          firstName: state.formValues.personalInfo.firstName
            ? state.formValues.personalInfo.firstName
            : 'undefined',
          middleName: state.formValues.personalInfo.middleName
            ? state.formValues.personalInfo.middleName
            : 'undefined',
          lastName: state.formValues.personalInfo.lastName
            ? state.formValues.personalInfo.lastName
            : 'undefined',
          dob: state.formValues.personalInfo.birthday
            ? state.formValues.personalInfo.birthday
            : 'undefined',
          gender: state.formValues.personalInfo.sex
            ? state.formValues.personalInfo.sex === 'Male'
              ? 'M'
              : state.formValues.personalInfo.sex === 'Female'
              ? 'F'
              : 'undefined'
            : state.formValues.personalInfo.gender
            ? state.formValues.personalInfo.gender === 'Male'
              ? 'M'
              : state.formValues.personalInfo.gender === 'Female'
              ? 'F'
              : 'undefined'
            : 'undefined',
          email: state.formValues.personalInfo.emailAddress
            ? state.formValues.personalInfo.emailAddress
            : state.formValues.personalInfo.email
            ? state.formValues.personalInfo.email
            : 'default@globe.com.ph',
          motherMaidenName: state.formValues.personalInfo.motherMaidenName
            ? state.formValues.personalInfo.motherMaidenName
            : 'undefined',
          mobileNo: state.formValues.personalInfo.mobileNumber
            ? state.formValues.personalInfo.mobileNumber
            : 'undefined',
          nationality: state.formValues.personalInfo.nationality
            ? state.formValues.personalInfo.nationality
            : 'undefined',
          idNumber: state.formValues.personalInfo.idNumber
            ? state.formValues.personalInfo.idNumber
            : 'undefined',
        }
      : eligibility.accountInfo
      ? {
          firstName: eligibility.accountInfo.firstName
            ? eligibility.accountInfo.firstName
            : 'undefined',
          middleName: eligibility.accountInfo.middleName
            ? eligibility.accountInfo.middleName
            : 'undefined',
          lastName: eligibility.accountInfo.lastName
            ? eligibility.accountInfo.lastName
            : 'undefined',
          dob: eligibility.accountInfo.birthday
            ? eligibility.accountInfo.birthday
            : 'undefined',
          gender: eligibility.accountInfo.gender
            ? eligibility.accountInfo.gender == 'M'
              ? 'M'
              : eligibility.accountInfo.gender == 'F'
              ? 'F'
              : 'undefined'
            : 'undefined',
          email: eligibility.accountInfo.emailAddress
            ? eligibility.accountInfo.emailAddress
            : eligibility.accountInfo.email
            ? eligibility.accountInfo.email
            : 'default@globe.com.ph',
          motherMaidenName: eligibility.accountInfo.motherMaidenName
            ? eligibility.accountInfo.motherMaidenName
            : 'undefined',
          mobileNo: otp.mobileNo ? otp.mobileNo : 'undefined',
          nationality: eligibility.accountInfo.country
            ? eligibility.accountInfo.country
            : 'undefined',
        }
      : undefined;

    return {
      personalInfo: {
        ...pInfo,
      },
    };
  }
);

export const orderAddSelect = createSelector(
  selectDAFFillState,
  selectEligibilityState,
  (state: DAFFillState, eligibility: EligibilityState) => {
    const addInfo = state.formValues?.personalInfo
      ? {
          type: state.formValues.addressInfo.houseNo ? 'house' : 'condo',
          houseOrUnitNumber: state.formValues.addressInfo.houseNo
            ? state.formValues.addressInfo.houseNo
            : state.formValues.addressInfo.floorNo
            ? state.formValues.addressInfo.floorNo
            : 'undefined',
          buildingName: state.formValues.addressInfo.building
            ? state.formValues.addressInfo.building
            : 'undefined',
          street: state.formValues.addressInfo.street
            ? state.formValues.addressInfo.street
            : state.formValues.addressInfo._street
            ? state.formValues.addressInfo._street
            : 'undefined',
          village: state.formValues.addressInfo.village
            ? state.formValues.addressInfo.village
            : state.formValues.addressInfo._village
            ? state.formValues.addressInfo._village
            : 'undefined',
          city: state.formValues.addressInfo.city
            ? state.formValues.addressInfo.city
            : 'undefined',
          province: state.formValues.addressInfo.province
            ? state.formValues.addressInfo.province
            : 'undefined',
          barangay: state.formValues.addressInfo.barangay
            ? state.formValues.addressInfo.barangay
            : 'undefined',
          zipCode: state.formValues.addressInfo.zipCode
            ? state.formValues.addressInfo.zipCode
            : 'undefined',
          country: 'Philippines',
          area: state.postalCode?.area ? state.postalCode?.area : 'undefined',
        }
      : eligibility.accountInfo
      ? {
          type: eligibility.accountInfo.houseNo ? 'house' : 'condo',
          houseOrUnitNumber: eligibility.accountInfo.houseNo
            ? eligibility.accountInfo.houseNo
            : eligibility.accountInfo.floorNo
            ? eligibility.accountInfo.floorNo
            : 'undefined',
          buildingName: eligibility.accountInfo.building
            ? eligibility.accountInfo.building
            : 'undefined',
          street: eligibility.accountInfo.street
            ? eligibility.accountInfo.street
            : 'undefined',
          village: eligibility.accountInfo.village
            ? eligibility.accountInfo.village
            : 'undefined',
          city: eligibility.accountInfo.city
            ? eligibility.accountInfo.city
            : 'undefined',
          province: eligibility.accountInfo.province
            ? eligibility.accountInfo.province
            : 'undefined',
          barangay: eligibility.accountInfo.subdivisionVillage
            ? eligibility.accountInfo.subdivisionVillage
            : 'undefined',
          zipCode: eligibility.accountInfo.postalCode
            ? eligibility.accountInfo.postalCode
            : 'undefined',
          country: 'Philippines',
        }
      : undefined;

    return {
      address: {
        ...addInfo,
      },
    };
  }
);
