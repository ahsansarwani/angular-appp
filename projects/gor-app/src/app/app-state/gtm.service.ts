import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';
// import { gtmObjectModel, IEcommObject, IGtmObject } from '../models/googleTagManager/googleTagManager.model';
// import { EVENT, EVENT_ACTION } from 'src/app/common/constants/gtm.constants';
import { environment } from '../../environments/environment';
import { DafReviewState } from '../features/daf-review/state/daf-review.model';
import { payStatusSelect } from '../features/daf-review/state/daf-review.selectors';
import {
  CustomerTypeState,
  LobState,
  PlanState,
  UserState,
} from '../features/plan-selector/state/plan-selector.model';
import {
  customerTypeSelect,
  lobState,
  planSelect,
  userIdSelect,
} from '../features/plan-selector/state/plan-selector.selectors';
import { OrderState } from '../features/submit-order/state/submit-order.model';
import { orderIdSelector } from '../features/submit-order/state/submit-order.selectors';
@Injectable({
  providedIn: 'root',
})
export class GoogleTagManagerService {
  private isLoaded = false;
  private isPushingLayer = false;
  ctas?: { [x: string]: any };
  plan: any;
  customer: any;
  userId: any;
  device: any;
  orderId: any;
  amount: any;

  private browserGlobals = {
    windowRef(): any {
      return window;
    },
    documentRef(): any {
      return document;
    },
  };

  constructor(
    private planStore: Store<PlanState>,
    private customerStore: Store<CustomerTypeState>,
    private userStore: Store<UserState>,
    private lobStore: Store<LobState>,
    private orderStore: Store<OrderState>,
    private reviewStore: Store<DafReviewState>
  ) {}

  /**
   * Adds the initial GTM script on the head element before the app starts.
   * Run this on App Component - only needs to be ran once.
   */
  init() {
    console.log('Initializing GTM scripts.');
    this.addGtmScriptToDom();
    this.addStartEvent();
  }

  /**
   * Adds the gtm.start event
   */
  private addStartEvent() {
    this.pushTag({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  }

  /**
   * Add the script element to enable events tagging
   */
  private addGtmScriptToDom() {
    const gtmScript = document.createElement('script');
    gtmScript.id = 'GTMscript';
    gtmScript.async = true;
    gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=GTM-NMB37WB`;

    document.head.insertBefore(gtmScript, document.head.firstChild);
  }

  public getDataLayer(): any[] {
    const window = this.browserGlobals.windowRef();
    window.dataLayer = window.dataLayer || [];
    return window.dataLayer;
  }

  private pushOnDataLayer(obj: any): void {
    const dataLayer = this.getDataLayer();
    const index = dataLayer.findIndex(
      item =>
        (item?.event === obj?.event || item?.event === obj?.ecommerce) &&
        item?.event &&
        obj?.event
    );

    if (index > -1) dataLayer.splice(index, 1);
    dataLayer.push(obj);
  }

  public addGtmToDom(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.isLoaded) {
        return resolve(this.isLoaded);
      }
      const doc = this.browserGlobals.documentRef();
      this.pushOnDataLayer({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });

      const gtmScript = doc.createElement('script');
      gtmScript.id = 'GTMscript';
      gtmScript.async = true;
      gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${''}`;
      gtmScript.addEventListener('load', () => {
        this.isLoaded = true;
        return resolve(true);
      });
      gtmScript.addEventListener('error', () => {
        return reject(false);
      });
      doc.head.insertBefore(gtmScript, doc.head.firstChild);
    });
  }

  public pushTag(item: object): void {
    // this.addGtmToDom().then(() => {
    // console.log('Pushing to GTM !!!!!!');
    this.pushOnDataLayer(item);
    // });
  }

  /**
   * Calls route data to get the cta and extract globe analytics field
   * @param component  Angular Component where the event will be created
   * @param index The position of the cta
   */
  //   getCTA(component: string, index: number) {
  //     this.seoLinkService.getRouteData().subscribe(res => {
  //       if (res.length) {
  //         this.ctas[component] = res[index].field_globe_analytics;
  //       }
  //     });
  //   }

  /**
   * Capture the element that will create a GTM event
   * @param element Element to be capture
   * @param component Angular Component where the event is created
   * @param text Optional text for the element
   */
  //   createEvent(element: any, component: string, text?: any) {
  //     const elemText = text ?? element.target.innerHTML;
  //     const attributes = this.seoLinkService.parseAttributeObject(
  //       element.target.id,
  //       this.ctas[component]
  //     );
  //     const gtmTag = new gtmObjectModel(elemText, attributes);
  //     const dataLayer = gtmTag.getDataLayer();
  //     this.pushTag(dataLayer);
  //   }

