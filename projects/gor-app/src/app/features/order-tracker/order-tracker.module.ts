import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderTrackerRoutingModule } from './order-tracker-routing.module';
import { OrderTrackerComponent } from './order-tracker.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { OrderTrackerService } from './state/order-tracker.service';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { orderTrackerReducer } from './state/order-tracker.reducer';
import { OrderTrackerEffect } from './state/order-tracker.effects';
import { OrderNotExistComponent } from './components/order-not-exist/order-not-exist.component';
import { OrderTrackerMaintenanceComponent } from './components/order-tracker-maintenance/order-tracker-maintenance.component';


@NgModule({
  declarations: [
    OrderTrackerComponent,
    OrderHistoryComponent,
    OrderDetailsComponent,
    OrderNotExistComponent,
    OrderTrackerMaintenanceComponent
  ],
  imports: [
    CommonModule,
    OrderTrackerRoutingModule,
    StoreModule.forFeature('orderTracker', orderTrackerReducer),
    EffectsModule.forFeature([OrderTrackerEffect]),
  ],
  providers: [OrderTrackerService],
})
export class OrderTrackerModule { }
