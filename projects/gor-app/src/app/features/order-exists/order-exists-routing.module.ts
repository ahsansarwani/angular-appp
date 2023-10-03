import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderExistsComponent } from './order-exists.component';

const routes: Routes = [{ path: '', component: OrderExistsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderExistsRoutingModule {}
