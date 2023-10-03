import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Swiper,
} from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Virtual]);
import { AppActions } from '../../app-state/app.actionTypes';
import { AppState } from '../../app-state/app.model';
import { PlanActions } from './state/plan-selector.actionTypes';
import { LobState, PlanState, UserState } from './state/plan-selector.model';
import { firstValueFrom, Observable } from 'rxjs';
import { lobState } from './state/plan-selector.selectors';
import { swiperArray } from 'projects/gor-app/src/data';
import { PlanBuilderService } from '../shared/components/plan-builder/services/plan-builder.service';
import { PlanSelectorService } from './state/plan-selector.service';
import { EVT_HOMEPAGE_ID } from '../../globals/gtm-events/plan-selector/events';
import { GoogleTagManagerService } from 'projects/gor-app/src/app/app-state/gtm.service';
import { Meta, Title } from '@angular/platform-browser';
import { tags_plan } from '../../globals/redirection-links';

declare let bootstrap: any;
@Component({
  selector: 'gor-plan-selector',
  templateUrl: './plan-selector.component.html',
  styleUrls: ['./plan-selector.component.scss'],
})
export class PlanSelectorComponent {
  swiperArray = swiperArray;
  basicCardsArrayIndexes: any = [];
  premiumCardsArrayIndexes: any = [];
  platinumCardsArrayIndexes: any = [];
  selectedCard: any = swiperArray[3];
  effect = 'scrollx';
  isVisible = false;
  isMobileCheck: boolean | undefined;
  deviceType: string;
  lob$: Observable<any> | undefined;
  outerModal: any;
  modalCard: any;
  planType: any;
  showAppIcons = false;
  swiper: SwiperCore | undefined;
  mySwiper: Swiper | undefined;
  activePlanType: any;
  activePlan: any;
  skipSlides: any;
  selectedPlanType: any;
  activeIndex: number | undefined;
  lobType: any;
  basicPlanCards: any = [];
  platinumPlanCards: any = [];
  premiumPlanCards: any = [];
  openIdModalFlag = false;
  url = '';
  planToShow: any;
  basicString = ['2', '3', '4'];
  premiumString = ['5', '6', '7', '8', '9'];
  platinumString = ['0', '1', '10'];
  slideArray: any = [];
  background: any;
  constructor(
    private store: Store<AppState>,
    private planStore: Store<PlanState>,
    private lobStore: Store<LobState>,
    private service: PlanSelectorService,
    private userStore: Store<UserState>,
    private _planBuilder: PlanBuilderService,
    private gtmService: GoogleTagManagerService,
    private route: ActivatedRoute,
    private router: Router,
    private meta: Meta,
    private title: Title
  ) {
    //set meta
    this.meta.addTags([
      { name: 'description', content: tags_plan.description },
      {
        name: 'keywords',
        content: tags_plan.keywords ? tags_plan.keywords : '',
      },
    ]);
    this.title.setTitle(tags_plan.title);
    //

    this.deviceType = this.service.getDeviceType();
    this.lob$ = this.lobStore.pipe(select(lobState));
    this.swiperArray.forEach((element: any) => {
      if (element.subPlanType == 'basic') {
        this.basicCardsArrayIndexes.push(element?.index);
      } else if (element.subPlanType == 'premium') {
        this.premiumCardsArrayIndexes.push(element?.index);
      } else if (element.subPlanType == 'platinum') {
        this.platinumCardsArrayIndexes.push(element?.index);
      }
    });

    // Handling modal opening
    this.route.queryParams.subscribe(params => {
      this.planToShow = params['sim-only'];
    });
  }

  openIdModal() {
    this.openIdModalFlag = true;
    this._planBuilder.openIdModal();
    this.gtmService.captureGTMEvent(EVT_HOMEPAGE_ID);
  }

