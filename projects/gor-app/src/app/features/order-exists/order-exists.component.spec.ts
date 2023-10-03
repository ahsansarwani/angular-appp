import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderExistsComponent } from './order-exists.component';

describe('OrderExistsComponent', () => {
  let component: OrderExistsComponent;
  let fixture: ComponentFixture<OrderExistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderExistsComponent],
    });
    fixture = TestBed.createComponent(OrderExistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
