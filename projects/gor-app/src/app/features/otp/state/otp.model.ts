export interface OtpResponse {
  referenceId?: string;
  error?: string;
}

// export interface OtpFailResponse {
//     error: string;
// }

export interface OtpRequest {
  mobileNo: string;
  categoryIdentifiers: ['RetrieveSubscriberDetails'];
}

export interface VerifyResponse {
  success: boolean;
}
