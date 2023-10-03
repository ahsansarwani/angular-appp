import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'gor-app-icons',
  templateUrl: './app-icons.component.html',
  styleUrls: ['./app-icons.component.scss'],
})
export class AppIconsComponent {
  @Output() selectedApp = new EventEmitter<any>();
  selectedIndex = -1;
  app: any = null;
  onAppClick(value: any, i: number) {
    console.log(value);
    if (this.selectedIndex === i) {
      this.selectedIndex = -1;
      this.app = null;
      this.selectedApp.emit(false);
    } else {
      this.selectedIndex = i;
      this.app = value;
      this.selectedApp.emit(value);
    }
  }
  isSelected = false;

  listOfApps = [
    {
      id: 'youtube',

      nameOfApp: 'youtube',
      svgPath: 'assets/images/svg/youtube.svg',

      altText: 'youtube SVG Image',
    },
    {
      id: 'tiktok',
      nameOfApp: 'tiktok',

      svgPath: 'assets/images/svg/tiktok.svg',
      altText: 'tiktok SVG Image',
    },

    {
      id: 'facebook',
      nameOfApp: 'facebook',
      svgPath: 'assets/images/svg/facebook.svg',
      altText: 'facebook SVG Image',
    },
    {
      id: 'instagram',
      nameOfApp: 'instagram',
      svgPath: 'assets/images/svg/instagram.svg',
      altText: 'instagram SVG Image',
    },

    {
      id: 'spotify',
      nameOfApp: 'spotify',
      svgPath: 'assets/images/svg/spotify.svg',
      altText: 'spotify SVG Image',
    },
    {
      id: 'twitter',
      nameOfApp: 'twitter',
      svgPath: 'assets/images/svg/twitter.svg',
      altText: 'twitter SVG Image',
    },

    {
      id: 'mobile-legends',
      nameOfApp: 'mobile legends',
      svgPath: 'assets/images/svg/mobile-legends.svg',
      altText: 'mobile legends SVG Image',
    },
    {
      id: 'mihoyu',
      nameOfApp: 'mihoyu',
      svgPath: 'assets/images/svg/mihoyu.svg',
      altText: 'mihoyu SVG Image',
    },
    {
      id: 'pokemon',
      nameOfApp: 'pokemon',
      svgPath: 'assets/images/svg/pokemon.svg',
      altText: 'pokemon SVG Image',
    },
    {
      id: 'fortnite',
      nameOfApp: 'fortnite',
      svgPath: 'assets/images/svg/fortnite.svg',
      altText: 'fortnite SVG Image',
    },
    {
      id: 'cod',
      nameOfApp: 'cod',
      svgPath: 'assets/images/svg/cod.svg',
      altText: 'cod SVG Image',
    },
    {
      id: 'pubg',
      nameOfApp: 'pubg',
      svgPath: 'assets/images/svg/pubg.svg',
      altText: 'pubg SVG Image',
    },
    {
      id: 'grab',
      nameOfApp: 'grab',
      svgPath: 'assets/images/svg/grab.svg',
      altText: 'grab SVG Image',
    },
    {
      id: 'food-panda',
      nameOfApp: 'food panda',
      svgPath: 'assets/images/svg/food-panda.svg',
      altText: 'food panda SVG Image',
    },
    {
      id: 'waze',
      nameOfApp: 'waze',
      svgPath: 'assets/images/svg/waze.svg',
      altText: 'waze SVG Image',
    },
    {
      id: 'viber',
      nameOfApp: 'viber',
      svgPath: 'assets/images/svg/viber.svg',
      altText: 'viber SVG Image',
    },
    {
      id: 'viu',
      nameOfApp: 'viu',
      svgPath: 'assets/images/svg/viu.svg',
      altText: 'viu SVG Image',
    },
  ];
}
