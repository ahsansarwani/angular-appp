import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingBillComponent } from './upcoming-bill.component';

describe('UpcomingBillComponent', () => {
  let component: UpcomingBillComponent;
  let fixture: ComponentFixture<UpcomingBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingBillComponent],
    });
    fixture = TestBed.createComponent(UpcomingBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
