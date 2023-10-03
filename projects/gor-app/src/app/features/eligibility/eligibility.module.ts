import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EligibilityRoutingModule } from './eligibility-routing.module';
import { EligibilityComponent } from './eligibility.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { eligibilityReducer } from './state/eligibility.reducer';
import { EligibilityEffects } from './state/eligibility.effects';
import { EligibilityService } from './state/eligibility.service';
import { SharedModule } from '../shared/shared.module';
import { ModalComponent } from '../shared/components/modal/modal-component.component';
import { DAFReviewEffects } from '../daf-review/state/daf-review.effects';
import { dafReviewReducer } from '../daf-review/state/daf-review.reducer';
import { CardValidator } from '../daf-review/state/daf-review.validator';

@NgModule({
  declarations: [EligibilityComponent],
  imports: [
    CommonModule,
    EligibilityRoutingModule,
    SharedModule,
    StoreModule.forFeature('eligibility', eligibilityReducer),
    StoreModule.forFeature('dafReview', dafReviewReducer),
    EffectsModule.forFeature([EligibilityEffects, DAFReviewEffects]),
  ],
  providers: [EligibilityService, CardValidator],
})
export class EligibilityModule {}
