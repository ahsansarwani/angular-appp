import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderSuccessRoutingModule } from './order-success-routing.module';
import { OrderSuccessComponent } from './order-success.component';
import { TextRatingComponent } from './components/feedback/text-rating/text-rating.component';
import { NumberRatingComponent } from './components/feedback/number-rating/number-rating.component';
import { StarRatingComponent } from './components/feedback/star-rating/star-rating.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { OrderConfirmedComponent } from './components/order-confirmed/order-confirmed.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { GoogleTagManagerService } from '../../app-state/gtm.service';
import { PlanSelectorService } from '../plan-selector/state/plan-selector.service';


@NgModule({
  declarations: [
    OrderSuccessComponent,
    OrderConfirmedComponent,
    FeedbackComponent,
    StarRatingComponent,
    NumberRatingComponent,
    TextRatingComponent,
  ],
  imports: [
    CommonModule,
    OrderSuccessRoutingModule,
    FormsModule,
    SharedModule
  ],
  providers:[PlanSelectorService]
})
export class OrderSuccessModule { }
