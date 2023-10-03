import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbOutlineButtonComponent } from './pb-outline-button.component';

describe('PbOutlineButtonComponent', () => {
  let component: PbOutlineButtonComponent;
  let fixture: ComponentFixture<PbOutlineButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PbOutlineButtonComponent],
    });
    fixture = TestBed.createComponent(PbOutlineButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
