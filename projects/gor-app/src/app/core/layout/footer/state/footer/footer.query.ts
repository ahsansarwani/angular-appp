import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { FooterNavState, FooterNavStore } from './footer.store';

@Injectable({ providedIn: 'root' })
export class FooterNavQuery extends QueryEntity<FooterNavState> {
  constructor(protected override store: FooterNavStore) {
    super(store);
  }
}
