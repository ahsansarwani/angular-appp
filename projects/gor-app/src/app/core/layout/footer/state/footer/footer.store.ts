import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { FooterNav } from './footer.model';

export type FooterNavState = EntityState<FooterNav>

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'footerNav' })
export class FooterNavStore extends EntityStore<FooterNavState> {
  constructor() {
    super();
  }
}
