import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PbButtonComponent } from './components/pb-button/pb-button.component';
import { DafPlanComponent } from './components/daf-plan/daf-plan.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DafHeaderComponent } from '../daf-header/daf-header.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { ChangePlanSelectorComponent } from './components/change-plan-selector/change-plan-selector.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { DafPlanBreakdownComponent } from '../daf-plan-breakdown/daf-plan-breakdown.component';
import { PbOutlineButtonComponent } from './components/plan-builder/components/pb-outline-button/pb-outline-button.component';
import { FillLabelComponent } from './components/fill-label/fill-label.component';
import { YesNoDialogComponent } from './components/yes-no-dialog/yes-no-dialog.component';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { CustomDropDownComponent } from './components/custom-drop-down/custom-drop-down.component';
import { ModalComponent } from './components/modal/modal-component.component';
import { IdModalComponent } from './components/id-modal/id-modal.component';
import { SelectedPlanComponent } from './components/selected-plan/selected-plan.component';
import { BreadcrumbsNewComponent } from './components/breadcrumbs-new/breadcrumbs-new.component';
import { DownloadGlobeComponent } from './components/download-globe/download-globe.component';
import { BackButtonComponent } from './components/buttons/back-button/back-button.component';

@NgModule({
  declarations: [
    DafHeaderComponent,
    PbOutlineButtonComponent,
    DafPlanComponent,
    BreadcrumbsComponent,
    SpinnerComponent,
    DafPlanBreakdownComponent,
    FillLabelComponent,
    YesNoDialogComponent,
    CustomDropDownComponent,
    ModalComponent,
    DownloadGlobeComponent,
    BreadcrumbsNewComponent,
    BackButtonComponent,
  ],
  imports: [
    ChangePlanSelectorComponent,
    PbButtonComponent,
    CommonModule,
    SharedRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    NzDrawerModule,
    NzToolTipModule,
    IdModalComponent,
  ],
  exports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    DafPlanComponent,
    BreadcrumbsComponent,
    DafHeaderComponent,
    SpinnerComponent,
    DafPlanBreakdownComponent,
    PbOutlineButtonComponent,
    FillLabelComponent,
    YesNoDialogComponent,
    CustomDropDownComponent,
    ModalComponent,
    IdModalComponent,
    BreadcrumbsNewComponent,
    DownloadGlobeComponent,
    BackButtonComponent,
  ],
})
export class SharedModule {}
