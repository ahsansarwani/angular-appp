import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZolozCheckComponent } from './zoloz-check.component';

describe('ZolozCheckComponent', () => {
  let component: ZolozCheckComponent;
  let fixture: ComponentFixture<ZolozCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZolozCheckComponent],
    });
    fixture = TestBed.createComponent(ZolozCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
