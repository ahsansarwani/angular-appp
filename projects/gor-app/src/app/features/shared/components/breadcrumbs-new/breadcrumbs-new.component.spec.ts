import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsNewComponent } from './breadcrumbs-new.component';

describe('BreadcrumbsNewComponent', () => {
  let component: BreadcrumbsNewComponent;
  let fixture: ComponentFixture<BreadcrumbsNewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbsNewComponent]
    });
    fixture = TestBed.createComponent(BreadcrumbsNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
