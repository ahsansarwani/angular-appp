import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanBuilderService {
  private drawerOpenSource = new Subject<any>();
  drawerOpen$ = this.drawerOpenSource.asObservable();
  private idModalOpenSource = new Subject<void>();
  idModalOpen$ = this.idModalOpenSource.asObservable();
  openDrawer(card: any, user: number) {
    this.drawerOpenSource.next({ card, user });
  }
  openIdModal() {
    this.idModalOpenSource.next();
  }
}
