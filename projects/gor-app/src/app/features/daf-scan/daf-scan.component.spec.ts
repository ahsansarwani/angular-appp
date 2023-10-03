import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DafComponent } from './daf-scan.component';

describe('DafComponent', () => {
  let component: DafComponent;
  let fixture: ComponentFixture<DafComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DafComponent],
    });
    fixture = TestBed.createComponent(DafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
