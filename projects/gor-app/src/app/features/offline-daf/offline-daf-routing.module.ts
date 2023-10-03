import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfflineDafComponent } from './offline-daf.component';

const routes: Routes = [{ path: '', component: OfflineDafComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OfflineDafRoutingModule { }
