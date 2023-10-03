import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { appList } from 'projects/gor-app/src/dummy-data';
import { Location } from '@angular/common';
import {
  LobState,
  PlanState,
} from '../plan-selector/state/plan-selector.model';
import { select, Store } from '@ngrx/store';
import { PlanActions } from '../plan-selector/state/plan-selector.actionTypes';
import {
  lobState,
  planSelect,
} from '../plan-selector/state/plan-selector.selectors';
import { Observable } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { tags_unli } from '../../globals/redirection-links';
@Component({
  selector: 'gor-select-unliapp',
  templateUrl: './select-unliapp.component.html',
  styleUrls: ['./select-unliapp.component.scss'],
})
export class SelectUnliappComponent implements OnInit {
  features: any = [];
  tags: any = ['Basic'];
  planDetails = [
    'GPlan PLUS 9990',
    'All-access Data',
    '20 GB',
    'App Data',
    'Unlimited',
  ];
  card$: any;
  card: any;
  lob$: Observable<string | undefined>;
  constructor(
    private location: Location,
    private store: Store<PlanState>,
    private lobStore: Store<LobState>,
    private meta: Meta,
    private title: Title
  ) {
    //set meta
    this.meta.addTags([
      { name: 'description', content: tags_unli.description },
    ]);
    this.title.setTitle(tags_unli.title);
    //

    this.lob$ = this.lobStore.pipe(select(lobState));
  }
  ngOnInit(): void {
    this.card$ = this.store.pipe(select(planSelect));
    this.card$.subscribe((val: any) => {
      console.log('val:', val);
      this.card = val;
      if (this.features.length === 0) {
        let aD = val.accessData;
        if (aD && aD.includes(' ')) aD = aD.replace(' ', '');
        const accessData = aD + ' ' + val.accessDataTitle;

        this.features = [accessData, ...val.planFeatures];
      }
    });
  }
  onBack() {
    this.location.back();
  }
  selectedIndex = -1;
  @Output() selectedApp = new EventEmitter<any>();
  app: any = null;
  appClicked = false;
  isSelected = false;
  appList = appList;
  onAppClick(event: any, value: any, i: number) {
    if (this.selectedIndex === i) {
      this.isSelected = false;
      this.appClicked = false;
      this.selectedIndex = -1;
      this.app = null;
      this.selectedApp.emit(false);
    } else {
      this.isSelected = true;
      this.appClicked = true;
      this.selectedIndex = i;
      this.app = value;
      this.selectedApp.emit(value);
    }
  }

  onProceed(event: any) {
    // console.log('Proceed' + this.app);
    // alert('Proceed' + this.app);
    this.store.dispatch(
      PlanActions.unliSelection({
        unli: {
          selectedUnliAppName: this.app.nameOfApp,
          selectedUnliApp: this.app.id,
          selectedAppImage: this.app.svgPath,
        },
      })
    );
    // if (this.changing) {
    //   this.prevPlan = this.finalPlan;
    //   this.sendPlan = {
    //     ...this.finalCard,
    //     selectedUnliApp: this.selectedApp,
    //     selectedAppImage: this.selectedAppImage,
    //   };
    //   this.close();
    //   this.store.dispatch(
    //     PlanActions.planSelection({ plan: this.sendPlan, from: 'CHANGE_PLAN' })
    //   );
    // } else {
    //   this.sendPlan = {
    //     ...this.cardDetails,
    //     selectedUnliApp: this.selectedApp,
    //     selectedAppImage: this.selectedAppImage,
    //   };
    //   this.store.dispatch(
    //     PlanActions.planSelection({
    //       plan: this.sendPlan,
    //       from: 'PLAN_SELECTOR',
    //     })
    //   );
    // }
    // //console.log('Procceed', this.sendPlan);
    // //this._route.navigate(['/daf-scan']);
  }
}
