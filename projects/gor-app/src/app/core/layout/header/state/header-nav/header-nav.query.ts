import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { HeaderNavStore, HeaderNavState } from './header-nav.store';

@Injectable({ providedIn: 'root' })
export class HeaderNavQuery extends QueryEntity<HeaderNavState> {
  constructor(protected override store: HeaderNavStore) {
    super(store);
  }
}
