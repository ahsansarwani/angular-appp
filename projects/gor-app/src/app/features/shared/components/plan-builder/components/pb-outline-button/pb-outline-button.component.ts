import { Component, Input } from '@angular/core';

@Component({
  selector: 'gor-pb-outline-button',
  templateUrl: './pb-outline-button.component.html',
  styleUrls: ['./pb-outline-button.component.scss'],
})
export class PbOutlineButtonComponent {
  @Input() buttonText = 'ok';
  @Input() height = 10;
  @Input() width = 10;
  @Input() disabled = false;
  @Input() clickMethod: any;

  onClick() {
    if (this.clickMethod) this.clickMethod();
  }
}
