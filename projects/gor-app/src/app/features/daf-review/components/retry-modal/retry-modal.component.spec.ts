import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetryModalComponent } from './retry-modal.component';

describe('RetryModalComponent', () => {
  let component: RetryModalComponent;
  let fixture: ComponentFixture<RetryModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetryModalComponent],
    });
    fixture = TestBed.createComponent(RetryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
