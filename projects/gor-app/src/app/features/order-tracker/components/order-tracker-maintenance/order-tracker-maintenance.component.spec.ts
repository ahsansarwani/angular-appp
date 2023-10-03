import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTrackerMaintenanceComponent } from './order-tracker-maintenance.component';

describe('OrderTrackerMaintenanceComponent', () => {
  let component: OrderTrackerMaintenanceComponent;
  let fixture: ComponentFixture<OrderTrackerMaintenanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderTrackerMaintenanceComponent]
    });
    fixture = TestBed.createComponent(OrderTrackerMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
