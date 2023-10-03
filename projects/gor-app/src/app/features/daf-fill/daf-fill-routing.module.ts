import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DafFillComponent } from './daf-fill.component';

const routes: Routes = [{ path: '', component: DafFillComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DafFillRoutingModule {}
