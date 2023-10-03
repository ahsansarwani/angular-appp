import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitOrderComponent } from './submit-order.component';

const routes: Routes = [{ path: '', component: SubmitOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmitOrderRoutingModule { }
