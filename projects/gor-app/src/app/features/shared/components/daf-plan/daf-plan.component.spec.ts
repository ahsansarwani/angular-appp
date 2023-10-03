import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DafPlanComponent } from './daf-plan.component';

describe('DafPlanComponent', () => {
  let component: DafPlanComponent;
  let fixture: ComponentFixture<DafPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DafPlanComponent],
    });
    fixture = TestBed.createComponent(DafPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
