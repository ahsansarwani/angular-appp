import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { HeaderNav } from './header-nav.model';

export type HeaderNavState = EntityState<HeaderNav>

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'headerNav' })
export class HeaderNavStore extends EntityStore<HeaderNavState> {
  constructor() {
    super();
  }
}
