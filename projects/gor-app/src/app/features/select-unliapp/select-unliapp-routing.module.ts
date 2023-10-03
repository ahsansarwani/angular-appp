import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectUnliappComponent } from './select-unliapp.component';

const routes: Routes = [{ path: '', component: SelectUnliappComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SelectUnliappRoutingModule { }
