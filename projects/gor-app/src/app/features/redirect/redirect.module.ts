import { NgModule } from '@angular/core';
import { RedirectRoutingModule } from './redirect-routing.module';
import { RedirectComponent } from './redirect.component';
import { ZolozCheckComponent } from './components/zoloz-check/zoloz-check.component';
import { ZolozCheckErrorComponent } from './components/zoloz-check-error/zoloz-check-error.component';
import { SharedModule } from '../shared/shared.module';
import { recoveryReducer, redirectReducer } from './state/redirect.reducer';
import { RedirectEffects } from './state/redirect.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RedirectService } from './state/redirect.service';
import { LoadingScreenComponent } from '../shared/components/loading-screen/loading-screen.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderService } from '../submit-order/state/submit-order.service';
import { OrderEffects } from '../submit-order/state/submit-order.effects';
import { orderReducer } from '../submit-order/state/submit-order.reducer';
import { RecoveryComponent } from './components/recovery/recovery.component';
import { PlanSelectorService } from '../plan-selector/state/plan-selector.service';
@NgModule({
  declarations: [
    RedirectComponent,
    ZolozCheckComponent,
    ZolozCheckErrorComponent,
    PaymentComponent,
    RecoveryComponent,
  ],
  imports: [
    SharedModule,
    LoadingScreenComponent,
    RedirectRoutingModule,
    StoreModule.forFeature('redirect', redirectReducer),
    StoreModule.forFeature('order', orderReducer),
    StoreModule.forFeature('recovery', recoveryReducer),
    EffectsModule.forFeature([RedirectEffects, OrderEffects]),
  ],
  providers: [RedirectService, OrderService, PlanSelectorService],
})
export class RedirectModule {}
