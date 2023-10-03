import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineDafComponent } from './offline-daf.component';

describe('OfflineDafComponent', () => {
  let component: OfflineDafComponent;
  let fixture: ComponentFixture<OfflineDafComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfflineDafComponent]
    });
    fixture = TestBed.createComponent(OfflineDafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
