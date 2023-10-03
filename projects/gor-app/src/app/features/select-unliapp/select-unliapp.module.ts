import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectUnliappRoutingModule } from './select-unliapp-routing.module';
import { SelectUnliappComponent } from './select-unliapp.component';
import { SharedModule } from '../shared/shared.module';
import { SelectedPlanComponent } from '../shared/components/selected-plan/selected-plan.component';
import { PbButtonComponent } from '../shared/components/pb-button/pb-button.component';

@NgModule({
  declarations: [SelectUnliappComponent],
  imports: [
    CommonModule,
    SelectUnliappRoutingModule,
    SharedModule,
    SelectedPlanComponent,
    PbButtonComponent,
  ],
})
export class SelectUnliappModule {}
