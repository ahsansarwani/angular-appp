export interface CheckResultSuccess {
  ekycResult: string;
  ID_NUMBER?: string;
  FIRST_NAME?: string;
  LAST_NAME?: string;
  DATE_OF_BIRTH?: string;
  MIDDLE_NAME?: string;
  SEX?: string;
  EXPIRY_DATE?: string;
  ADDRESS?: string;
  REGISTRATION_DATE?: string;
  GENDER?: string;
  nationality?: string;
  idName?: string;
}

export interface CheckResultFail {
  error: {
    message: string;
    details: string;
  };
}

export interface RedirectState {
  ekycResult?: string;
  type?: string;
  verifyTime?: Date;
  ID_NUMBER: string | undefined;
  FIRST_NAME: string | undefined;
  LAST_NAME: string | undefined;
  DATE_OF_BIRTH: string | undefined;
  MIDDLE_NAME?: string;
  SEX?: string;
  EXPIRY_DATE?: string;
  ADDRESS?: string;
  REGISTRATION_DATE?: string;
  GENDER?: string;
}

export interface IDCheck {
  ID_NUMBER: string;
  FIRST_NAME: string;
  LAST_NAME: string;
  DATE_OF_BIRTH: string;
  MIDDLE_NAME?: string;
  SEX?: string;
  EXPIRY_DATE?: string;
  ADDRESS?: string;
  REGISTRATION_DATE?: string;
  GENDER?: string;
}

export interface RecoveryState {
  status?: boolean;
  recoveryIdCheck?: boolean;
}
