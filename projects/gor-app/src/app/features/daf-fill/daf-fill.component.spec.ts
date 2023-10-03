import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DafFillComponent } from './daf-fill.component';

describe('DafFillComponent', () => {
  let component: DafFillComponent;
  let fixture: ComponentFixture<DafFillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DafFillComponent],
    });
    fixture = TestBed.createComponent(DafFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
