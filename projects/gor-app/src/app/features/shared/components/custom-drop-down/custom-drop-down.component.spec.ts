import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDropDownComponent } from './custom-drop-down.component';

describe('CustomDropDownComponent', () => {
  let component: CustomDropDownComponent;
  let fixture: ComponentFixture<CustomDropDownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDropDownComponent]
    });
    fixture = TestBed.createComponent(CustomDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
