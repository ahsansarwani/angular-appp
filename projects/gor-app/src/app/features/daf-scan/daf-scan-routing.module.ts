import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DafComponent } from './daf-scan.component';

const routes: Routes = [
  {
    path: '',
    component: DafComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DafRoutingModule {}
