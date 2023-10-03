import { Component } from '@angular/core';
import { GoogleTagManagerService } from './app-state/gtm.service';
@Component({
  selector: 'gor-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'gor-app';

  constructor(private gtmService: GoogleTagManagerService) {}

  ngOnInit() {
    try {
      this.gtmService.init();
    } catch (ex) {}
  }
}
