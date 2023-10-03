import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePlanSelectorComponent } from './change-plan-selector.component';

describe('ChangePlanSelectorComponent', () => {
  let component: ChangePlanSelectorComponent;
  let fixture: ComponentFixture<ChangePlanSelectorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePlanSelectorComponent],
    });
    fixture = TestBed.createComponent(ChangePlanSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
