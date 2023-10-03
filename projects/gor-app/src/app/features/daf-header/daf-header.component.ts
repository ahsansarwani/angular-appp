import { Component, Input } from '@angular/core';

@Component({
  selector: 'gor-daf-header',
  templateUrl: './daf-header.component.html',
  styleUrls: ['./daf-header.component.scss'],
})
export class DafHeaderComponent {
  @Input() index = 0;
  @Input() steps: any = [
    {
      no: 1,
      stepDesc:
        'Please provide your ID for verification and registration purposes.',
    },
  ];
}
