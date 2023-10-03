import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DafSuccessRoutingModule } from './daf-success-routing.module';
import { DafSuccessComponent } from './daf-success.component';

@NgModule({
  declarations: [DafSuccessComponent],
  imports: [CommonModule, DafSuccessRoutingModule],
})
export class DafSuccessModule {}
