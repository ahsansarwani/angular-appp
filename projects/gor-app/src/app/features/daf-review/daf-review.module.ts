import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DafReviewRoutingModule } from './daf-review-routing.module';
import { DafReviewComponent } from './daf-review.component';
import { ErrorPageComponent } from '../shared/components/error-page/error-page.component';
import { SharedModule } from '../shared/shared.module';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { PromoCodeComponent } from './components/promo-code/promo-code.component';
import { TermsAndConditionsComponent } from './components/terms-and-conditions/terms-and-conditions.component';
import { PayTodayComponent } from './components/pay-today/pay-today.component';
import { UpcomingBillComponent } from './components/upcoming-bill/upcoming-bill.component';
import { PaymentModeComponent } from './components/payment-mode/payment-mode.component';
import { ReviewDetailsComponent } from './components/review-details/review-details.component';
import { StoreModule } from '@ngrx/store';
import { dafReviewReducer } from './state/daf-review.reducer';
import { SvgArrowUpComponent } from './assets/svg-arrow-up/svg-arrow-up.component';
import { SvgArrowUpV2Component } from './assets/svg-arrow-up-v2/svg-arrow-up-v2.component';
import { SvgDeliveryComponent } from './assets/svg-delivery/svg-delivery.component';
import { SvgTimerComponent } from './assets/svg-timer/svg-timer.component';
import { SvgMobileComponent } from './assets/svg-mobile/svg-mobile.component';
import { SvgBroadbandComponent } from './assets/svg-broadband/svg-broadband.component';
import { ModalComponent } from '../shared/components/modal/modal-component.component';
import { EffectsModule } from '@ngrx/effects';
import { DAFReviewEffects } from './state/daf-review.effects';
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentCardComponent } from './components/payment-card/payment-card.component';
import { CardValidator } from './state/daf-review.validator';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { SafePipe } from './components/auth-modal/safe.pipe';
import { RetryModalComponent } from './components/retry-modal/retry-modal.component';
import { orderReducer } from '../submit-order/state/submit-order.reducer';

@NgModule({
  declarations: [
    DafReviewComponent,
    DeliveryComponent,
    PromoCodeComponent,
    TermsAndConditionsComponent,
    PayTodayComponent,
    UpcomingBillComponent,
    PaymentModeComponent,
    ReviewDetailsComponent,
    SvgArrowUpComponent,
    SvgArrowUpV2Component,
    SvgDeliveryComponent,
    SvgTimerComponent,
    SvgMobileComponent,
    SvgBroadbandComponent,
    PaymentCardComponent,
    AuthModalComponent,
    SafePipe,
    RetryModalComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DafReviewRoutingModule,
    SharedModule,
    StoreModule.forFeature('dafReview', dafReviewReducer),
    StoreModule.forFeature('order', orderReducer),
    EffectsModule.forFeature([DAFReviewEffects]),
  ],
  providers: [CardValidator],
})
export class DafReviewModule {}
