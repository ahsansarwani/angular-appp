import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberRatingComponent } from './number-rating.component';

describe('NumberRatingComponent', () => {
  let component: NumberRatingComponent;
  let fixture: ComponentFixture<NumberRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberRatingComponent]
    });
    fixture = TestBed.createComponent(NumberRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