  /**
   * Returns the cta for the specific id
   * @param ctas CTA from Drupal
   * @param defaultCTA defaultCTA
   * @param id element id
   */

  //   getAttr(ctas, defaultCTA, id) {
  //     if (ctas && ctas.length && Array.isArray(ctas)) {
  //       let tempCta = ctas.find(cta => cta.field_html_element_id === id);
  //       if (tempCta && tempCta.length && Array.isArray(tempCta)) {
  //         return tempCta;
  //       } else {
  //         return defaultCTA.find(cta => cta.field_html_element_id === id);
  //       }
  //     } else {
  //       return defaultCTA.find(cta => cta.field_html_element_id === id);
  //     }
  //   }

  /**
   * Captures Google Tag Manager events
   * @param attr CTA from Drupal
   * @param eventInfo data
   */
  captureGTMEvent(eventInfo: any) {
    // console.log('Event info: ', eventInfo);
    try {
      this.fetchValues()
        .then(() => {
          if (environment.gtmPush === true) {
            const data: any = {
              event_category: environment.gtmConfig.event_category,
              event_action: eventInfo.event_action
                ? eventInfo.event_action
                : environment.gtmConfig.event_action,
              source_page_url:
                environment.gtmConfig.source_page_url + eventInfo.url,
              user_id: this.userId ? this.userId : undefined,
              outbound_link: environment.gtmConfig.outbound_link,
              event: environment.gtmConfig.event,
              event_label:
                eventInfo.text && eventInfo.text?.length > 1
                  ? `Label=${eventInfo.section}-${eventInfo.element}-${eventInfo.text}`
                  : `Label=${eventInfo.section}-${eventInfo.element}`,
              plan_name: this.plan ? this.plan.planName : undefined,
              product_category: this.customer ? this.customer : undefined,
              device: this.device ? this.device.toLowerCase() : undefined,
              payment_type: eventInfo.payment_type
                ? eventInfo.payment_type
                : undefined,
              price: eventInfo.price ? eventInfo.price : undefined,
              transaction_id: eventInfo.transaction_id
                ? eventInfo.transaction_id
                : undefined,
              add_ons: eventInfo.add_ons ? eventInfo.add_ons : undefined,
            };
            this.clean(data);
            this.pushTag(data);
            console.log('data', data);
          }
        })
        .catch(ex => {
          console.log('Error caught 1 - ', ex);
        });
    } catch (ex) {
      console.log('Error caught 2 - ', ex);
    }
  }

  fetchValues = async () => {
    this.plan = await firstValueFrom(this.planStore.pipe(select(planSelect)));
    this.customer = await firstValueFrom(
      this.customerStore.pipe(select(customerTypeSelect))
    );
    this.userId = await firstValueFrom(
      this.userStore.pipe(select(userIdSelect))
    );
    this.device = await firstValueFrom(this.lobStore.pipe(select(lobState)));
  };

  fetchValuesEcomm = async () => {
    this.plan = await firstValueFrom(this.planStore.pipe(select(planSelect)));
    this.customer = await firstValueFrom(
      this.customerStore.pipe(select(customerTypeSelect))
    );
    this.userId = await firstValueFrom(
      this.userStore.pipe(select(userIdSelect))
    );
    this.device = await firstValueFrom(this.lobStore.pipe(select(lobState)));
    this.orderId = await firstValueFrom(
      this.orderStore.pipe(select(orderIdSelector))
    );
    this.amount = await firstValueFrom(
      this.reviewStore.pipe(select(payStatusSelect))
    );
  };

