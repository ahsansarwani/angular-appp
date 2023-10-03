import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUnliappComponent } from './select-unliapp.component';

describe('SelectUnliappComponent', () => {
  let component: SelectUnliappComponent;
  let fixture: ComponentFixture<SelectUnliappComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectUnliappComponent]
    });
    fixture = TestBed.createComponent(SelectUnliappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
