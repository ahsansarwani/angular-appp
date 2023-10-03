import { Component, Input } from '@angular/core';

@Component({
  selector: 'gor-fill-label',
  templateUrl: './fill-label.component.html',
  styleUrls: ['./fill-label.component.scss'],
})
export class FillLabelComponent {
  @Input() background = '';
  @Input() color = '';
  @Input() label = '';
  @Input() height = '';
}
