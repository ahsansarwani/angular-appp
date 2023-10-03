import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'gor-selected-drop-down',
  templateUrl: './selected-drop-down.component.html',
  styleUrls: ['./selected-drop-down.component.scss'],
})
export class SelectedDropDownComponent {
  ngOnChanges(changes: SimpleChanges) {
    if (this.required) this.selectedString = this.dropdownTitle;
    else if (this.dropDownOptions.length > 0)
      this.selectedString = this.dropDownOptions[0];

    this.displayedOptions = this.dropDownOptions;
  }
  @Input() disable = false;
  @Input() searchallow = true;
  ngOnInit(): void {
    if (this.required) this.selectedString = this.dropdownTitle;
    else if (this.dropDownOptions.length > 0)
      this.selectedString = this.dropDownOptions[0];

    this.displayedOptions = this.dropDownOptions;

    this.triggerNationality.subscribe((v: any) => {
      // console.log('Nationality triggered');
      this.selectValueParent(v.type, v.value);
    });
    this.triggerGender.subscribe((v: any) => {
      console.log('Gender trigger');
      if (v != undefined) {
        this.selectValueParent(v.type, v.value);
      }
    });
    this.triggerProvince.subscribe((v: any) => {
      this.selectValueParent(v.type, v.value);
    });
    this.triggerCity.subscribe((v: any) => {
      this.selectValueParent(v.type, v.value);
    });
    this.triggerBgy.subscribe((v: any) => {
      this.selectValueParent(v.type, v.value);
    });
    this.selectedString = this.selectedValue;
  }
  @Input() selected = 'N';
  @Input() color = '#1A458B';
  @Input() dropColor = '#1A458B';
  @Input() required = true;
  @Input() dropDownHeight = '';
  @Input() dropDownWidth = '';
  @Input() dropdownTitle = '';
  @Input() dropDownOptions: string[] = [];
  @Input() triggerNationality: Subject<any> = new Subject();
  @Input() triggerGender: Subject<any> = new Subject();
  @Input() triggerProvince: Subject<any> = new Subject();
  @Input() triggerCity: Subject<any> = new Subject();
  @Input() triggerBgy: Subject<any> = new Subject();
  @Input() selectedValue = '';

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
  selectValueParent(title: string, option: any) {
    const selected = { title: title, selectedOption: option };
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
