import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DafHeaderComponent } from './daf-header.component';

describe('DafHeaderComponent', () => {
  let component: DafHeaderComponent;
  let fixture: ComponentFixture<DafHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DafHeaderComponent],
    });
    fixture = TestBed.createComponent(DafHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
