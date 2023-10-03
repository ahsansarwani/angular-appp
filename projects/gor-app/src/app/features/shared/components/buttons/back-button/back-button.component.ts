import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'gor-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
  constructor(private location: Location) {}
  onBack() {
    this.location.back();
  }
}
