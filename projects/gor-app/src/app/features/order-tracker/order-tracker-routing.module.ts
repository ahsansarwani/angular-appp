import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderNotExistComponent } from './components/order-not-exist/order-not-exist.component';
import { OrderTrackerMaintenanceComponent } from './components/order-tracker-maintenance/order-tracker-maintenance.component';
import { OrderTrackerComponent } from './order-tracker.component';

const routes: Routes = [
  { path: '', component: OrderTrackerComponent },
  { path: 'error', component: OrderNotExistComponent },
  { path: 'maintenance', component: OrderTrackerMaintenanceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderTrackerRoutingModule { }
