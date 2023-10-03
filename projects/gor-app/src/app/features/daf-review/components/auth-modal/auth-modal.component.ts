import { Component, Input } from '@angular/core';

@Component({
  selector: 'gor-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent {
  @Input() url = '';
  urlLink: any;

  ngOnChanges() {
    console.log('NG on changes auth modal');
  }
}
