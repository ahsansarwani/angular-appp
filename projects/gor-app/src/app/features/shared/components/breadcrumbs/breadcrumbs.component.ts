import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CustomerTypeState } from '../../../plan-selector/state/plan-selector.model';
import { customerTypeSelect } from '../../../plan-selector/state/plan-selector.selectors';
import { toRoute } from 'projects/gor-app/src/app/globals/redirection-links';
@Component({
  selector: 'gor-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent {
  url: any;
  breadcrumbDivider: any;
  ctype: any;

  uploadId: string = toRoute.uploadId;
  review: string = toRoute.review;
  daf: string = toRoute.daf;
  offDaf: string = toRoute.offlineDaf;
  success: string = toRoute.orderSuccess;

  constructor(router: Router, private customerStore: Store<CustomerTypeState>) {
    this.url = router.url;
    console.log('URL is ', this.url);
    this.customerStore.pipe(select(customerTypeSelect)).subscribe(val => {
      this.ctype = val;
    });
  }
  ngOnInit() {
    if (this.url === toRoute.orderSuccess) {
      this.breadcrumbDivider =
        '../../../../../assets/order-success-divider.svg';
    } else {
      this.breadcrumbDivider = '../../../../../assets/breadcrumb_divider.svg';
    }
  }
}
