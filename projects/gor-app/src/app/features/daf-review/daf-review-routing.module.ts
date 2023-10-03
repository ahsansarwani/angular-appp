import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DafReviewComponent } from './daf-review.component';

const routes: Routes = [{ path: '', component: DafReviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DafReviewRoutingModule {}