  onIdClick() {
    this.isVisible = !this.isVisible;
  }
  planSelectHandler(valueEmitted: any) {
    console.log('In plan select handler ');
    const currentScrollPosition = window.scrollY;
    this.modalCard = valueEmitted;
    console.log('Value emitted in plan selector', valueEmitted);
    this.outerModal.show();
    this.router.navigate([], {
      queryParams: {
        'sim-only': null,
      },
      queryParamsHandling: 'merge',
    });
    setTimeout(() => {
      window.scrollTo(0, currentScrollPosition); // Replace currentScrollPosition with the desired scroll position
    }, 0);
  }

  isMobileViewport(): boolean {
    return /iPhone|Android/i.test(navigator?.userAgent);
  }

  /**
   * Returns if the user is accessing the app in tablet
   * @returns
   */
  isTabletViewport(): boolean {
    const userAgent = navigator?.userAgent.toLowerCase();
    return /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
      userAgent
    );
  }

  async ngOnInit() {
    this.isMobileCheck = false;
    this.store.dispatch(AppActions.initApp());

    this.lobType = await firstValueFrom(this.lob$!);

    //opening of modal based on query params received
    if (this.planToShow) {
      swiperArray.map((value: any) => {
        if (value.amount == this.planToShow) {
          if (value.subPlanType === 'basic') {
            this.planSelectHandler(value);
          } else {
            window.location.href = value?.redirectionLink;
          }
        }
      });
    }
    document.querySelector('html')!.style.scrollBehavior = 'auto';
  }
  ngOnDestroy() {
    document.querySelector('html')!.style.scrollBehavior = 'smooth';
  }
  ngAfterViewInit() {
    this.planStore.dispatch(
      PlanActions.lobType({ deviceType: this.deviceType })
    );
    this.userStore.dispatch(
      PlanActions.generateUserId({ userId: this.service.generateUserId() })
    );
    this.lob$?.subscribe(value => {
      console.log('Checking lob', value);
    });
    try {
      // this.gtmService.init();
      this.outerModal = new bootstrap.Modal(
        document.getElementById('outerModal')
      );
    } catch (ex) {
      console.log(ex);
    }
    this.background = '#f5f9fc';
    this.basicPlanCards = document.querySelectorAll('.basic');
    this.platinumPlanCards = document.querySelectorAll('.platinum');
    this.premiumPlanCards = document.querySelectorAll('.premium');
    this.mySwiper = new Swiper('.swiper', {
      initialSlide: 3,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop: true,
      breakpoints: {
        1100: {
          slidesPerView: 6.5,
        },
        950: {
          slidesPerView: 4.5,
        },
        650: {
          slidesPerView: 3.75,
        },
        500: {
          slidesPerView: 2.5,
        },
        400: {
          slidesPerView: 1.9,
        },
        300: {
          slidesPerView: 1.75,
        },
        250: {
          slidesPerView: 1,
        },
      },
      pagination: true,
      allowTouchMove: this.deviceType === 'Desktop' ? false : true,
      preventClicksPropagation: true,
      preventClicks: this.deviceType === 'Mobile' ? true : false,
      centeredSlides: true,
      centeredSlidesBounds: this.deviceType !== 'Mobile' ? true : false,
      on: {
        activeIndexChange: function (swiper: any) {
          console.log('swiper initialized in active index change', swiper);
        },
      },
    });
    this.selectedCard = swiperArray[3];
    const ele = document.getElementById('slide_3')!;
    ele.classList.remove('opacity-none');
    ele.classList.add('on-click-active', 'opacity-full');
    this.selectedPlanType = 'gplan';
    this.handleOpacity();

    this.mySwiper.on('slideChange', swiper => {
      if (this.deviceType == 'Mobile' || this.deviceType == 'Tablet') {
        this.selectedCard = swiperArray[swiper.realIndex];
        if (this.deviceType == 'Tablet') {
          this.handleOpacity();
        }
        this.removeActiveClass();
        swiper.slides[swiper.activeIndex].classList.add('on-click-active');

        this.selectedPlanType = this.selectedCard.planType;
        if (this.selectedCard.planType == 'gplan') {
          this.selectedPlanType = 'gplan';
          this.background = '#f5f9fc';
        } else if (this.selectedCard.planType == 'platinum') {
          this.selectedPlanType = 'platinum';
          this.background =
            'linear-gradient(159.97deg, rgba(175, 197, 222, 0.368627) 21.34%, rgba(255, 255, 255, 0.368627) 53%, rgba(197, 223, 255, 0.368627) 80.78%)';
        }
        if (this.selectedCard.hasUnlimitedAccess) {
          this.showAppIcons = true;
        } else {
          this.showAppIcons = false;
        }
      }
    });

    this.mySwiper.on('click', (swiper, event) => {
      if (this.deviceType == 'Tablet' || this.deviceType == 'Desktop') {
        const realId = swiper.slides[swiper.clickedIndex].children[0].id;

        // this.removeActiveClass();
        //swiper.clickedSlide.classList.add('on-click-active');

        if (swiper.clickedSlide.className.includes('opacity-none')) {
          this.removeActiveClass();
          if (this.basicString.includes(realId)) {
            let ele = document.getElementById('slide_3')!;
            this.selectedCard = swiperArray[3];
            this.handleSlideChange();
            ele.classList.add('on-click-active');
            const index: any = swiper!.slides.indexOf(ele);
            swiper?.slideTo(index);
          }
          if (this.premiumString.includes(realId)) {
            let ele = document.getElementById('slide_7')!;
            ele.classList.add('on-click-active');
            this.selectedCard = swiperArray[7];
            this.handleSlideChange();
            const index: any = swiper!.slides.indexOf(ele);
            swiper?.slideTo(index);
          }
          if (this.platinumString.includes(realId)) {
            let ele = document.getElementById('slide_0')!;
            this.selectedCard = swiperArray[0];
            this.handleSlideChange();
            ele.classList.add('on-click-active');
            const index: any = swiper!.slides.indexOf(ele);
            swiper?.slideTo(index);
          }
        } else {
          const num = parseInt(realId);
          this.selectedCard = swiperArray[num];
          this.handleSlideChange();
          //this.selectedCard=swiperArray[swiper.realIndex];
          // this.handleSlideChange();
          this.removeActiveClass();
          swiper.clickedSlide.classList.add('on-click-active');
          // let num = parseInt(realId);
          // this.selectedCard = swiperArray[num];
          // console.log('Selected Card in opacity none: ', this.selectedCard);
          // this.handleSlideChange();
        }
        // let num = parseInt(realId);
        // this.selectedCard = swiperArray[num];
        // console.log('Selected Card in opacity none: ', this.selectedCard);
        // this.handleSlideChange();
      }
    });
  }

  removeActiveClass() {
    const allEle = document.querySelectorAll('.on-click-active');
    allEle.forEach(ele => {
      ele.classList.remove('on-click-active');
    });
  }
  handleOpacity() {
    const visibleElements = document.querySelectorAll('.opacity-full');
    visibleElements.forEach((visibleElement: any) => {
      visibleElement.classList.remove('opacity-full');
      visibleElement.classList.add('opacity-none');
    });
    if (!(this.deviceType === 'Mobile')) {
      const groupElements = document.querySelectorAll(
        '.' + this.selectedCard.subPlanType
      );
      groupElements.forEach((groupElement: any) => {
        groupElement.classList.remove('opacity-none');
        groupElement.classList.add('opacity-full');
      });
    }
    return;
  }
  handleSlideChange() {
    const swiper = this.mySwiper!;
    this.handleOpacity();
    if (this.selectedCard.hasUnlimitedAccess) {
      this.showAppIcons = true;
    } else {
      this.showAppIcons = false;
    }
    if (this.selectedCard.planType == 'gplan') {
      this.selectedPlanType = 'gplan';
      this.background = '#f5f9fc';
    } else if (this.selectedCard.planType == 'platinum') {
      this.selectedPlanType = 'platinum';
      this.background =
        'linear-gradient(159.97deg, rgba(175, 197, 222, 0.368627) 21.34%, rgba(255, 255, 255, 0.368627) 53%, rgba(197, 223, 255, 0.368627) 80.78%)';
    }
    return;
  }

  selectPlanType(planType: any) {
    const swiper = this.mySwiper;
    if (planType == 'platinum') {
      this.selectedPlanType = 'platinum';
      swiper!.realIndex = 0;
      this.selectedCard = swiperArray[swiper!.realIndex];
      let ele = document.getElementById('slide_0')!;
      this.removeActiveClass();
      ele.classList.add('on-click-active');
      const index: any = swiper!.slides.indexOf(ele);
      swiper?.slideTo(index);
      this.handleSlideChange();
      if (planType == 'platinum') {
        this.background =
          'linear-gradient(159.97deg, rgba(175, 197, 222, 0.368627) 21.34%, rgba(255, 255, 255, 0.368627) 53%, rgba(197, 223, 255, 0.368627) 80.78%)';
      }
      //this.handleOpacity();
    } else if (planType === 'gplan') {
      this.selectedPlanType = 'gplan';
      this.background = '#f5f9fc';
      swiper!.realIndex = 3;
      this.selectedCard = swiperArray[3];
      let ele = document.getElementById('slide_3')!;
      this.removeActiveClass();
      ele.classList.add('on-click-active');
      const index: any = swiper!.slides.indexOf(ele);
      swiper?.slideTo(index);
      this.handleSlideChange();
    }
  }

  handleFrontNavigation() {
    const swiper = this.mySwiper;
    if (!(this.deviceType === 'Mobile')) {
      if (this.basicCardsArrayIndexes.includes(this.mySwiper?.realIndex)) {
        this.selectedCard = swiperArray[7];
        this.handleSlideChange();
        let ele = document.getElementById('slide_7')!;
        this.removeActiveClass();
        ele.classList.add('on-click-active');
        const index: any = swiper!.slides.indexOf(ele);
        swiper?.slideTo(index);
      } else if (
        this.premiumCardsArrayIndexes.includes(this.selectedCard.index)
      ) {
        this.selectedCard = swiperArray[0];
        this.handleSlideChange();
        let ele = document.getElementById('slide_0')!;
        this.removeActiveClass();
        ele.classList.add('on-click-active');
        const index: any = swiper!.slides.indexOf(ele);
        swiper?.slideTo(index);
      } else if (
        this.platinumCardsArrayIndexes.includes(this.selectedCard.index)
      ) {
        this.selectedCard = swiperArray[3];
        this.handleSlideChange();
        let ele = document.getElementById('slide_3')!;
        this.removeActiveClass();
        ele.classList.add('on-click-active');
        const index: any = swiper!.slides.indexOf(ele);
        swiper?.slideTo(index);
      }
    }
  }
  handleBackNavigation() {
    const swiper = this.mySwiper;
    if (!(this.deviceType === 'Mobile')) {
      if (this.basicCardsArrayIndexes.includes(this.mySwiper?.realIndex)) {
        this.selectedCard = swiperArray[0];
        this.handleSlideChange();
        let ele = document.getElementById('slide_0')!;
        this.removeActiveClass();
        ele.classList.add('on-click-active');
        const index: any = swiper!.slides.indexOf(ele);
        swiper?.slideTo(index);
      } else if (
        this.premiumCardsArrayIndexes.includes(this.selectedCard.index)
      ) {
        this.selectedCard = swiperArray[3];
        this.handleSlideChange();
        let ele = document.getElementById('slide_3')!;
        this.removeActiveClass();
        ele.classList.add('on-click-active');
        const index: any = swiper!.slides.indexOf(ele);
        swiper?.slideTo(index);
      } else if (
        this.platinumCardsArrayIndexes.includes(this.selectedCard.index)
      ) {
        this.selectedCard = swiperArray[7];
        this.handleSlideChange();
        let ele = document.getElementById('slide_7')!;
        this.removeActiveClass();
        ele.classList.add('on-click-active');
        const index: any = swiper!.slides.indexOf(ele);
        swiper?.slideTo(index);
      }
    }
  }
}
