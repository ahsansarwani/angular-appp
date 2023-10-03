import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DafScanFormComponent } from './daf-scan-form.component';

describe('DafScanComponent', () => {
  let component: DafScanFormComponent;
  let fixture: ComponentFixture<DafScanFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DafScanFormComponent],
    });
    fixture = TestBed.createComponent(DafScanFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
