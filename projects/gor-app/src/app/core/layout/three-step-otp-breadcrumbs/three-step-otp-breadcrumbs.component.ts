import { Component, OnInit, Input } from '@angular/core';
// import { SeoLinkService } from 'src/app/core/service/seoLink.service';

@Component({
  selector: 'gor-three-step-otp-breadcrumbs',
  templateUrl: './three-step-otp-breadcrumbs.component.html',
  styleUrls: ['./three-step-otp-breadcrumbs.component.scss'],
})
export class ThreeStepOtpBreadcrumbsComponent {
  @Input() isMobile = false;

  private ctas: any;
  public fieldMessages!: any[];

  public firstCrumb = 'three_step_otp_breadcrums_first_crumb';
  public secondCrumb = 'three_step_otp_breadcrums_second_crumb';
  public thirdCrumb = 'three_step_otp_breadcrums_third_crumb';

  // private seoLinkService: SeoLinkService

  // ngOnInit(): void {
  // this.seoLinkService.getRouteData().subscribe((res) => {
  //   if (res.length) {
  //     const { field_google_analytics_events, field_messages } = res[1];
  //     // Configured Google Analaytics events
  //     this.ctas = field_google_analytics_events || '';
  //     // Defined drupal label keys
  //     this.fieldMessages = field_messages || '';
  //   }
  // });
  // }
}
