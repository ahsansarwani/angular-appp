import { Injectable } from '@angular/core';
import { of } from 'rxjs';
// import { environment } from 'src/environments/environment';
// import * as ApiUrlConstants from 'src/app/common/constants/apiUrl.constants';
import { HttpClient } from '@angular/common/http';
import { FooterNavStore } from './footer.store';
import * as footerLeft from '../../configs/footer-left-menu.json';
import * as footerRight from '../../configs/footer-right-menu.json';

@Injectable({ providedIn: 'root' })
export class FooterService {
  // private serverUrl: string = environment.baseServerUrl;
  private footerLeftUrl = footerLeft;
  private footerRightUrl = footerRight;

  constructor(
    private http: HttpClient,
    private footerNavStore: FooterNavStore
  ) {}

  getNav(): any {
    // return this.http.get<any>(this.footerUrl).pipe(
    //   tap((res) => {
    return of(this.footerNavStore.add(this.footerLeftUrl.data));
    //   })
    // );
  }

  getRightNav(): any {
    // return this.http.get<any>(this.footerRightUrl).pipe(
    //   tap((res) => {
    return of(this.footerNavStore.add(this.footerRightUrl.data));
    //   })
    // );
  }
  setNavActive(navId: string): void {
    this.footerNavStore.setActive(navId);
  }
}
