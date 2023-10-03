import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';
import { LoadingScreenComponent } from '../shared/components/loading-screen/loading-screen.component';

@NgModule({
  declarations: [PaymentComponent],
  imports: [CommonModule, LoadingScreenComponent, PaymentRoutingModule],
})
export class PaymentModule {}
