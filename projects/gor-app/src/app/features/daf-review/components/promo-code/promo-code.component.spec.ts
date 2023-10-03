import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodeComponent } from './promo-code.component';

describe('PromoCodeComponent', () => {
  let component: PromoCodeComponent;
  let fixture: ComponentFixture<PromoCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromoCodeComponent],
    });
    fixture = TestBed.createComponent(PromoCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
