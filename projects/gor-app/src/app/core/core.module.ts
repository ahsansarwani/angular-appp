import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ThreeStepOtpBreadcrumbsComponent } from './layout/three-step-otp-breadcrumbs/three-step-otp-breadcrumbs.component';
import { HamburgerComponent } from './layout/hamburger/hamburger.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ThreeStepOtpBreadcrumbsComponent,
    HamburgerComponent,
  ],
  imports: [CommonModule, RouterModule, NzDrawerModule, NzGridModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    HamburgerComponent,
    ThreeStepOtpBreadcrumbsComponent,
  ],
})
export class CoreModule {}
