import { Injectable } from '@angular/core';
import {
  Router,
  RouterEvent,
  NavigationEnd,
  NavigationStart,
} from '@angular/router';

/** A router wrapper, adding extra functions. */
@Injectable()
export class UrlService {
  private previousUrl?: string = undefined;
  private currentUrl?: string = undefined;
  private isPopState = false;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Url service', this.currentUrl);
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {
          // Perform actions
          console.log('PopState !!!!!!');
          console.log(event.url);
          this.isPopState = true;
        } else {
          this.isPopState = false;
        }
      }
    });
  }

  public getPreviousUrl() {
    return this.currentUrl;
  }

  public isPopStateEvent() {
    return this.isPopState;
  }
}
