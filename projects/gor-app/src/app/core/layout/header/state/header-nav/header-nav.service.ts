import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Head, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HeaderNav } from './header-nav.model';
import { HeaderNavStore } from './header-nav.store';
import { HeaderNavQuery } from './header-nav.query';
// import { environment } from 'src/environments/environment';
// import * as ApiUrlConstants from 'src/app/common/constants/apiUrl.constants';
import * as headerLeft from '../../configs/header-left-menu.json';
import * as headerRight from '../../configs/header-right-menu.json';

@Injectable({ providedIn: 'root' })
export class HeaderNavService {
  // private serverUrl: string = environment.baseServerUrl;
  private rightHeaderUrl: any = headerLeft;
  private leftHeaderUrl: any = headerRight;

  constructor(
    private headerNavStore: HeaderNavStore,
    private headerNavQuery: HeaderNavQuery,
    private http: HttpClient
  ) {}

  getNav(): void {
    this.getRightNav().subscribe();
    this.getLeftNav().subscribe();
  }

  getRightNav(): Observable<void> {
    // return this.http
    // .get<any>(this.rightHeaderUrl)
    // .pipe(map((entities) => entities.data))
    // .pipe(
    //   tap((entities) => {
    return of(this.headerNavStore.add(this.rightHeaderUrl.data));
    //     return entities;
    //   })
    // );
  }

  getLeftNav(): Observable<void> {
    // return this.http
    //   .get<any>(this.leftHeaderUrl)
    //   .pipe(map((entities) => entities.data))
    //   .pipe(
    //     tap((entities) => {
    return of(this.headerNavStore.add(this.leftHeaderUrl));
    //     return entities;
    //   })
    // );
  }

  setNavActive(navId: string): void {
    this.headerNavStore.setActive(navId);
  }
}
