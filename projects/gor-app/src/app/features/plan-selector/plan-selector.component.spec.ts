import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanSelectorComponent } from './plan-selector.component';

describe('PlanSelectorComponent', () => {
  let component: PlanSelectorComponent;
  let fixture: ComponentFixture<PlanSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlanSelectorComponent],
    });
    fixture = TestBed.createComponent(PlanSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
