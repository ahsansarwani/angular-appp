export interface AddressResponse {
  names?: string[];
  codes?: string[];
  postalCode?: string;
  area?: string;
}

export interface DAFFillState {
  isLoading: boolean;
  provinceList?: AddressResponse;
  cityList?: AddressResponse;
  barangayList?: AddressResponse;
  postalCode?: AddressResponse;
  formValues?: { personalInfo: any; addressInfo: any };
  formSubmitStatus?: boolean;
}
