import { DAFFillState } from '../features/daf-fill/state/daf-fill.model';
import { DafReviewState } from '../features/daf-review/state/daf-review.model';
import { DAFScanState } from '../features/daf-scan/state/daf-scan.model';
import { EligibilityState } from '../features/eligibility/state/eligibility.model';
import { OtpState } from '../features/otp/state/otp.reducer';
import {
  CustomerTypeState,
  LobState,
  PlanState,
} from '../features/plan-selector/state/plan-selector.model';
import { RedirectState } from '../features/redirect/state/redirect.model';
import { OrderState } from '../features/submit-order/state/submit-order.model';

export interface AppState {
  otp?: OtpState | undefined;
  customerType?: CustomerTypeState | undefined;
  plan?: PlanState | undefined;
  redirect?: RedirectState | undefined;
  dafFill?: DAFFillState;
  dafReview?: DafReviewState;
  dafScan?: DAFScanState;
  eligibility?: EligibilityState;
  chat?: ChatState | undefined;
  lob?: LobState | undefined;
  order?: OrderState;
}

export interface ErrorResponse {
  error: {
    message: string;
    details: string;
    status?: number;
  };
}
export interface SuccessResponse {
  data: any;
}
export interface ChatState {
  token?: string;
  tokenTime?: Date;
  initState?: boolean;
  tokenInit?: boolean;
}
export interface ErrorState {
  scenario?: string;
  description?: string;
  status?: boolean;
}
