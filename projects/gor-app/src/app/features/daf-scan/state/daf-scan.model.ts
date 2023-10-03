export interface DAFScanState {
  idNumber: string | undefined;
  idType: string | undefined;
  transactionId: string | undefined;
  clientCfg: string | undefined;
  idCheckInitStatus: boolean | undefined;
  idCheckInitRetryCount: number;
  idCheckInitSuccess: boolean | undefined;
  idCheckInitFail: boolean | undefined;
  idCheckResultStatus: boolean | undefined;
  idCheckResultRetryCount: number;
  idCheckResultSuccess: boolean | undefined;
  idCheckResultFail: boolean | undefined;
  nationalityList?: Countries[];
  idList?: IDs[];
  selectedNationality?: string;
  selectedId?: string;
  selectedIdName?: string;
}

export interface DAFInitResponse {
  transactionId: string;
  clientCfg: string;
}

export interface Countries {
  countryId: string;
  countryName: string;
}

export interface IDs {
  docName: string;
  docType: string;
}
