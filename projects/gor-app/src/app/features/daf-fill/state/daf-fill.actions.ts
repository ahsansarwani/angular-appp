import { createAction, props } from '@ngrx/store';
import { AddressResponse } from './daf-fill.model';

export const getProvinceInit = createAction(
  '[DAF Fill Page] Get Province Init'
);

export const getProvinceSuccess = createAction(
  '[DAF Fill Page] Get Province Success',
  props<{ provinces: AddressResponse }>()
);

export const getProvinceFail = createAction(
  '[DAF Fill Page] Get Province Success'
);

export const getCityInit = createAction(
  '[DAF Fill Page] Get City Init',
  props<{ province: string }>()
);

export const getCitySuccess = createAction(
  '[DAF Fill Page] Get City Success',
  props<{ cities: AddressResponse }>()
);

export const getCityFail = createAction('[DAF Fill Page] Get City Fail');

export const getBarangayInit = createAction(
  '[DAF Fill Page] Get Barangay Init',
  props<{ city: string }>()
);

export const getBarangaySuccess = createAction(
  '[DAF Fill Page] Get Barangay Success',
  props<{ barangays: AddressResponse }>()
);

export const getBarangayFail = createAction(
  '[DAF Fill Page] Get Barangay Fail'
);

export const getPostalInit = createAction(
  '[DAF Fill Page] Get Postal Init',
  props<{ barangay: string }>()
);

export const getPostalSuccess = createAction(
  '[DAF Fill Page] Get Postal Success',
  props<{ postalCode: AddressResponse }>()
);

export const getPostalFail = createAction('[DAF Fill Page] Get Postal Fail');

export const formSubmitFta = createAction(
  '[DAF Fill Page] Form Submit FTA',
  props<{
    personalInfo: any;
    addressInfo: any;
    offlineMode: boolean;
    lob?: string;
  }>()
);

export const formSubmitAda = createAction(
  '[DAF Fill Page] Form Submit ADA',
  props<{ personalInfo: any; addressInfo: any }>()
);
