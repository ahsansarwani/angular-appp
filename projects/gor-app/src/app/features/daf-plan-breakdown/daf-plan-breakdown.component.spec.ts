import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DafPlanBreakdownComponent } from './daf-plan-breakdown.component';

describe('DafPlanBreakdownComponent', () => {
  let component: DafPlanBreakdownComponent;
  let fixture: ComponentFixture<DafPlanBreakdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DafPlanBreakdownComponent],
    });
    fixture = TestBed.createComponent(DafPlanBreakdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
