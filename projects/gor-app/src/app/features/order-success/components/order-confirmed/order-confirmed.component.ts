import { Component, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { select, Store } from '@ngrx/store';
import { OrderState } from '../../../submit-order/state/submit-order.model';
import { Observable } from 'rxjs';
import { orderIdSelector } from '../../../submit-order/state/submit-order.selectors';
import { environment } from 'projects/gor-app/src/environments/environment';
import { LobState } from '../../../plan-selector/state/plan-selector.model';
import { lobState } from '../../../plan-selector/state/plan-selector.selectors';
import { Router } from '@angular/router';
import { allRoutes } from 'projects/gor-app/src/app/globals/redirection-links';
import { PlanSelectorService } from '../../../plan-selector/state/plan-selector.service';

@Component({
  selector: 'gor-order-confirmed',
  templateUrl: './order-confirmed.component.html',
  styleUrls: ['./order-confirmed.component.scss'],
})
export class OrderConfirmedComponent {
  @Input() inTouch = true;
  @Input() expectTitle = 'Expect an email';
  @Input() expectDesc = "You'll receive an email regarding your order.";
  @Input() statusText = 'Success!';
  //@Input() statusDescDesktop = 'Your application is now complete.';
  @Input() statusDesc = 'Your application is now complete.';
  @Input() statusSvg = 'assets/images/svg/fill-tick.svg';
  @Input() statusColor = '#00A441';
  @Input() tellYourFriends = false;
  @Input() breadCrumbs = false;
  @Input() orderSuccessTitle = '';
  @Input() statusSvgDesktop: any;
  @Input() expectDescriptionDesktop: any;
  @Input() thankyouDesktop: any;
  @Input() svgDesktop: any;
  orderId$: Observable<string>;
  url = environment.superAppUrl;
  // orderSuccessTitle = 'Order Confirmed';
  reference = {
    text: 'Reference ID',
    id: 'GLS-1234567890',
  };
  lob$: Observable<string | undefined>;
  statusIconDesktop: string | undefined;
  footerDescriptionDesktop: string | undefined;
  showAppGallery: boolean | undefined;
  statusDescriptionDesktop: string | undefined;
  deviceType: any;

  constructor(
    private clipboard: Clipboard,
    private orderStore: Store<OrderState>,
    private lobStore: Store<LobState>,
    private service: PlanSelectorService,
    router: Router
  ) {
    this.lob$ = this.lobStore.pipe(select(lobState));
    this.orderId$ = this.orderStore.pipe(select(orderIdSelector));
    this.deviceType = this.service.getDeviceType();
    console.log(router.url);
    if (router.url == '/' + allRoutes.orderSuccess) {
      this.statusIconDesktop = 'assets/desktop_order_success_icon.svg';
      this.footerDescriptionDesktop =
        'Pay your bills and add subscriptions using the New Globe One app and enjoy convenient and real-time payment posting. ';
      this.statusDescriptionDesktop = 'Your application is now complete.';
    } else if (router.url == '/' + allRoutes.orderOffline) {
      this.showAppGallery = true;
      this.statusDescriptionDesktop =
        'We’ll notify you for the next steps of your application.';
      this.statusIconDesktop = 'assets/images/svg/be-in-touch.svg';
      this.footerDescriptionDesktop =
        'Globe One app is the ultimate digital companion for your life on-the-go. Manage your Globe and TM accounts, track your data usage, earn rewards, enjoy exclusive perks, and many more in just few taps.';
    }
  }

  onCopy(textToCopy: string) {
    this.clipboard.copy(textToCopy);
  }

  onCopyId() {
    this.orderId$.subscribe(val => {
      this.clipboard.copy(val);
    });
  }
  redirectToLink() {
    window.location.href = 'https://apps.apple.com/PH/app/id1555659963?mt=8';
  }

  cards = [
    {
      icon: 'assets/images/svg/data.svg',
      id: 'data',
      title: 'Monitor your data usage',

      // desc: 'Track your call, text, and data consumption',
      desc: 'Keep track of how much data you are consuming.',
      desc2: 'Keep track of how much data you are consuming.',
    },
    {
      id: 'gift',
      title: 'Avail exclusive promos',
      desc: 'Get the best deals from the Globe One Shop. Enjoy exclusive gifts and discounts.',
      desc2:
        'Get the best deals from the Globe One Shop. Enjoy exclusive gifts and discounts.',
      icon: 'assets/images/svg/gift.svg',
    },
    {
      id: 'reward',
      title: 'Redeem rewards',
      desc: "Don't miss out on digital freebies, discount vouchers, raffle entries and more with Globe Rewards",
      desc2:
        "Don't miss out on digital freebies, discount vouchers, raffle entries and more with Globe Rewards",
      icon: 'assets/images/svg/reward.svg',
    },

    {
      id: 'transcript',
      title: 'Pay your first bill hassle free',
      desc: 'Pay Your Bills Anytime, Anywhere. Enjoy hassle-free payments using the Pay Bill.',
      desc2:
        'Pay Your Bills Anytime, Anywhere. Enjoy hassle-free payments using the Pay Bill.',
      icon: 'assets/images/svg/transcript.svg',
    },
  ];
}
