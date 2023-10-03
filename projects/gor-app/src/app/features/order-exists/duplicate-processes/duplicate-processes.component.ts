import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'gor-duplicate-processes',
  templateUrl: './duplicate-processes.component.html',
  styleUrls: ['./duplicate-processes.component.scss'],
})
export class DuplicateProcessesComponent {
  @Input() firstName = 'Cyrus';
  constructor(private _route: Router) {}
  goBack() {
    this._route.navigate(['/']);
  }
}
