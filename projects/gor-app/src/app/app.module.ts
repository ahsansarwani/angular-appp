import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule, ViewportScroller } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppEffects } from './app-state/app.effects';
import { otpReducer } from './features/otp/state/otp.reducer';
import { Router, Scroll } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  customerTypeReducer,
  lobReducer,
  userReducer,
} from './features/plan-selector/state/plan-selector.reducer';
import { planReducer } from './features/plan-selector/state/plan-selector.reducer';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ErrorPageComponent } from '../../src/app/features/shared/components/error-page/error-page.component';
import { SharedModule } from './features/shared/shared.module';
import {
  recoveryReducer,
  redirectReducer,
} from './features/redirect/state/redirect.reducer';
import {
  chatReducer,
  errorReducer,
  metaReducers,
} from './app-state/app.reducer';
import { FormsModule } from '@angular/forms';
import { eligibilityReducer } from './features/eligibility/state/eligibility.reducer';
import { dafReviewReducer } from './features/daf-review/state/daf-review.reducer';
import { GorFooterModule } from 'gor-footer';
import { GorHeaderModule } from 'gor-header';
import { dafScanReducer } from './features/daf-scan/state/daf-scan.reducer';
import { dafFillReducer } from './features/daf-fill/state/daf-fill.reducer';
import { ChatbotService } from './app-state/chat.service';
import { GoogleTagManagerService } from './app-state/gtm.service';
import { orderReducer } from './features/submit-order/state/submit-order.reducer';
import { OrderEffects } from './features/submit-order/state/submit-order.effects';
import { environment } from '../environments/environment';
import { NewLandingPageComponent } from './features/new-landing-page/new-landing-page.component';
import { orderTrackerReducer } from './features/order-tracker/state/order-tracker.reducer';
import { UrlService } from './app-state/url.service';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent, NewLandingPageComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    CoreModule,
    AppRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    StoreModule.forRoot(
      {
        otp: otpReducer,
        customerType: customerTypeReducer,
        plan: planReducer,
        lob: lobReducer,
        user: userReducer,
        chat: chatReducer,
        redirect: redirectReducer,
        eligibility: eligibilityReducer,
        dafReview: dafReviewReducer,
        dafScan: dafScanReducer,
        dafFill: dafFillReducer,
        order: orderReducer,
        orderTracker: orderTrackerReducer,
        recovery: recoveryReducer,
        error: errorReducer,
      },
      { metaReducers }
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([AppEffects]),
    GorFooterModule,
    GorHeaderModule.forRoot({
      oneApiUrl: environment.homeUrl,
      source: 'gor',
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [ChatbotService, GoogleTagManagerService, StoreModule, UrlService],
  bootstrap: [AppComponent],
})
export class AppModule {
  
}
