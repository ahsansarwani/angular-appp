import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { BaseService } from 'src/app/core/service/base.service';
import { environment } from '../../environments/environment';
// import * as apiUrls from 'src/app/common/constants/apiUrl.constants';
import * as CryptoJS from 'crypto-js';
import { catchError, firstValueFrom, map, Observable, of } from 'rxjs';
import { ChatState, ErrorResponse, SuccessResponse } from './app.model';
import { connectChatElementId } from '../globals/config';
import { select, Store } from '@ngrx/store';
import { tokenSelect } from './app.selectors';
import { AppActions } from './app.actionTypes';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
  private baseUrl: string = environment.baseServerUrl;
  private widgetId: string = environment.widgetId;
  private snippetId: string = environment.snippetId;
  private acSrcLibrary: string = environment.acSrcLibrary;
  isChatInit$: Observable<any>;
  isChatInit?: any;

  constructor(private http: HttpClient, private chatStore: Store<ChatState>) {
    this.isChatInit$ = this.chatStore.pipe(select(tokenSelect));
    // super(platformId);
  }

  private browserGlobals = {
    windowRef(): any {
      return window;
    },
    documentRef(): any {
      return document;
    },
  };

  // Chat Bot Script
  addChatbotToDom(firstname: string, lastName: string, token: string) {
    // const showChat = this.getChatConfig();
    // if (showChat) {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      if (!document.getElementById('amazon-connect-chat-widget')) {
        //   return new Promise((resolve, reject) => {
        // console.log('insertinf connect chat');
        const doc = this.browserGlobals.documentRef();
        const chatbotScript = doc.createElement('script');
        chatbotScript.src = this.acSrcLibrary;
        chatbotScript.async = 1;
        chatbotScript.id = this.widgetId;
        document.getElementsByTagName('head')[0].appendChild(chatbotScript);
        (window as { [key: string]: any })['amazon_connect'] = {
          ac: [],
        };
        (window as { [key: string]: any })['amazon_connect']['ac'].push(
          this.createAmazonConnectStyle()
        );
        (window as { [key: string]: any })['amazon_connect']['ac'].push(
          this.createAmazonConnectId()
        );
        (window as { [key: string]: any })['amazon_connect']['ac'].push(
          this.injectToken(token)
        );
        (window as { [key: string]: any })['amazon_connect']['ac'].push(
          this.displayName(firstname)
        );
        doc.head.insertBefore(chatbotScript, doc.head.firstChild);
        //   });
      }
    }
    // }
  }

  // Remove Chat Bot Script
  //   removeChatBot(): any {
  //     if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  //       if (document.getElementById('amazon-connect-chat-widget')) {
  //         var tags = document.getElementsByTagName('script');
  //         for (let tag of Array.from(tags)) {
  //           if (
  //             tag &&
  //             tag.getAttribute('src') != null &&
  //             tag
  //               .getAttribute('src')
  //               .indexOf('amazon-connect-chat-interface-client.js') != -1
  //           ) {
  //             tag.parentNode.removeChild(tag);
  //           }
  //         }
  //         document.getElementById('amazon-connect-chat-widget').remove();
  //       }
  //     }
  //   }

  private createAmazonConnectStyle() {
    return [
      'styles',
      {
        openChat: { color: 'white', backgroundColor: '#1A458B' },
        closeChat: { color: 'white', backgroundColor: '#1A458B' },
      },
    ];
  }

  private createAmazonConnectId() {
    return ['snippetId', this.snippetId];
  }

  private injectToken(token: any): any {
    // if (typeof window !== 'undefined' && localStorage.getItem('chatToken')) {
    if (typeof window !== 'undefined') {
      //   let token = CryptoJS.AES.decrypt(
      //     localStorage.getItem('chatToken') || '',
      //     environment.aesEncryptionKey
      //   ).toString(CryptoJS.enc.Utf8);
      if (token) {
        return [
          'authenticate',
          function (callback: any) {
            callback(token);
          },
        ];
      }
    }
  }

  private displayName(firstname: any): any {
    if (
      typeof window !== 'undefined'
      //   localStorage.getItem('eligibility_details')
    ) {
      //   let details = CryptoJS.AES.decrypt(
      //     localStorage.getItem('eligibility_details') || '',
      //     environment.aesEncryptionKey
      //   ).toString(CryptoJS.enc.Utf8);

      //   let parseDetails = JSON.parse(details);
      //   let firstName = parseDetails?.account_check?.firstname;
      return [
        'customerDisplayName',
        function (callback: any) {
          const displayName = firstname ?? '';
          callback(displayName);
        },
      ];
    }
  }

  getChatBotToken(firstname: any, lastname: any, msisdn: any): Observable<any> {
    // const body = JSON.stringify(data);
    // const url = '';
    // return this.http.post<any>(url, body, httpOptions);

    return this.http
      .post<SuccessResponse | ErrorResponse>(
        '/api/connect-chat-service/chat/generateToken',
        {
          firstname,
          lastname,
          msisdn,
        },
        { observe: 'response' }
      )
      .pipe(
        map((res: HttpResponse<any>) => {
          if (res.status === 200) {
            const value: SuccessResponse = res.body.data;
            return value;
          } else {
            const value: ErrorResponse = res.body;
            return value;
          }
        }),
        catchError((err, caught) => {
          console.log('error found - ', err);
          return of({ error: { message: '', details: '' } });
        })
      );
  }

  removeTokenBot() {
    if (typeof window !== 'undefined' && localStorage.getItem('chatToken')) {
      const acToken = localStorage.getItem('chatToken');
      if (acToken) {
        // this.removeChatBot();
        localStorage.removeItem('chatToken');
      }
    }
  }

  getChatConfig() {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('planRenewalConfig')
    ) {
      const encryptedConfig = CryptoJS.AES.decrypt(
        localStorage.getItem('planRenewalConfig') || '',
        environment.aesEncryptionKey
      ).toString(CryptoJS.enc.Utf8);
      const parseConfig = JSON.parse(encryptedConfig);
      const acConfig = parseConfig?.connect_chat?.enable ?? 0; // check if undefined or null
      return acConfig;
    }
  }

  async checkChat() {
    this.isChatInit = await firstValueFrom(this.isChatInit$);
    if (
      !document.getElementById(connectChatElementId) &&
      this.isChatInit !== undefined
    ) {
      this.chatStore.dispatch(AppActions.initChatToken());
    }
  }
}
