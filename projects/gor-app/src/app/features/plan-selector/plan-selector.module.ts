import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { PlanSelectorRoutingModule } from './plan-selector-routing.module';
import { PlanSelectorComponent } from './plan-selector.component';
import { PlanBuilderComponent } from '../shared/components/plan-builder/plan-builder.component';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { CardComponent } from './components/card/card.component';
import { InnerCardComponent } from './components/inner-card/inner-card.component';
import {
  customerTypeReducer,
  lobReducer,
  planReducer,
  userReducer,
} from './state/plan-selector.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlanEffects } from './state/plan-selector.effects';
import { SharedModule } from '../shared/shared.module';
import { AppIconsComponent } from './components/app-icons/app-icons.component';
import { CommonModule } from '@angular/common';
import { ChangePlanSelectorComponent } from '../shared/components/change-plan-selector/change-plan-selector.component';
import { PbButtonComponent } from '../shared/components/pb-button/pb-button.component';
import { LoadingScreenComponent } from '../shared/components/loading-screen/loading-screen.component';
import { IdModalComponent } from '../shared/components/id-modal/id-modal.component';
import { ModalComponent } from './modal/modal.component';
import { SelectedPlanContainerComponent } from './components/selected-plan-container/selected-plan-container.component';

import { SwiperModule } from 'swiper/angular';
import { FooterImageComponent } from './components/footer-image/footer-image.component';
import { PlanSelectorService } from './state/plan-selector.service';
@NgModule({
  declarations: [
    PlanSelectorComponent,
    PlanBuilderComponent,
    CardComponent,
    InnerCardComponent,
    AppIconsComponent,
    ModalComponent,
    SelectedPlanContainerComponent,
    FooterImageComponent,
  ],
  imports: [
    SwiperModule,
    ReactiveFormsModule,
    ChangePlanSelectorComponent,
    IdModalComponent,
    PbButtonComponent,
    PlanSelectorRoutingModule,
    FormsModule,
    CommonModule,
    NzButtonModule,
    NzTabsModule,
    NzFormModule,
    NzPageHeaderModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzGridModule,
    NzDividerModule,
    NzCardModule,
    NzButtonModule,
    NzModalModule,
    NzCarouselModule,
    StoreModule.forFeature('customerType', customerTypeReducer),
    StoreModule.forFeature('plan', planReducer),
    StoreModule.forFeature('lob', lobReducer),
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([PlanEffects]),
    LoadingScreenComponent,
  ],
  providers: [PlanSelectorService],
})
export class PlanSelectorModule {}
