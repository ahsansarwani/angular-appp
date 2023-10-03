import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toRoute } from 'projects/gor-app/src/app/globals/redirection-links';

@Component({
  selector: 'gor-breadcrumbs-new',
  templateUrl: './breadcrumbs-new.component.html',
  styleUrls: ['./breadcrumbs-new.component.scss'],
})
export class BreadcrumbsNewComponent implements OnInit {
  alt = 'bread crumb seperator';
  url: any;
  breadcrumbDivider: any = 'assets/forwar-icon.svg';
  breadcrumbDivider2 = 'assets/forward-icon-highlighted.svg';
  unliUrl: string = toRoute.selectUnli;
  personalInfoOffline: string = toRoute.offlineDaf;
  personalInfo: string = toRoute.daf;
  constructor(router: Router) {
    this.url = router.url;
    console.log('URL is ', this.url);
  }
  ngOnInit(): void {
    // if (this.url === toRoute.selectUnli) {
    this.breadcrumbDivider = 'assets/forwar-icon.svg';
    // }
    //  else {
    //   this.breadcrumbDivider = 'assets/forward-icon-highlighted.svg';
    // }
  }
}
