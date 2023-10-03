import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PlanBuilderService } from '../../../shared/components/plan-builder/services/plan-builder.service';

import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  SwiperOptions,
} from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { dummyCard1 } from 'projects/gor-app/src/dummy-data';
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Virtual]);
declare let bootstrap: any;
@Component({
  selector: 'gor-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  isOuterModalVisible: any;
  modalCard: any;

  @Input() selectedCard: any;
  @Input() subCards: any;
  @Output() idClick = new EventEmitter();
  isIDModalVisible: boolean | undefined;
  openIdModalFlag = false;
  outerModal: any;

  dummyArray = dummyCard1.innerCard;
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _planBuilder: PlanBuilderService) {}

  openIdModal() {
    this.openIdModalFlag = true;

    this._planBuilder.openIdModal();
  }

  planSelectHandler(valueEmitted: any) {
    this.modalCard = valueEmitted;
    this.buttonClicked.emit(valueEmitted);
    console.log('Value emitted in parent', this.modalCard);
    this.outerModal.show();
    // this.isOuterModalVisible = true;
  }
  ngAfterViewInit() {
    // console.log('Modal elem after view init');
    try {
      this.outerModal = new bootstrap.Modal(
        document.getElementById('outerModal')
      );
    } catch (ex) {
      console.log(ex);
    }
    // console.log('Modal element', this.outerModal);
  }

  isMobileViewport(): boolean {
    return /iPhone|Android/i.test(navigator?.userAgent);
  }
  isTabletViewport(): boolean {
    const userAgent = navigator?.userAgent.toLowerCase();
    return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
      userAgent
    );
  }
  config: SwiperOptions = {
    slidesPerGroup: 3,
    //slidesPerView: 3,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  onSwiper([swiper]: any) {
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
