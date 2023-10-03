import { Component } from '@angular/core';

@Component({
  selector: 'gor-download-globe',
  templateUrl: './download-globe.component.html',
  styleUrls: ['./download-globe.component.scss'],
})
export class DownloadGlobeComponent {
  title = 'Download the GlobeOne App Today';
  details = `Enroll your new postpaid line in Globe One and manage your account all
in one app.`;

  cards = [
    {
      icon: 'assets/images/svg/data.svg',
      id: 'data',
      title: 'Monitor your Data Usage',

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
