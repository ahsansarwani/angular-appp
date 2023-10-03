import { Component, Input } from '@angular/core';

@Component({
  selector: 'gor-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss'],
})
export class DeliveryComponent {
  @Input() delivery: any | undefined;
}
