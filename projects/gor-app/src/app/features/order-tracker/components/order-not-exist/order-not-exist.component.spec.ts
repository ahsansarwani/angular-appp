import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderNotExistComponent } from './order-not-exist.component';

describe('OrderNotExistComponent', () => {
  let component: OrderNotExistComponent;
  let fixture: ComponentFixture<OrderNotExistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderNotExistComponent]
    });
    fixture = TestBed.createComponent(OrderNotExistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
