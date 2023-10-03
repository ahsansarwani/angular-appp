import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'projects/gor-app/src/environments/environment';
import { CommonModule } from '@angular/common';
import {
  tags_creditLimit,
  toRoute,
} from 'projects/gor-app/src/app/globals/redirection-links';
import { routerGuard } from 'projects/gor-app/src/app/app-state/router.guard';
import { customerType } from '../../../plan-selector/state/plan-selector.actions';
import { FTA_ADVERSE_FINDING } from 'projects/gor-app/src/app/globals/gtm-events/plan-selector/events';
import { CustomerTypeState } from '../../../plan-selector/state/plan-selector.model';
import { select, Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { customerTypeSelect } from '../../../plan-selector/state/plan-selector.selectors';
import { GoogleTagManagerService } from 'projects/gor-app/src/app/app-state/gtm.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'gor-error-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss'],
})
export class ErrorPageComponent {
  errorObject: any | undefined;

  url: string;
  homeUrl: string = environment.homeUrl;
  customerType$: Observable<any>;
  constructor(
    private router: Router,
    private customer: Store<CustomerTypeState>,
    private gtmService: GoogleTagManagerService,
    private meta: Meta,
    private title: Title
  ) {
    this.url = router.url;

    if (this.url === toRoute.errorIdMismatch) {
      //set meta
      this.meta.addTags([
        { name: 'description', content: tags_creditLimit.description },
      ]);
      this.title.setTitle(tags_creditLimit.title);
      //
    }

    // console.log('URL is ', this.url);
    this.customerType$ = this.customer.pipe(select(customerTypeSelect));
  }
  async ngOnInit() {
    const customerType = await firstValueFrom(this.customerType$);
    if (this.url === toRoute.error) {
      this.errorObject = {
        errorTextHeader: 'We found a problem with your application.',
        errorTextContent: `Please expect a call from us soon to discuss how we can help and provide any assistance in completing your application.`,
        linkText: 'Go To Home',
        hasTextDecoration: false,
        linkRedirectTo: environment.homeUrl,
      };
    } else if (this.url === toRoute.errorCreditLimit) {
      this.errorObject = {
        errorTextHeader: 'Oh no!',
        errorTextContent:
          'We’re sorry to let you know that you’re not eligible for this plan due to insufficient credit limit. Please visit our nearest store for assistance.',
        linkText: 'Click to locate nearest store',
        linkRedirectTo: 'https://www.globe.com.ph/help/store-locator.html',
        buttonText: 'Okay',
        hasTextDecoration: true,
      };
    } else if (this.url === toRoute.errorMaximumAttemptsReached) {
      this.errorObject = {
        errorTextHeader: 'Oh no!',
        errorTextContent:
          'You have reached the maximum number of attempts. Please try again later.',
        linkText: '',
        buttonText: 'Go back to home',
        hasTextDecoration: false,
        buttonRedirectTo: environment.homeUrl,
        headerStyle:'header-style',
        contentStyle:'content-style',
        buttonStyle:'button-style'
      };
    } else if (this.url === toRoute.errorIdMismatch) {
      this.errorObject = {
        errorTextHeader: 'Oh snap!',
        errorTextContent:
          'Sorry, the ID you have submitted does not match your info. To ensure this account belongs to you, please share a valid ID that matches your account information.',
        linkText: '',
        buttonText: 'Retry',
        hasTextDecoration: false,
        buttonRedirectTo: toRoute.uploadId,
        redirectAngular: true,
        headerStyle:'header-style',
        contentStyle:'content-style',
        buttonStyle:'button-style'
      };
    } else if (this.url === toRoute.errorRecovery) {
      this.errorObject = {
        errorTextHeader: 'Oh no!',
        errorTextContent:
          'We are sorry, but something went wrong. Please try again later',
        linkText: '',
        buttonText: 'Go back to home',
        hasTextDecoration: false,
        buttonRedirectTo: environment.homeUrl,
        headerStyle:'header-style',
        contentStyle:'content-style',
        buttonStyle:'button-style'
      };
    }
  }

  buttonRedirection(redirectionLink: any, withinAngular: any) {
    console.log('I was clicked !!!');
    const router = this.router;
    if (withinAngular == undefined) {
      location.href = redirectionLink;
    } else {
      router.navigate([redirectionLink]);
    }
  }

  linkRedirection(link: any) {
    console.log('Link  clicked');
    location.href = link;
  }
}
