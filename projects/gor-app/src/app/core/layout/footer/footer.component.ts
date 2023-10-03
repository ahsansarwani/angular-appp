import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { FLOW_IDS } from 'src/app/common/constants/app.constants';
// import { FIELDS } from 'src/app/common/constants/drupal.constants';
// import { EVENT, EVENT_ACTION, EVENT_CATEGORY } from 'src/app/common/constants/gtm.constants';
// import { GoogleTagManagerService } from 'src/app/core/service/angular-google-tag-manager.service';
// import { SeoLinkService } from 'src/app/core/service/seoLink.service';
import { FooterNav } from './state/footer/footer.model';
import { FooterNavQuery } from './state/footer/footer.query';
import { FooterService } from './state/footer/footer.service';
// import { DeviceTypeUtility } from 'src/app/Utility/deviceType.utility';

@Component({
  selector: 'gor-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public footerNav$!: Observable<FooterNav[]>;
  public footerRightNav$!: Observable<FooterNav[]>;
  // deviceTypeUtility: DeviceTypeUtility;
  flowId: any;
  ctas: any;
  fieldHideFooter!: boolean;
  currentYear!: number;

  constructor(
    private footerService: FooterService,
    private footerQuery: FooterNavQuery,
    private router: Router // private seoLinkService: SeoLinkService,
  ) // private gtmService: GoogleTagManagerService
  {
    // this.deviceTypeUtility = new DeviceTypeUtility();
  }

  ngOnInit(): void {
    this.footerService.getNav().subscribe();
    this.footerNav$ = this.footerQuery.selectAll({
      filterBy: (entity: any) => entity.attributes.parent === '',
    });
    this.footerService.getRightNav().subscribe();
    this.footerRightNav$ = this.footerQuery.selectAll({
      filterBy: (entity: any) => entity.attributes.parent === '',
    });
    // this.seoLinkService.getRouteData().subscribe((res) => {
    //   if (res) {
    //     this.ctas = this.seoLinkService.getCTAsByAttr(res, 1, FIELDS.GTM);
    //   }
    //   this.fieldHideFooter = res[1]?.field_hide_footer || '';
    // });

    // GO-10706: Display current year
    this.currentYear = new Date().getFullYear();
  }

  checkIsMobile(): boolean {
    // return this.deviceTypeUtility.determineIsMobileViewPort();
    // return true;
    return window.screen.width < 768;
    // return false;
  }

  getParentNav(nav: FooterNav[], side: string): FooterNav[] {
    return nav.filter(n => n.attributes.menu_name === side);
  }

  setActive(id: string): void {
    this.footerService.setNavActive(id);
  }

  checkRedirection(path: any, routeProperties: any, targetOptions: any): any {
    let target = '';
    if (targetOptions && targetOptions.attributes) {
      target = targetOptions.attributes.target
        ? targetOptions.attributes.target
        : '';
    }
    if (routeProperties.name === '') {
      if (typeof window !== 'undefined') {
        return { path, target, external: targetOptions.external };
      }
    } else if (routeProperties.name !== '' && target !== '_blank') {
      return { path, target, external: false };
    } else if (routeProperties.name !== '' && target === '_blank') {
      if (typeof window !== 'undefined') {
        const domainpath = window.location.origin + path;
        return { path: domainpath, target, external: targetOptions.external };
      }
    }
  }

  internalRedirect(path: string): void {
    this.router.navigate([path]);
  }

  selectFooterNavCaptureGTMEvent(navTitle: any) {
    this.captureGTMEvent({
      label: `Label=Footer-${navTitle?.replaceAll(/\s|-/g, '')}`,
    });
  }

  /* GOOGLE ANALYTICS */
  /* GTM: Capture the event information */
  captureGTMEvent(categoryDetails: any) {
    const categorySuffix = '';
    const htmlId = '';
    // this.flowId = this.seoLinkService.getFlowID(); //Update as footer is static

    // if (FLOW_IDS.ACQUI == this.flowId) {
    //   categorySuffix = '-Postpaid-Acquisition';
    //   htmlId = 'footerNavAqui';
    // } else if (FLOW_IDS.RENEWAL == this.flowId) {
    //   categorySuffix = '-Postpaid-Renewal';
    //   htmlId = 'footerNavRenewal';
    // }

    // const defaultCTA = [
    //   {
    //     field_html_element_id: htmlId,
    //     field_event_category: {
    //       name: `${EVENT_CATEGORY.CORE}${categorySuffix}`,
    //     },
    //     field_event_action: {
    //       name: EVENT_ACTION.NAVIGATION,
    //     },
    //   },
    // ];

    // let attr;
    // if (this.ctas && this.ctas.length && Array.isArray(this.ctas)) {
    //   attr = this.ctas.find((cta) => cta.field_html_element_id === htmlId);
    //   if (!attr) attr = defaultCTA.find((cta) => cta.field_html_element_id === htmlId);
    // } else {
    //   attr = defaultCTA.find((cta) => cta.field_html_element_id === htmlId);
    // }

    // let eventInfo = {
    //   userId: '',
    //   loggedIn: 'No',
    //   event: EVENT.PUSH_EVENT,
    //   label: categoryDetails.label,
    // };

    // this.gtmService.captureGTMEvent(attr, eventInfo);
  }
}
