import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OfflineDafRoutingModule } from './offline-daf-routing.module';
import { OfflineDafComponent } from './offline-daf.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ChangePlanSelectorComponent } from '../shared/components/change-plan-selector/change-plan-selector.component';
import { PbButtonComponent } from '../shared/components/pb-button/pb-button.component';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DAFFillService } from '../daf-fill/state/daf-fill.service';
import { EmailValidators } from '../daf-fill/state/daf-fill.validator';
import { dafFillReducer } from '../daf-fill/state/daf-fill.reducer';
import { DAFFillEffects } from '../daf-fill/state/daf-fill.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [OfflineDafComponent],
  imports: [
    ChangePlanSelectorComponent,
    PbButtonComponent,
    CommonModule,
    OfflineDafRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule,
    StoreModule.forFeature('dafFill', dafFillReducer),
    EffectsModule.forFeature([DAFFillEffects]),
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { subscriptSizing: 'dynamic' },
    },
    DAFFillService,
    EmailValidators,
  ],
})
export class OfflineDafModule {}
