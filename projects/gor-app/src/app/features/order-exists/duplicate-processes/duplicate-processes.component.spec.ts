import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicateProcessesComponent } from './duplicate-processes.component';

describe('DuplicateProcessesComponent', () => {
  let component: DuplicateProcessesComponent;
  let fixture: ComponentFixture<DuplicateProcessesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuplicateProcessesComponent]
    });
    fixture = TestBed.createComponent(DuplicateProcessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
