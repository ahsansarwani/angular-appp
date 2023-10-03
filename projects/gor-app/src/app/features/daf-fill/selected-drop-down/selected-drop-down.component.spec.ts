import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedDropDownComponent } from './selected-drop-down.component';

describe('SelectedDropDownComponent', () => {
  let component: SelectedDropDownComponent;
  let fixture: ComponentFixture<SelectedDropDownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedDropDownComponent]
    });
    fixture = TestBed.createComponent(SelectedDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
