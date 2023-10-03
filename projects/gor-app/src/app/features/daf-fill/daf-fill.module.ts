import { NgModule } from '@angular/core';

import { DafFillRoutingModule } from './daf-fill-routing.module';
import { DafFillComponent } from './daf-fill.component';
import {
  MatFormFieldModule,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FillDropDownComponent } from './fill-drop-down/fill-drop-down.component';
import { FillInputComponent } from './fill-input/fill-input.component';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { dafFillReducer } from './state/daf-fill.reducer';
import { DAFFillEffects } from './state/daf-fill.effects';
import { DAFFillService } from './state/daf-fill.service';
import { EmailValidators } from './state/daf-fill.validator';
import { ChangePlanSelectorComponent } from '../shared/components/change-plan-selector/change-plan-selector.component';
import { PbButtonComponent } from '../shared/components/pb-button/pb-button.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SelectedDropDownComponent } from './selected-drop-down/selected-drop-down.component';

@NgModule({
  declarations: [
    DafFillComponent,
    FillDropDownComponent,
    FillInputComponent,
    SelectedDropDownComponent,
  ],
  imports: [
    ChangePlanSelectorComponent,
    PbButtonComponent,
    DafFillRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
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
export class DafFillModule {}
