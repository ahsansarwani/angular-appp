import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LobState } from '../../../plan-selector/state/plan-selector.model';
import { lobState } from '../../../plan-selector/state/plan-selector.selectors';

@Component({
  selector: 'gor-selected-plan-container',
  templateUrl: './selected-plan-container.component.html',
  styleUrls: ['./selected-plan-container.component.scss'],
})
export class SelectedPlanContainerComponent {
  lob$: Observable<string | undefined>;
  @Input() svgUrl: any = [];
  @Input() tags: any = [];
  @Input() planDetails: any = [];
  isMobile = false;
  constructor(private lobStore: Store<LobState>) {
    this.lob$ = this.lobStore.pipe(select(lobState));
    this.lob$.subscribe(val => {
      this.isMobile = val === 'Mobile';
    });
  }
}
