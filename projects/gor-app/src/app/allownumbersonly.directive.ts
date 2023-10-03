import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[gorAllownumbersonly]',
})
export class AllownumbersonlyDirective {
  allNumeric: boolean = true;
  constructor(private el: ElementRef) {}

  @Output() onInputChangeEvent: EventEmitter<any> = new EventEmitter<any>();
  flag = 0;
  inputLength: any;
  initialValue: any;
  numericValue: any;
  @HostListener('input', ['$event'])
  onInputChange(event: Event) {
    const inputElement = this.el.nativeElement;
    const inputValue = inputElement.value;
    this.inputLength = inputValue.length;
    this.initialValue = this.el.nativeElement.value;
    this.numericValue = this.initialValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    this.el.nativeElement.value = this.numericValue;
    if (/[^0-9]/g.test(inputValue)) {
      this.allNumeric = false;
    } else {
      this.allNumeric = true;
    }
    if (this.initialValue !== this.numericValue) {
      this.allNumeric = false;
      event.stopPropagation(); // Prevent emitting an unnecessary input event
    }
    if (
      (event as InputEvent).inputType == 'insertFromPaste' &&
      /[^0-9]/g.test(inputValue)
    ) {
      this.el.nativeElement.value = '';
      this.allNumeric = false;
      event.stopPropagation();
    }
    this.onInputChangeEvent.emit({
      inputLength: this.inputLength,
      allNumeric: this.allNumeric,
    });
  }
}
