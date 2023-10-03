import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadGlobeComponent } from './download-globe.component';

describe('DownloadGlobeComponent', () => {
  let component: DownloadGlobeComponent;
  let fixture: ComponentFixture<DownloadGlobeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadGlobeComponent]
    });
    fixture = TestBed.createComponent(DownloadGlobeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
