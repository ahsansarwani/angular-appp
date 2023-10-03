import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterImageComponent } from './footer-image.component';

describe('FooterImageComponent', () => {
  let component: FooterImageComponent;
  let fixture: ComponentFixture<FooterImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterImageComponent]
    });
    fixture = TestBed.createComponent(FooterImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
