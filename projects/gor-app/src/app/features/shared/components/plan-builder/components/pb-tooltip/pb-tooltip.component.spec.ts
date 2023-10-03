import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PbTooltipComponent } from './pb-tooltip.component';

describe('PbTooltipComponent', () => {
  let component: PbTooltipComponent;
  let fixture: ComponentFixture<PbTooltipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PbTooltipComponent],
    });
    fixture = TestBed.createComponent(PbTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
