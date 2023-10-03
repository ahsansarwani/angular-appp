import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateOrderComponent } from './duplicate-order.component';

describe('DuplicateOrderComponent', () => {
  let component: DuplicateOrderComponent;
  let fixture: ComponentFixture<DuplicateOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuplicateOrderComponent],
    });
    fixture = TestBed.createComponent(DuplicateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
