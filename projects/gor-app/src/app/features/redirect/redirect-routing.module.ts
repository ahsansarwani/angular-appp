import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentComponent } from './components/payment/payment.component';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { ZolozCheckErrorComponent } from './components/zoloz-check-error/zoloz-check-error.component';
import { ZolozCheckComponent } from './components/zoloz-check/zoloz-check.component';
import { RedirectComponent } from './redirect.component';

const routes: Routes = [
  {
    path: '',
    component: RedirectComponent,
    children: [
      {
        path: 'verify-success',
        component: ZolozCheckComponent,
      },
      {
        path: 'verify-fail',
        component: ZolozCheckErrorComponent,
      },
      {
        path: 'payment',
        component: PaymentComponent,
      },
      {
        path: 'continue-your-journey',
        component: RecoveryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RedirectRoutingModule {}
