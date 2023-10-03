import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RedirectService } from '../../state/redirect.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { RedirectActions } from '../../state/redirect.actionTypes';
import { Store } from '@ngrx/store';
import { RedirectState } from '../../state/redirect.model';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';

@Component({
  selector: 'gor-zoloz-check',
  templateUrl: './zoloz-check.component.html',
  styleUrls: ['./zoloz-check.component.scss'],
})
export class ZolozCheckComponent {
  response: any;
  responseJson: any;

  constructor(
    private route: ActivatedRoute,
    private redirect: RedirectService,
    private store: Store<RedirectState>
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params: any) => {
      this.response = { ...params.keys, ...params };
      console.log('respone', this.response);
      const resp = this.response.params.response;

      console.log(resp);
      console.log(resp.includes('%3A'));

      let pass = '';
      if (resp.includes('%3A')) {
        pass = resp.substring(12, 51);
      } else {
        this.responseJson = JSON.parse(resp);
        pass = this.responseJson.state;
      }

      this.store.dispatch(
        RedirectActions.checkResultSuccessInit({
          transactionId: pass,
        })
      );
    });
  }
}
