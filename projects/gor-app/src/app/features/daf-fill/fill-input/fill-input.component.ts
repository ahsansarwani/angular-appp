import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'gor-fill-input',
  templateUrl: './fill-input.component.html',
  styleUrls: ['./fill-input.component.scss'],
})
export class FillInputComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.formControlName);
  }
  @Input() required = true;
  @Input() inputHeight = '';
  @Input() inputWidth = '';
  @Input() inputTitle = '';
  @Input() inputType = '';
  @Input() formControlName = '';
}
