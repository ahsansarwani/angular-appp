import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';
import { routerGuard } from './app-state/router.guard';
import { allRoutes } from './globals/redirection-links';

export const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled', // 'disabled' | 'enabled' | 'top',
};

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/plan-selector/plan-selector.module').then(
        m => m.PlanSelectorModule
      ),
  },
  {
    path: allRoutes.otp,
    loadChildren: () =>
      import('./features/otp/otp.module').then(m => m.OtpModule),
    canActivate: [routerGuard],
  },
  {
    path: allRoutes.uploadId,
    loadChildren: () =>
      import('./features/daf-scan/daf-scan.module').then(m => m.DafScanModule),
    canActivate: [routerGuard],
  },
  {
    path: allRoutes.eligibility,
    loadChildren: () =>
      import('./features/eligibility/eligibility.module').then(
        m => m.EligibilityModule
      ),
    canActivate: [routerGuard],
  },
  {
    path: allRoutes.daf,
    loadChildren: () =>
      import('./features/daf-fill/daf-fill.module').then(m => m.DafFillModule),
    canActivate: [routerGuard],
  },
  {
    path: allRoutes.review,
    loadChildren: () =>
      import('./features/daf-review/daf-review.module').then(
        m => m.DafReviewModule
      ),
    //canActivate: [routerGuard],
  },
  {
    path: allRoutes.redirect,
    loadChildren: () =>
      import('./features/redirect/redirect.module').then(m => m.RedirectModule),
  },
  {
    path: allRoutes.orderExists,
    loadChildren: () =>
      import('./features/order-exists/order-exists.module').then(
        m => m.OrderExistsModule
      ),
    canActivate: [routerGuard],
  },
  {
    path: allRoutes.orderSuccess,
    loadChildren: () =>
      import('./features/order-success/order-success.module').then(
        m => m.OrderSuccessModule
      ),
    canActivate: [routerGuard],
  },
  {
    path: allRoutes.orderOffline,
    loadChildren: () =>
      import('./features/order-success/order-success.module').then(
        m => m.OrderSuccessModule
      ),
    canActivate: [routerGuard],
  },
  {
    path: allRoutes.orderPaymentPending,
    loadChildren: () =>
      import('./features/order-success/order-success.module').then(
        m => m.OrderSuccessModule
      ),
    canActivate: [routerGuard],
  },
  {
    path: allRoutes.offlineDaf,
    loadChildren: () =>
      import('./features/offline-daf/offline-daf.module').then(
        m => m.OfflineDafModule
      ),
    canActivate: [routerGuard],
  },
  {
    path: allRoutes.error,
    loadComponent: () =>
      import(
        './features/shared/components/error-page/error-page.component'
      ).then(m => m.ErrorPageComponent),
    canActivate: [routerGuard],
  },
  {
    path: allRoutes.errorCreditLimit,
    loadComponent: () =>
      import(
        './features/shared/components/error-page/error-page.component'
      ).then(m => m.ErrorPageComponent),
    canActivate: [routerGuard],
  },
  {
    path: allRoutes.errorIdMismatch,
    loadComponent: () =>
      import(
        './features/shared/components/error-page/error-page.component'
      ).then(m => m.ErrorPageComponent),
    canActivate: [routerGuard],
  },
  {
    path: allRoutes.errorMaximumAttemptsReached,
    loadComponent: () =>
      import(
        './features/shared/components/error-page/error-page.component'
      ).then(m => m.ErrorPageComponent),
    canActivate: [routerGuard],
  },
  {
    path: allRoutes.errorRecovery,
    loadComponent: () =>
      import(
        './features/shared/components/error-page/error-page.component'
      ).then(m => m.ErrorPageComponent),
    canActivate: [routerGuard],
  },
  {
    path: allRoutes.submitOrder,
    loadChildren: () =>
      import('./features/submit-order/submit-order.module').then(
        m => m.SubmitOrderModule
      ),
    canActivate: [routerGuard],
  },
  {
    path: allRoutes.orderTracker,
    loadChildren: () =>
      import('./features/order-tracker/order-tracker.module').then(
        m => m.OrderTrackerModule
      ),
  },
  {
    path: allRoutes.selectUnli,
    loadChildren: () =>
      import('./features/select-unliapp/select-unliapp.module').then(
        m => m.SelectUnliappModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
