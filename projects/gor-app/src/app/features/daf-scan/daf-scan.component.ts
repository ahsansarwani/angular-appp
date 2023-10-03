import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DAFScanState } from './state/daf-scan.model';
import { Observable } from 'rxjs';
import { checkIdInitSelector } from './state/daf-scan.selectors';
import { DAFScanActions } from './state/daf-scan.actionTypes';
import { Meta, Title } from '@angular/platform-browser';
import { tags_uploadId } from '../../globals/redirection-links';
import { ChatbotService } from '../../app-state/chat.service';
import { GoogleTagManagerService } from '../../app-state/gtm.service';
import { ECOMM_UPLOAD_ID_LOAD } from '../../globals/gtm-events/plan-selector/events';

@Component({
  selector: 'gor-daf',
  templateUrl: './daf-scan.component.html',
  styleUrls: ['./daf-scan.component.scss'],
})
export class DafComponent implements OnInit {
  checkIdInit$: Observable<boolean>;
  isLoading = false;
  steps = [
    {
      no: 1,
      stepDesc:
        'Please provide your ID for verification and registration purposes.',
    },
    {},
    {},
    {},
  ];
  customerType: any;
  plan: any;

  constructor(
    private store: Store<DAFScanState>,
    private meta: Meta,
    private title: Title,
    private chatService: ChatbotService,
    private gtmService: GoogleTagManagerService
  ) {
    //set meta
    this.meta.addTags([
      { name: 'description', content: tags_uploadId.description },
    ]);
    this.title.setTitle(tags_uploadId.title);
    //

    this.checkIdInit$ = this.store.pipe(select(checkIdInitSelector));
  }

  async ngOnInit() {
    this.store.dispatch(DAFScanActions.nationalityFetchInit());
  }

  ngAfterViewInit() {
    // chat
    this.chatService.checkChat();
    this.triggerGAEvent();
  }

  onLoad(value: boolean) {
    this.isLoading = value;
  }

  triggerGAEvent() {
    const eventInfo = ECOMM_UPLOAD_ID_LOAD;
    // this.gtmService.captureEcommEvent(eventInfo);
  }
}
