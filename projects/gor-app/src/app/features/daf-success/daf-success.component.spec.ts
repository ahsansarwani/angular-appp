import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DafSuccessComponent } from './daf-success.component';

describe('DafSuccessComponent', () => {
  let component: DafSuccessComponent;
  let fixture: ComponentFixture<DafSuccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DafSuccessComponent],
    });
    fixture = TestBed.createComponent(DafSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
