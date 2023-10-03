import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LobState } from '../../../plan-selector/state/plan-selector.model';
import { lobState } from '../../../plan-selector/state/plan-selector.selectors';

@Component({
  selector: 'gor-selected-plan',
  templateUrl: './selected-plan.component.html',
  styleUrls: ['./selected-plan.component.scss'],
  standalone: true,
})
export class SelectedPlanComponent {
  lob$: Observable<string | undefined>;
  @Input() svgUrl: string = '';
  @Input() tags: Array<string> = [];
  @Input() planDetails: Array<string> = [];
  isMobile = false;
  constructor(private lobStore: Store<LobState>) {
    console.log('svgUrl:', this.svgUrl);
    this.lob$ = this.lobStore.pipe(select(lobState));
    this.lob$.subscribe(val => {
      this.isMobile = val === 'Mobile';
    });
  }
}
