import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'gor-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent implements OnInit {
  ngOnChanges(changes: SimpleChanges) {
    if (this.required) this.selectedString = this.dropdownTitle;
    else if (this.dropDownOptions.length > 0)
      this.selectedString = this.dropDownOptions[0];

    this.displayedOptions = this.dropDownOptions;
  }
  @Input() disable = false;
  ngOnInit(): void {
    if (this.required) this.selectedString = this.dropdownTitle;
    else if (this.dropDownOptions.length > 0)
      this.selectedString = this.dropDownOptions[0];

    this.displayedOptions = this.dropDownOptions;
  }
  @Input() required = true;
  @Input() dropDownHeight = '';
  @Input() dropDownWidth = '';
  @Input() dropdownTitle = '';
  @Input() dropDownOptions: string[] = [];
  @Output() selectedOption = new EventEmitter<any>();
  displayedOptions: any;
  selectedString = '';
  containsText = (text: string, searchText: string) => {
    return text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  };
  selectValue(option: any) {
    const selected = { title: this.dropdownTitle, selectedOption: option };
    this.selectedString = option;

    this.selectedOption.emit(selected);
  }
  onChange(target: any) {
    const searchThis: string = target.value;
    const options = this.dropDownOptions.filter(item =>
      this.containsText(item, searchThis.trim())
    );

    this.displayedOptions = options;
  }
}
