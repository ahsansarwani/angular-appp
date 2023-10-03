import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'gor-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.scss'],
})
export class YesNoDialogComponent {
  @Input() height = '48';
  @Input() width = '292';
  @Input() yesButtonText = 'Yes';
  @Input() noButtonText = 'No';
  @Input() disableYes = false;
  @Input() disableNo = false;
  @Input()
  dialogContent = `Are you sure to proceed with this order? Please note that your previous
order will be cancelled if you proceed.`;
  @Output() clickDialogbutton = new EventEmitter();
  @Output() clickCloseModal = new EventEmitter();

  onDialogClick(value: boolean) {
    this.clickDialogbutton.emit(value);
  }
  onCloseModal() {
    this.clickCloseModal.emit();
  }
}
