import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitOrderRoutingModule } from './submit-order-routing.module';
import { SubmitOrderComponent } from './submit-order.component';
import { LoadingScreenComponent } from '../shared/components/loading-screen/loading-screen.component';
import { OrderEffects } from './state/submit-order.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { orderReducer } from './state/submit-order.reducer';
import { OrderService } from './state/submit-order.service';

@NgModule({
  declarations: [SubmitOrderComponent],
  imports: [
    CommonModule,
    LoadingScreenComponent,
    SubmitOrderRoutingModule,
    StoreModule.forFeature('order', orderReducer),
    EffectsModule.forFeature([OrderEffects]),
  ],
  providers: [OrderService],
})
export class SubmitOrderModule {}
