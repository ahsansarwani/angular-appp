import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EligibilityComponent } from './eligibility.component';

const routes: Routes = [{ path: '', component: EligibilityComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EligibilityRoutingModule {}
