import { Component } from '@angular/core';
import { DAFScanActions } from '../../state/daf-scan.actionTypes';
import { Countries, DAFScanState, IDs } from '../../state/daf-scan.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  checkIdInitSelector,
  nationalitySelector,
  idTypeSelector,
} from '../../state/daf-scan.selectors';
import { GoogleTagManagerService } from 'projects/gor-app/src/app/app-state/gtm.service';
import { FTA_SCAN_MY_ID } from 'projects/gor-app/src/app/globals/gtm-events/plan-selector/events';
@Component({
  selector: 'gor-daf-scan-form',
  templateUrl: './daf-scan-form.component.html',
  styleUrls: ['./daf-scan-form.component.scss'],
})
export class DafScanFormComponent {
  submitDisabled = true;
  selectedNationality = '';
  selectedId = '';
  selectedIdNo = '';
  selectedIdName = '';
  checkIdInit$: Observable<boolean | undefined>;
  nationalityList$: Observable<Countries[] | undefined>;
  nationalityList: any;
  idList$: Observable<IDs[] | undefined>;
  idList: any;

  steps = [
    {
      no: 1,
      stepDesc:
        'Please provide your ID for verification and registration purposes.',
    },
  ];

  dropdown = [
    {
      id: 'dropdownMenuButton-nationality',
      title: 'Nationality',
      options: [],
      required: true,
    },
    {
      id: 'dropdownMenuButton-idType',
      title: 'ID Type',
      options: [],
      required: true,
    },
  ];

  constructor(
    private store: Store<DAFScanState>,
    private gtmService: GoogleTagManagerService
  ) {
    this.checkIdInit$ = this.store.pipe(select(checkIdInitSelector));
    this.nationalityList$ = this.store.pipe(select(nationalitySelector));
    this.idList$ = this.store.pipe(select(idTypeSelector));
  }

  ngOnInit() {
    this.nationalityList$.subscribe(value => {
      this.nationalityList = value;
      if (value && value.length > 0)
        this.dropdown[0].options = this.nationalityList.map(
          (value: Countries) => value.countryName
        );
    });

    this.idList$.subscribe(value => {
      this.idList = value;
      if (value && value.length > 0)
        this.dropdown[1].options = this.idList.map(
          (value: IDs) => value.docName
        );
    });
  }

  selectedOption(selectedOption: any) {
    let CountryObj: Countries;
    let idObj: IDs;
    switch (selectedOption.title) {
      case 'Nationality':
        this.selectedNationality = selectedOption.selectedOption;
        this.dropdown[1].options = [];
        CountryObj = this.nationalityList.find(
          (t: Countries) => t.countryName === this.selectedNationality
        );

        this.store.dispatch(
          DAFScanActions.idFetchInit({
            code: CountryObj.countryId,
            name: CountryObj.countryName,
          })
        );
        break;
      case 'ID Type':
        this.selectedId = selectedOption.selectedOption;
        idObj = this.idList.find((t: IDs) => t.docName === this.selectedId);
        this.selectedIdNo = idObj.docType;
        this.selectedIdName = idObj.docName;
        break;
    }
    if (this.selectedNationality && this.selectedId) {
      this.submitDisabled = false;
    }
  }

  scanMyId() {
    this.gtmService.captureGTMEvent(FTA_SCAN_MY_ID);
    this.store.dispatch(
      DAFScanActions.updateSelection({
        country: this.selectedNationality,
        id: this.selectedIdNo,
        name: this.selectedIdName,
      })
    );

    this.store.dispatch(
      DAFScanActions.IdCheckInit({
        docType: this.selectedIdNo,
      })
    );
  }
}
