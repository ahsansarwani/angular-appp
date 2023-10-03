import { NgModule } from '@angular/core';
import { DafRoutingModule } from './daf-scan-routing.module';
import { DafComponent } from './daf-scan.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DafScanFormComponent } from './components/daf-scan-form/daf-scan-form.component';
import { SharedModule } from '../shared/shared.module';
import { DAFScanEffects } from './state/daf-scan.effects';
import { dafScanReducer } from './state/daf-scan.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DAFScanService } from './state/daf-scan.service';

@NgModule({
  declarations: [DafComponent, DropDownComponent, DafScanFormComponent],
  imports: [
    DafRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('dafScan', dafScanReducer),
    EffectsModule.forFeature([DAFScanEffects]),
  ],
  providers: [DAFScanService],
})
export class DafScanModule {}
