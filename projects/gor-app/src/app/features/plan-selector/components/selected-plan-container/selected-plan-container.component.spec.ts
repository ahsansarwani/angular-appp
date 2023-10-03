import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedPlanContainerComponent } from './selected-plan-container.component';

describe('SelectedPlanContainerComponent', () => {
  let component: SelectedPlanContainerComponent;
  let fixture: ComponentFixture<SelectedPlanContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedPlanContainerComponent]
    });
    fixture = TestBed.createComponent(SelectedPlanContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
