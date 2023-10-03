import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderExistsRoutingModule } from './order-exists-routing.module';
import { OrderExistsComponent } from './order-exists.component';
import { DuplicateOrderComponent } from './duplicate-order/duplicate-order.component';
import { SharedModule } from '../shared/shared.module';
import { DuplicateProcessesComponent } from './duplicate-processes/duplicate-processes.component';

@NgModule({
  declarations: [
    OrderExistsComponent,
    DuplicateOrderComponent,
    DuplicateProcessesComponent,
    
    


  ],
  imports: [
    CommonModule,
    OrderExistsRoutingModule,
    SharedModule,

  ]
})
export class OrderExistsModule {}
