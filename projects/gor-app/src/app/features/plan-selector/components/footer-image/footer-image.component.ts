import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { Input } from '@angular/core';
@Component({
  selector: 'footer-image',
  templateUrl: './footer-image.component.html',
  styleUrls: ['./footer-image.component.scss'],
})
export class FooterImageComponent {
  @Input() deviceType: any;

  ngAfterViewInit() {
    console.log('Device type in footer : ', this.deviceType);
  }
}
