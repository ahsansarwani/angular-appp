import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdModalComponent } from './id-modal.component';

describe('IdModalComponent', () => {
  let component: IdModalComponent;
  let fixture: ComponentFixture<IdModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IdModalComponent],
    });
    fixture = TestBed.createComponent(IdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
