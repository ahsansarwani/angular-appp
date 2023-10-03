import { Component, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import { DafReviewActions } from '../../state/daf-review.actionTypes';
import { DafReviewState } from '../../state/daf-review.model';
import {
  check0Select,
  check1Select,
  checkAllSelect,
  isTncChecked,
} from '../../state/daf-review.selectors';

@Component({
  selector: 'gor-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
})
export class TermsAndConditionsComponent {
  @Input() tnc: any | undefined;
  tNC: any;
  check0$: Observable<boolean | undefined>;
  check0: any;
  check1$: Observable<boolean | undefined>;
  check1: any;
  checkall$: Observable<boolean | undefined>;
  checkall: any;
  isChecked = undefined;
  isTncChecked: any = false;

  constructor(private store: Store<DafReviewState>) {
    // this.tNC = this.tnc;
    this.check0$ = this.store.pipe(select(check0Select));
    this.check1$ = this.store.pipe(select(check1Select));
    this.checkall$ = this.store.pipe(select(checkAllSelect));
  }

  ngOnInit() {
    this.tNC = this.tnc;
  }

  checkAllBoxes(event: any) {
    console.log('Source check', event.target.checked);
    // this.isChecked = event.target.checked;
    // if (event.target.checked === false) {
    //   (document.getElementById('check_0') as HTMLInputElement).checked = false;
    //   (document.getElementById('check_1') as HTMLInputElement).checked = false;
    // } else {
    //   (document.getElementById('check_0') as HTMLInputElement).checked = true;
    //   (document.getElementById('check_1') as HTMLInputElement).checked = true;
    // }
    console.log('event target', event.target.checked);
    this.store.dispatch(
      DafReviewActions.checkTnC({
        isTncChecked: event.target.checked,
        check0: event.target.checked,
        check1: event.target.checked,
        checkAll: event.target.checked,
      })
    );
  }

  async acceptCondition(event: any, i: any) {
    console.log('Event is', event.target.checked, i);
    // if (event.target.checked === false) {
    //   // (document.getElementById('selectall') as HTMLInputElement).checked =
    //   //   false;
    //   this.store.dispatch(
    //     DafReviewActions.checkTnC({
    //       checkAll: false,
    //     })
    //   );
    // }
    this.check0 = await firstValueFrom(this.check0$);
    this.check1 = await firstValueFrom(this.check1$);
    // this.checkall = await firstValueFrom(this.checkall$);
    if (i == 0) {
      this.store.dispatch(
        DafReviewActions.checkTnC({
          isTncChecked: event.target.checked,
          check0: event.target.checked,
          checkAll:
            this.check1 == true && event.target.checked == true ? true : false,
          check1: this.check1,
        })
      );
    }
    if (i == 1) {
      this.store.dispatch(
        DafReviewActions.checkTnC({
          isTncChecked: this.check0 == true ? true : false,
          check0: this.check0,
          check1: event.target.checked,
          checkAll:
            this.check0 == true && event.target.checked == true ? true : false,
        })
      );
    }
  }
}
