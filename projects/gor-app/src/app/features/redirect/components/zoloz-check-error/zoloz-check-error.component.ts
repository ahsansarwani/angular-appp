import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RedirectService } from '../../state/redirect.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { RedirectActions } from '../../state/redirect.actionTypes';
import { Store } from '@ngrx/store';
import { RedirectState } from '../../state/redirect.model';
@Component({
  selector: 'gor-zoloz-check-error',
  templateUrl: './zoloz-check-error.component.html',
  styleUrls: ['./zoloz-check-error.component.scss'],
})
export class ZolozCheckErrorComponent {
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
        RedirectActions.checkResultFailInit({
          transactionId: pass,
        })
      );
    });
  }
}
