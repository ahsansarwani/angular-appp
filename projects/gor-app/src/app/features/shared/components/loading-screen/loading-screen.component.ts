import { Component, Input } from '@angular/core';

@Component({
  selector: 'gor-loading-screen',
  standalone: true,
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})
export class LoadingScreenComponent {
  @Input() mainText = '';
  @Input() subText = '';
  @Input() svgPath = '';
}
