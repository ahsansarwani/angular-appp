import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { DafReviewActions } from '../../state/daf-review.actionTypes';
import { DafReviewState } from '../../state/daf-review.model';
import { CardValidator } from '../../state/daf-review.validator';

declare let Xendit: any;
@Component({
  selector: 'gor-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss'],
})
export class PaymentCardComponent {
  creditCardNumberControl: FormControl;
  expiryDateControl: FormControl;
  cvvControl: FormControl;
  offCanvasElement: any;
  offCanvas: any;
  @Input() event?: Observable<void>;
  openDrawer?: Subscription;

  constructor(
    private dafReviewStore: Store<DafReviewState>,
    private cardCheck: CardValidator
  ) {
    this.expiryDateControl = new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern('^(0[1-9]|1[0-2])\\s?\\/\\s?[0-9]{2}$'),
      ],
      [this.cardCheck.cardValidityValidator()]
    );

    this.expiryDateControl.valueChanges.subscribe(value => {
      // console.log('valid errors', this.expiryDateControl);
      if (value.length === 2 && !value.includes(' ')) {
        this.expiryDateControl.setValue(`${value} / `, { emitEvent: false });
      }
    });
    this.cvvControl = new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{3,4}$'),
        Validators.minLength(3),
        Validators.maxLength(3),
      ],
      [this.cardCheck.cardCvnValidator()]
    );

    this.cvvControl.valueChanges.subscribe(value => {
      if (value.length > 4) {
        this.cvvControl.setValue(value.slice(0, 4), { emitEvent: false });
      }
      // console.log('cvv errors', this.cvvControl);
    });

    this.creditCardNumberControl = new FormControl(
      '',
      [Validators.required, Validators.pattern(/^(\d{4}\s?){4}$/)],
      [this.cardCheck.cardNoValidator()]
    );

    this.creditCardNumberControl.valueChanges.subscribe(value => {
      value = value.replace(/\s/g, ''); // Remove any existing spaces from the input

      if (value.length > 16) {
        value = value.slice(0, 16); // Truncate to a maximum of 16 characters
      }

      if (value.length > 4 && value.length <= 16) {
        value = value.match(/.{1,4}/g).join(' '); // Add space after every 4 characters
      }

      // console.log('cardNo errors', this.creditCardNumberControl);
      this.creditCardNumberControl.setValue(value, { emitEvent: false });
    });
  }

  ngOnInit() {
    this.openDrawer = this.event?.subscribe(() => {
      // console.log('Value changed');
      if (this.offCanvasElement) {
        // this.offCanvas.toggle();
        this.offCanvas = document.getElementById('toggleDrawer') as HTMLElement;
        this.offCanvas?.click();
        // console.log(this.offCanvas);
        // this.offCanvas.this.offCanvasElement.classList.add('show'); // Add the "show" class to display the modal
        // this.offCanvasElement.style.display = 'block'; // Set the display property to "block"
      }
    });
  }

  ngAfterViewInit() {
    this.offCanvasElement = document.getElementById('offcanvasBottom');
    if (window.innerWidth < 500) {
      this.offCanvasElement?.classList.remove('offcanvas-end');
      this.offCanvasElement?.classList.add('offcanvas-bottom');
    } else {
      this.offCanvasElement?.classList.add('offcanvas-end');
      this.offCanvasElement?.classList.remove('offcanvas-bottom');
    }
  }

  creditCardNumber = '';
  @ViewChild('cardNum') cardNumInput: ElementRef | undefined;
  formatCreditCardNumber(inputElement: any) {
    const inputValue = inputElement.value;
    let caretPosition = inputElement.selectionStart;
    const sanitizedValue = inputValue.replace(/[^0-9]/gi, '');
    const parts = [];

    for (let i = 0, len = sanitizedValue.length; i < len; i += 4) {
      parts.push(sanitizedValue.substring(i, i + 4));
    }

    for (let i = caretPosition - 1; i >= 0; i--) {
      const c = inputValue[i];
      if (c < '0' || c > '9') {
        caretPosition--;
      }
    }

    const formattedValue = parts.join(' ');
    inputElement.value = formattedValue;

    // Update the caret position
    const updatedCaretPosition = caretPosition + Math.floor(caretPosition / 4);
    inputElement.setSelectionRange(updatedCaretPosition, updatedCaretPosition);
  }
  @ViewChild('validThru') validThruInput: ElementRef | undefined;

  formatValidThru(inputElement: any) {
    const inputValue = inputElement.value;
    let caretPosition = inputElement.selectionStart;
    const sanitizedValue = inputValue.replace(/[^0-9\/]/gi, '');
    const parts = [];

    for (let i = 0, len = sanitizedValue.length; i < len; i += 2) {
      parts.push(sanitizedValue.substring(i, i + 2));
    }

    for (let i = caretPosition - 1; i >= 0; i--) {
      const c = inputValue[i];
      if (c < '0' || c > '9') {
        caretPosition--;
      }
    }

    const formattedValue = parts.join(' ');
    inputElement.value = formattedValue;

    // Update the caret position
    const updatedCaretPosition = caretPosition + Math.floor(caretPosition / 2);
    inputElement.setSelectionRange(
      updatedCaretPosition + 1,
      updatedCaretPosition + 1
    );
  }
  @ViewChild('cvv') cvv: ElementRef | undefined;
  formatCvvNumber(inputElement: any) {
    const inputValue = inputElement.value;
    const caretPosition = inputElement.selectionStart;
    const sanitizedValue = inputValue.replace(/[^0-9]/gi, '');
    inputElement.value = sanitizedValue;
  }

  onPaybill() {
    setTimeout(() => {
      this.dafReviewStore.dispatch(
        DafReviewActions.initXendit({
          cardNo: this.creditCardNumberControl.value,
          validity: this.expiryDateControl.value,
          cvn: this.cvvControl.value,
        })
      );
    }, 500);
  }

  isValid() {
    // console.log(
    //   this.creditCardNumberControl.errors,
    //   this.expiryDateControl.errors,
    //   this.cvvControl.errors
    // );

    // console.log(
    //   this.creditCardNumberControl.invalid,
    //   this.expiryDateControl.invalid,
    //   this.cvvControl.invalid
    // );
    return (
      this.creditCardNumberControl.invalid ||
      this.expiryDateControl.invalid ||
      this.cvvControl.invalid
    );
  }

  cardInfoButtons = [
    {
      id: 'visa-card',
      cardSvg: 'assets/images/svg/visa.svg',
    },
    {
      id: 'master-card',
      cardSvg: 'assets/images/svg/mastercard.svg',
    },
    { id: 'jcb-card', cardSvg: 'assets/images/svg/jcb.svg' },
    { id: 'express-card', cardSvg: 'assets/images/svg/express.svg' },
  ];

  cardSelection = true;

  onCardClick(id: string) {
    console.log(id);
  }

  isFieldInvalid(field: any, key: string) {
    if (field) {
      if (
        field?.errors &&
        field?.errors[key] !== null &&
        field?.errors[key] !== undefined
      ) {
        return (
          field?.invalid &&
          field?.errors[key] &&
          (field?.dirty || field?.touched)
        );
      } else {
        return field?.invalid && (field?.dirty || field?.touched);
      }
    }
  }

  pasteTriggered(event: any) {
    const pastedText = event.clipboardData.getData('text');

    // Check if the pasted text contains any non-numeric characters
    if (!/^\d+$/.test(pastedText)) {
      // If non-numeric characters are found, prevent the paste
      event.preventDefault();
      return false;
    }

    // Allow the paste if it contains only numeric characters
    return true;
  }
}
