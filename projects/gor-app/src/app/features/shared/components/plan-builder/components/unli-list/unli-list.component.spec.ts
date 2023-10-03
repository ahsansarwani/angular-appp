import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnliListComponent } from './unli-list.component';

describe('UnliListComponent', () => {
  let component: UnliListComponent;
  let fixture: ComponentFixture<UnliListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnliListComponent],
    });
    fixture = TestBed.createComponent(UnliListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
