import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeStepOtpBreadcrumbsComponent } from './three-step-otp-breadcrumbs.component';

describe('ThreeStepOtpBreadcrumbsComponent', () => {
  let component: ThreeStepOtpBreadcrumbsComponent;
  let fixture: ComponentFixture<ThreeStepOtpBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThreeStepOtpBreadcrumbsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeStepOtpBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
