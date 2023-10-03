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
  selector: 'gor-custom-drop-down',
  templateUrl: './custom-drop-down.component.html',
  styleUrls: ['./custom-drop-down.component.scss'],
})
export class CustomDropDownComponent implements OnInit {
  ngOnChanges(changes: SimpleChanges) {
    if (this.required) this.selectedString = this.dropdownTitle;
    else if (this.dropDownOptions.length > 0)
      this.selectedString = this.dropDownOptions[0];
    console.log(this.dropDownOptions);
    this.displayedOptions = this.dropDownOptions;

    console.log(this.displayedOptions);
  }
  @Input() disable = false;
  @Input() searchallow = true;
  ngOnInit(): void {
    if (this.required) this.selectedString = this.dropdownTitle;
    else if (this.dropDownOptions.length > 0)
      this.selectedString = this.dropDownOptions[0];
    console.log(this.dropDownOptions);
    this.displayedOptions = this.dropDownOptions;

    this.triggerNationality.subscribe((v: any) => {
      this.selectValueParent(v.type, v.value);
      // console.log('value is changing', v);
    });
    this.triggerGender.subscribe((v: any) => {
      this.selectValueParent(v.type, v.value);
      // console.log('value is changing', v);
    });
    this.triggerProvince.subscribe((v: any) => {
      this.selectValueParent(v.type, v.value);
      // console.log('value is changing', v);
    });
    this.triggerCity.subscribe((v: any) => {
      this.selectValueParent(v.type, v.value);
      // console.log('value is changing', v);
    });
    this.triggerBgy.subscribe((v: any) => {
      this.selectValueParent(v.type, v.value);
      // console.log('value is changing', v);
    });
  }
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

  @Output() selectedOption = new EventEmitter<any>();

  displayedOptions: any;
  selectedString = '';
  containsText = (text: string, searchText: string) => {
    return text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
  };
  selectValue(option: any) {
    const selected = { title: this.dropdownTitle, selectedOption: option };
    this.selectedString = option;
    // console.log(selected)
    this.selectedOption.emit(selected);
  }
  selectValueParent(title: string, option: any) {
    const selected = { title: title, selectedOption: option };
    this.selectedString = option;
    // console.log(selected)
    this.selectedOption.emit(selected);
  }
  onChange(target: any) {
    const searchThis: string = target.value;
    const options = this.dropDownOptions.filter(item =>
      this.containsText(item, searchThis.trim())
    );
    console.log(options);
    this.displayedOptions = options;
  }
}
