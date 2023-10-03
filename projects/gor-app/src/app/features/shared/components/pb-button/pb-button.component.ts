import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gor-pb-button',
  standalone: true,
  templateUrl: './pb-button.component.html',
  styleUrls: ['./pb-button.component.scss'],
})
export class PbButtonComponent {
  @Input() height = 10;
  @Input() width = 10;
  @Input() buttonText = 'click';
  @Input() disabled = true;
  @Output() clickedProceed = new EventEmitter<boolean>();

  clickMethod() {
    this.clickedProceed.emit(true);
  }
}
