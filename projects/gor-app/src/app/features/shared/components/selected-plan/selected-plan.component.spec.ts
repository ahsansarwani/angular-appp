import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedPlanComponent } from './selected-plan.component';

describe('SelectedPlanComponent', () => {
  let component: SelectedPlanComponent;
  let fixture: ComponentFixture<SelectedPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedPlanComponent]
    });
    fixture = TestBed.createComponent(SelectedPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
