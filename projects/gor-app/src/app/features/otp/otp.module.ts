import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OtpRoutingModule } from './otp-routing.module';
import { OtpComponent } from './otp.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { otpReducer } from './state/otp.reducer';
import { OtpEffects } from './state/otp.effects';
import { OtpService } from './state/otp.service';
import { SharedModule } from '../shared/shared.module';
import { AllownumbersonlyDirective } from '../../allownumbersonly.directive';

@NgModule({
  declarations: [OtpComponent, AllownumbersonlyDirective],
  imports: [
    OtpRoutingModule,

    FormsModule,
    StoreModule.forFeature('otp', otpReducer),
    EffectsModule.forFeature([OtpEffects]),
    SharedModule,
  ],
  providers: [OtpService],
})
export class OtpModule {}
