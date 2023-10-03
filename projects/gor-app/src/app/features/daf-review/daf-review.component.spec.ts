import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DafReviewComponent } from './daf-review.component';

describe('DafReviewComponent', () => {
  let component: DafReviewComponent;
  let fixture: ComponentFixture<DafReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DafReviewComponent],
    });
    fixture = TestBed.createComponent(DafReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