  /**
   * Captures Ecommerce Purchase Event
   * @param eventInfo data
   */
  captureEcommEvent(eventInfo: any) {
    try {
      this.fetchValuesEcomm()
        .then(() => {
          const dataLayer = this.getDataLayer();
          // dataLayer.push({ ecommerce: null });
          if (eventInfo.ecommerce.checkout) {
            eventInfo.ecommerce.checkout.products[0].name = this.plan.planName;
            eventInfo.ecommerce.checkout.products[0].category = this.customer;
            eventInfo.ecommerce.checkout.products[0].price = this.plan.amount;
            eventInfo.ecommerce.checkout.products[0].variant =
              'sim-only-' + this.plan.planName;
          }
          if (eventInfo.ecommerce.purchase) {
            eventInfo.ecommerce.purchase.products[0].name = this.plan.planName;
            eventInfo.ecommerce.purchase.products[0].category = this.customer;
            eventInfo.ecommerce.purchase.products[0].price = this.plan.amount;
            eventInfo.ecommerce.purchase.products[0].variant =
              'sim-only-' + this.plan.planName;
            eventInfo.ecommerce.purchase.actionField.revenue =
              this.amount.toString();
            eventInfo.ecommerce.purchase.actionField.id = this.orderId;
            eventInfo.ecommerce.purchase.products[0].id = this.orderId;
          }

          console.log('Event ecomm - ', eventInfo);

          const purchase = eventInfo?.ecommerce?.purchase;
          const impressions = eventInfo?.ecommerce?.impressions;
          const add = eventInfo?.ecommerce?.add;
          const remove = eventInfo?.ecommerce?.remove;
          const checkout = eventInfo?.ecommerce?.checkout;
          const detail = eventInfo?.ecommerce?.detail;

          const data: any = {
            event: eventInfo?.event ? eventInfo.event : null,
            ecommerce: {
              currencyCode: eventInfo?.ecommerce?.currencyCode
                ? eventInfo.ecommerce.currencyCode
                : null,
            },
          };
          if (purchase) {
            data.ecommerce.purchase = this.getObject(purchase);
          }
          if (impressions) {
            data.ecommerce.impressions = this.getImpressions(impressions);
          }
          if (add?.products) {
            data.ecommerce.add = this.getAddToCart(add.products);
          }
          if (remove?.products) {
            data.ecommerce.remove = this.getRemoveFromCart(remove.products);
          }
          if (checkout) {
            data.ecommerce.checkout = this.getObject(checkout);
          }
          if (detail) {
            data.ecommerce.detail = this.getObject(detail);
          }
          this.clean(data);
          this.clean(data.ecommerce);
          this.pushTag(data);
          console.log('data ecomm', data);
        })
        .catch(ex => {
          console.log('gtm service captureEcommEvent catch :', ex);
        });
    } catch (ex) {
      // console.log('Error in ecomm - ', ex);
    }
  }

  getObject(object: any) {
    const actionField = object.actionField;
    const products = object.products;
    return {
      actionField: this.getActionField(actionField),
      products: products && products.length ? this.getProducts(products) : [],
    };
  }

  getActionField(actionField: any) {
    const actionObj = {
      id: actionField?.id ? actionField.id : null,
      affiliation: actionField?.affiliation ? actionField.affiliation : null,
      revenue: actionField?.revenue ? actionField.revenue : null,
      tax: actionField?.tax ? actionField.tax : null,
      shipping: actionField?.shipping ? actionField.shipping : null,
      coupon: actionField?.coupon ? actionField.coupon : null,
      step: actionField?.step ? actionField.step : null,
      list: actionField?.list ? actionField.list : null,
    };
    this.clean(actionObj);
    return actionObj;
  }

  getProducts(products: any) {
    const productList = products.map((product: any) => {
      const productMapped = {
        id: product?.id || '',
        category: product?.category ? product.category : null,
        sku: product?.sku ? product.sku : null,
        name: product?.name ? product.name : null,
        price: product?.price ? product.price : null,
        quantity: product?.quantity ? product.quantity : null,
        brand: product?.brand ? product.brand : null,
        variant: product?.variant ? product.variant : null,
      };
      this.clean(productMapped);
      return productMapped;
    });
    return productList;
  }

  getImpressions(impressions: any) {
    const impressionList = impressions.map((impression: any) => {
      const imprMapped = {
        name: impression?.name ? impression.name : null,
        id: impression?.id || '',
        price: impression?.price ? impression.price : null,
        brand: impression?.brand ? impression.brand : null,
        category: impression?.category ? impression.category : null,
        list: impression?.list ? impression.list : null,
        variant: impression?.variant ? impression.variant : null,
        variant_price: impression?.variant_price
          ? impression.variant_price
          : null,
        position: impression?.position ? impression.position : null,
      };
      this.clean(imprMapped);
      return imprMapped;
    });
    return impressionList;
  }

  getAddToCart(products: any) {
    return {
      products: this.getProducts(products),
    };
  }

  getRemoveFromCart(products: any) {
    return {
      products: this.getProducts(products),
    };
  }

  clean(data: any): any {
    return Object.keys(data).forEach(k => {
      if (data[k] === null || data[k] === undefined) {
        delete data[k];
      }
    });
  }
}
