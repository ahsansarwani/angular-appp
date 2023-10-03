import { Component, Input } from '@angular/core';

@Component({
  selector: 'gor-promo-code',
  templateUrl: './promo-code.component.html',
  styleUrls: ['./promo-code.component.scss'],
})
export class PromoCodeComponent {
  @Input() promoCode: any | undefined;
}
