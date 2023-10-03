import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextRatingComponent } from './text-rating.component';

describe('TextRatingComponent', () => {
  let component: TextRatingComponent;
  let fixture: ComponentFixture<TextRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextRatingComponent]
    });
    fixture = TestBed.createComponent(TextRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
