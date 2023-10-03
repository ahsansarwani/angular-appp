import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZolozCheckErrorComponent } from './zoloz-check-error.component';

describe('ZolozCheckErrorComponent', () => {
  let component: ZolozCheckErrorComponent;
  let fixture: ComponentFixture<ZolozCheckErrorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZolozCheckErrorComponent],
    });
    fixture = TestBed.createComponent(ZolozCheckErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
