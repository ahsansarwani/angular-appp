import { createReducer, on } from '@ngrx/store';
import { OtpActions } from '../../otp/state/otp.actionTypes';
import { RedirectActions } from '../../redirect/state/redirect.actionTypes';
import { DAFFillActions } from './daf-fill.actionTypes';
import { DAFFillState } from './daf-fill.model';

export const initialDAFFillState: DAFFillState = {
  isLoading: false,
};

export const dafFillReducer = createReducer(
  initialDAFFillState,

  on(DAFFillActions.getProvinceInit, (state, action: any) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(DAFFillActions.getCityInit, (state, action: any) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(DAFFillActions.getBarangayInit, (state, action: any) => {
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(DAFFillActions.getProvinceSuccess, (state, action: any) => {
    return {
      ...state,
      isLoading: false,
      provinceList: action.provinces,
    };
  }),

  on(DAFFillActions.getCitySuccess, (state, action: any) => {
    return {
      ...state,
      isLoading: false,
      cityList: action.cities,
    };
  }),

  on(DAFFillActions.getBarangaySuccess, (state, action: any) => {
    return {
      ...state,
      isLoading: false,
      barangayList: action.barangays,
    };
  }),

  on(DAFFillActions.getPostalSuccess, (state, action: any) => {
    return {
      ...state,
      isLoading: false,
      postalCode: action.postalCode,
    };
  }),

  on(RedirectActions.successRecoveryMobile, (state, action: any) => {
    return {
      ...state,
      formValues: {
        personalInfo: { mobileNumber: action.mobileNo },
        addressInfo: {},
      },
    };
  }),

  on(DAFFillActions.formSubmitFta, (state, action: any) => {
    console.log('birthday', action.personalInfo.birthday);
    console.log('format', typeof action.personalInfo.birthday);
    let birthday: any;
    if (typeof action.personalInfo.birthday == 'string') {
      birthday = action.personalInfo.birthday.includes('T')
        ? action.personalInfo.birthday.substring(0, 10)
        : action.personalInfo.birthday;
    } else {
      // console.log('temp - ', action.personalInfo.birthday);
      const currentDate = action.personalInfo.birthday.toDate();
      // temp = temp.format('YYYY-MM-DD');
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-indexed
      const day = String(currentDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      // console.log(formattedDate);
      birthday = formattedDate;
      // birthday = moment(action.personsalInfo.birthday, 'YYYY-MM-DD');
      // action.personalInfo.birthday.toLocaleString().substring(0, 10);
      // console.log('birthday ---- ', formattedDate);
    }

    return {
      ...state,
      formValues: {
        personalInfo: {
          ...action.personalInfo,
          mobileNumber: action.personalInfo.mobileNumber.replace(/\s/g, ''),
          birthday: birthday,
        },
        addressInfo: action.addressInfo,
      },
      formSubmitStatus: true,
    };
  }),

  on(DAFFillActions.formSubmitAda, (state, action: any) => {
    console.log('birthday', action.personalInfo.birthday);
    console.log('format', typeof action.personalInfo.birthday);
    let birthday = '';
    if (typeof action.personalInfo.birthday == 'string') {
      birthday = action.personalInfo.birthday.includes('T')
        ? action.personalInfo.birthday.substring(0, 10)
        : action.personalInfo.birthday;
    } else {
      birthday = action.personalInfo.birthday.toISOString().substring(0, 10);
    }

    return {
      ...state,
      formValues: {
        personalInfo: {
          ...action.personalInfo,
          mobileNumber: action.personalInfo.mobileNumber.replace(/\s/g, ''),
          birthday: birthday,
        },
        addressInfo: action.addressInfo,
      },
      formSubmitStatus: true,
    };
  }),

  on(OtpActions.fetchOrderRecoverySuccess, (state, action) => {
    return {
      ...action.state.dafFill,
      formSubmitStatus: action.state.error?.scenario
        ? action.state.error.scenario === 'Desktop Offline DAF' ||
          action.state.error.scenario === 'Failed Zoloz'
          ? undefined
          : action.state.dafFill.formSubmitStatus
        : action.state.dafFill.formSubmitStatus,
    };
  }),

  on(RedirectActions.checkResultSuccessRecovery, (state, action) => {
    return {
      ...state,
      formValues: {
        personalInfo: {
          ...state.formValues?.personalInfo,
          idNumber: action.ID_NUMBER ? action.ID_NUMBER : 'Not found',
          sex: action.SEX
            ? action.SEX == 'M'
              ? 'Male'
              : 'Female'
            : action.GENDER
            ? action.GENDER == 'M'
              ? 'Male'
              : 'Female'
            : 'Male',
          nationality: action.nationality,
          idType: action.idName,
        },
        addressInfo: {
          ...state.formValues?.addressInfo,
        },
      },
    };
  }),

  on(RedirectActions.recoveryIdCheck, (state: any, action) => {
    if (action.status == true) {
      return {
        ...state,
        formValues: {
          ...state.formValues,
          personalInfo: {
            ...state.formValues?.personalInfo,
            firstName: action.firstName,
            middleName: action.middleName,
            lastName: action.lastName,
          },
        },
      };
    } else return { ...state };
  })
);
