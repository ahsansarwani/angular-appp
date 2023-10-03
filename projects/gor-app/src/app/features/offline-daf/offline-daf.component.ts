import { Component, HostListener, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, iif, Subject } from 'rxjs';
import { AppState } from '../../app-state/app.model';
import {
  CustomerTypeState,
  LobState,
} from '../plan-selector/state/plan-selector.model';
import { RedirectState } from '../redirect/state/redirect.model';
import { select, Store } from '@ngrx/store';
import { Observable, firstValueFrom } from 'rxjs';
import {
  idNumberSelector,
  firstNameSelector,
  lastNameSelector,
  dobSelector,
  middleNameSelector,
  sexSelector,
  genderSelector,
} from '../redirect/state/redirect.selector';
import {
  AddressResponse,
  DAFFillState,
} from '../daf-fill/state/daf-fill.model';
import {
  provinceSelector,
  citySelector,
  bgySelector,
  formSubmitStatusSelect,
  postalSelector,
} from '../daf-fill/state/daf-fill.selector';
import { DAFFillActions } from '../daf-fill/state/daf-fill.actionTypes';
import { EmailValidators } from '../daf-fill/state/daf-fill.validator';
import { EligibilityState } from '../eligibility/state/eligibility.model';
import { accountInfo } from '../eligibility/state/eligibility.selectors';
import {
  customerTypeSelect,
  lobState,
} from '../plan-selector/state/plan-selector.selectors';
import { DAFScanState } from '../daf-scan/state/daf-scan.model';
import {
  selectedIdNameSelector,
  selectedNationSelector,
} from '../daf-scan/state/daf-scan.selectors';
import { PlanBuilderService } from '../shared/components/plan-builder/services/plan-builder.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { AppActions } from '../../app-state/app.actionTypes';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  FTA_ZOLOZ_FAILED_PERSONAL_INFO_OFFLINE_PAGE,
  FTA_ZOLOZ_FAILED_PERSONAL_INFO_SUBMIT_BUTTON,
} from '../../globals/gtm-events/plan-selector/events';
import { GoogleTagManagerService } from '../../app-state/gtm.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { Meta, Title } from '@angular/platform-browser';
import { tags_offlineDaf } from '../../globals/redirection-links';
import { ChatbotService } from '../../app-state/chat.service';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/DD/YYYY', // Specify the input format
  },
  display: {
    dateInput: 'MM / DD / YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'gor-offline-daf',
  templateUrl: './offline-daf.component.html',
  styleUrls: ['./offline-daf.component.scss'],
  providers: [
    DatePipe,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class OfflineDafComponent implements OnInit {
  formSubmitted$: Observable<boolean>;
  formSubmitted: any;
  personalInfo$!: Observable<any>;
  personalInfo: any;
  addressInfo$!: Observable<any>;
  addressInfo: any;
  maxMobileNodigit = 11;
  restrictInput(value: string): string {
    const digitsOnly = value.replace(/\D/g, '');
    // const restrictedValue = digitsOnly.slice(0, 2) + digitsOnly.slice(2);
    return digitsOnly;
  }
  detailsFta = async () => {
    // this.idNumber = await firstValueFrom(this.idNumber$);
    // this.firstName = await firstValueFrom(this.firstName$);
    // this.lastName = await firstValueFrom(this.lastName$);
    // this.dob = await firstValueFrom(this.dob$);
    // this.middleName = await firstValueFrom(this.middleName$);
    // this.nationality = await firstValueFrom(this.nationality$);
    // this.idType = await firstValueFrom(this.idType$);
    // this.sex = await firstValueFrom(this.sex$);
    // this.gender = await firstValueFrom(this.gender$);
    // if (this.idType) this.myForm.controls['idType'].setValue(this.idType);
    // if (this.idNumber) this.myForm.controls['idNumber'].setValue(this.idNumber);
    // if (this.firstName)
    //   this.myForm.controls['firstName'].setValue(this.firstName);
    // if (this.middleName)
    //   this.myForm.controls['middleName'].setValue(this.firstName);
    // if (this.lastName) this.myForm.controls['lastName'].setValue(this.lastName);
    // if (this.dob)
    //   this.myForm.controls['birthday'].setValue(
    //     this.datePipe.transform(this.dob, 'yyyy-MM-dd')
    //   );
    // if (this.middleName)
    //   this.myForm.controls['middleName'].setValue(this.lastName);
    // if (this.nationality) {
    //   // this.dropdown[0].options = [this.nationality];
    //   this.triggerNationality.next({
    //     type: 'Nationality',
    //     value: this.nationality,
    //   });
    // }
    // if (this.sex) {
    //   this.triggerGender.next({
    //     type: 'sex',
    //     value:
    //       this.sex === 'M' ? 'Male' : this.sex === 'F' ? 'Female' : 'Other',
    //   });
    // } else if (this.gender) {
    //   this.triggerGender.next({
    //     type: 'sex',
    //     value:
    //       this.gender === 'M'
    //         ? 'Male'
    //         : this.gender === 'F'
    //         ? 'Female'
    //         : 'Other',
    //   });
    // }
    // this.myForm.controls['idType'].disable();
    // this.myForm.controls['idNumber'].disable();
    // this.myForm.controls['firstName'].disable();
    // this.myForm.controls['lastName'].disable();
    // this.myForm.controls['birthday'].disable();
    // this.myForm.controls['middleName'].disable();
    this.myForm2.controls['zipCode'].disable();
    this.myForm3.controls['zipCode'].disable();
  };
  currentDate: Date = new Date();
  minDate: any;
  maxDate: Date = new Date();
  async ngOnInit() {
    // gtm
    this.gtmService.captureGTMEvent(
      FTA_ZOLOZ_FAILED_PERSONAL_INFO_OFFLINE_PAGE
    );

    if (this.formSubmitted == false) {
      this.maxDate = new Date(
        this.currentDate.getFullYear() - 18,
        this.currentDate.getMonth(),
        this.currentDate.getDate()
      );
      this.minDate = new Date(
        this.currentDate.getFullYear() - 100,
        this.currentDate.getMonth(),
        this.currentDate.getDate()
      );

      this.store.dispatch(DAFFillActions.getProvinceInit());

      this.provinces$?.subscribe(value => {
        // this.nationalityList = value;
        if (value) {
          this.provinces = value;
          this.dropdown2[0].options = value.names ? value.names : [];
          if (this.province && value.names?.includes(this.province)) {
            this.triggerProvince.next({
              type: 'Province',
              value: this.province,
            });
          }
          this.dropdown2[0].disable = false;
        }
      });

      this.myForm
        .get('email')
        ?.valueChanges.pipe(debounceTime(500))
        .subscribe(email => {
          const expression = this.emailPattern;

          if (expression.test(email)) {
            this.visible = true;
          }
        });

      this.myForm.get('firstName')?.valueChanges.subscribe(value => {
        if (value) value = value.replace(/[^a-zA-Z-'\s]/g, '');

        this.myForm.get('firstName')?.setValue(value, { emitEvent: false });
      });
      this.myForm.get('birthday')?.valueChanges.subscribe(value => {});

      this.myForm.get('middleName')?.valueChanges.subscribe(value => {
        if (value) value = value.replace(/[^a-zA-Z-'\s]/g, '');

        this.myForm.get('middleName')?.setValue(value, { emitEvent: false });
      });
      this.myForm.get('lastName')?.valueChanges.subscribe(value => {
        if (value) value = value.replace(/[^a-zA-Z-'\s]/g, '');

        this.myForm.get('lastName')?.setValue(value, { emitEvent: false });
      });
      this.myForm.get('motherMaidenName')?.valueChanges.subscribe(value => {
        if (value) value = value.replace(/[^a-zA-Z-'\s]/g, '');
        this.myForm
          .get('motherMaidenName')
          ?.setValue(value, { emitEvent: false });
      });
      this.myForm2.get('houseNo')?.valueChanges.subscribe(value => {
        if (value) value = value.replace(/[^\w.,#-\s]/g, '');

        this.myForm2.get('houseNo')?.setValue(value, { emitEvent: false });
      });
      this.myForm2.get('street')?.valueChanges.subscribe(value => {
        if (value) value = value.replace(/[^\w.,#-\s]/g, '');

        this.myForm2.get('street')?.setValue(value, { emitEvent: false });
      });
      this.myForm2.get('village')?.valueChanges.subscribe(value => {
        if (value) value = value.replace(/[^\w.,#-\s]/g, '');

        this.myForm2.get('village')?.setValue(value, { emitEvent: false });
      });
      this.myForm3.get('floorNo')?.valueChanges.subscribe(value => {
        if (value) value = value.replace(/[^\w.,#-\s]/g, '');

        this.myForm3.get('floorNo')?.setValue(value, { emitEvent: false });
      });
      this.myForm3.get('building')?.valueChanges.subscribe(value => {
        if (value) value = value.replace(/[^\w.,#-\s]/g, '');

        this.myForm3.get('building')?.setValue(value, { emitEvent: false });
      });
      this.myForm3.get('_street')?.valueChanges.subscribe(value => {
        if (value) value = value.replace(/[^\w.,#-\s]/g, '');

        this.myForm3.get('_street')?.setValue(value, { emitEvent: false });
      });
      this.myForm3.get('_village')?.valueChanges.subscribe(value => {
        if (value) value = value.replace(/[^\w.,#-\s]/g, '');

        this.myForm3.get('_village')?.setValue(value, { emitEvent: false });
      });

      this.myForm.get('mobileNumber')?.valueChanges.subscribe(value => {
        value = value.replace(/\s/g, ''); // Remove any existing spaces from the input
        value = value.replace(/\D/g, '');

        if (value.length > 2) {
          value = value.slice(0, 2) + ' ' + value.slice(2);
        }
        if (value.length > 6) {
          value = value.slice(0, 6) + ' ' + value.slice(6);
        }
        // if (value > 5) value = value.match(/(.{1,6})/g).join(' ');

        this.myForm.get('mobileNumber')?.setValue(value, { emitEvent: false });
      });

      this.provinces$?.subscribe(value => {
        if (value) {
          this.provinces = value;
          this.dropdown2[0].options = value.names ? value.names : [];
          if (this.province && value.names?.includes(this.province)) {
            this.triggerProvince.next({
              type: 'Province',
              value: this.province,
            });
          }

          this.dropdown2[0].disable = false;
        }
      });

      this.cities$?.subscribe(value => {
        // this.nationalityList = value;

        if (value) {
          this.cities = value;

          this.dropdown2[1].options = value.names ? value.names : [];
          if (this.city && value.names?.includes(this.city)) {
            this.triggerProvince.next({
              type: 'City',
              value: this.city,
            });
          }

          // this.dropdown2[1].disable = false;
          // this.dropdown2[3].disable = false;
        }
      });

      this.bgys$?.subscribe(value => {
        // this.nationalityList = value;
        if (value) {
          this.bgys = value;
          this.dropdown2[2].options = value.names ? value.names : [];
          // this.dropdown2[2].disable = false;
          // this.dropdown2[3].options = value.postalCode
          //   ? [value.postalCode]
          //   : [];
          if (this.barangay && value.names?.includes(this.barangay)) {
            this.triggerBgy.next({
              type: 'Barangay',
              value: this.barangay,
            });
          }
        }
      });

      this.postalCodes$.subscribe(value => {
        if (value) {
          // this.postalCodes = value;
          if (this.addressDetails) {
            this.myForm2.controls['zipCode'].setValue(value.postalCode);
          } else {
            this.myForm3.controls['zipCode'].setValue(value.postalCode);
          }
        }
      });
    }
  }

  ngAfterViewInit() {
    // chat
    this.chatService.checkChat();
  }

  private formatDate(date: any): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day} / ${month} / ${year}`;
  }
  dropdown2: any = [
    {
      id: 'province',
      required: true,
      inputTitle: 'Province',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '130',
      options: [],
      inputId: 'province',
      disable: false,
    },
    {
      id: 'city',
      required: true,
      inputTitle: 'City',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '130',
      options: [],
      inputId: 'city',
      disable: true,
    },
    {
      id: 'barangay',
      required: true,
      inputTitle: 'Barangay',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '130',
      options: [],
      inputId: 'barangay',
      disable: true,
    },
    {
      id: 'zipCode',
      required: true,
      inputTitle: 'Zip Code',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '130',
      options: [],
      inputId: 'zip-code',
      disable: true,
      inputTag: true,
    },
  ];
  item = {
    title: 'Sex',
    required: true,
    options: ['Male', 'Female'],
  };
  addressDetails = true;
  isCity: any = false;

  onCheck() {
    this.addressDetails = !this.addressDetails;
    this.myForm2.reset();
    this.myForm3.reset();
  }
  inputs3 = [
    {
      id: 'floorNo',
      required: true,
      inputTitle: 'Floor / Unit No.',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '327',
      inputId: 'floor-unit-no',
      max: 10,
    },
    {
      id: 'building',
      required: true,
      inputTitle: 'Building Name',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '327',
      inputId: 'building',
      max: 50,
    },
    {
      id: '_street',
      required: true,
      inputTitle: 'Street',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '327',
      inputId: '_street',
      max: 40,
    },

    {
      id: '_village',
      required: false,
      inputTitle: 'Village',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '327',
      inputId: '_village',
      max: 50,
    },
  ];
  inputs2 = [
    {
      id: 'houseNo',
      required: true,
      inputTitle: 'House no.',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '327',
      inputId: 'house-no',
      max: 20,
    },
    {
      id: 'street',
      required: true,
      inputTitle: 'Street',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '327',
      inputId: 'street',
      max: 40,
    },
    {
      id: 'village',
      required: false,
      inputTitle: 'Village',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '327',
      inputId: 'village',
      max: 50,
    },
  ];
  visible = true;
  pattern1 = /^[a-zA-Z'-\s]+$/;
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  noSpecialCharactersPattern = /^[a-zA-Z0-9,.,#,-\s]+$/;
  lob$: Observable<string | undefined>;
  lob: any;
  constructor(
    private dateAdapter: DateAdapter<Date>,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private _store: Store<AppState>,
    private store: Store<DAFFillState>,
    private customerStore: Store<CustomerTypeState>,
    private dafScanStore: Store<DAFScanState>,
    private emailValidator: EmailValidators,
    private redirectStore: Store<RedirectState>,
    private eligibilityStore: Store<EligibilityState>,
    private chatService: ChatbotService,
    private _planBuilder: PlanBuilderService,
    private lobStore: Store<LobState>,
    private gtmService: GoogleTagManagerService,
    private meta: Meta,
    private title: Title
  ) {
    //set meta
    this.meta.addTags([
      { name: 'description', content: tags_offlineDaf.description },
    ]);
    this.title.setTitle(tags_offlineDaf.title);
    //

    this.lob$ = this.lobStore.pipe(select(lobState));
    this.lob$.subscribe(val => {
      // console.log('Device:', val);
      this.lob = val;
    });
    this.customerType$ = this.customerStore.pipe(select(customerTypeSelect));
    this.accountInformation$ = this.eligibilityStore.pipe(select(accountInfo));
    this.idNumber$ = this.redirectStore.pipe(select(idNumberSelector));
    this.firstName$ = this.redirectStore.pipe(select(firstNameSelector));
    this.lastName$ = this.redirectStore.pipe(select(lastNameSelector));
    this.dob$ = this.redirectStore.pipe(select(dobSelector));
    this.sex$ = this.redirectStore.pipe(select(sexSelector));
    this.gender$ = this.redirectStore.pipe(select(genderSelector));
    this.middleName$ = this.redirectStore.pipe(select(middleNameSelector));
    this.nationality$ = this.dafScanStore.pipe(select(selectedNationSelector));
    this.idType$ = this.dafScanStore.pipe(select(selectedIdNameSelector));
    this.myForm = this.fb.group({
      // nationality: ['', Validators.required ],
      // idType: ['', Validators.required ],

      firstName: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          this.emailValidator.noEmptySpacesValidator,
          this.emailValidator.noLeadingSpaceValidator,
          Validators.pattern(this.pattern1),
        ],
      ],
      middleName: [
        '',
        [
          Validators.required,
          Validators.maxLength(29),
          this.emailValidator.noEmptySpacesValidator,
          this.emailValidator.noLeadingSpaceValidator,
          Validators.pattern(this.pattern1),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          this.emailValidator.noEmptySpacesValidator,
          this.emailValidator.noLeadingSpaceValidator,
          Validators.pattern(this.pattern1),
        ],
      ],
      birthday: ['', [Validators.required]],
      gender: [
        '',
        [Validators.required, this.emailValidator.noEmptySpacesValidator],
      ],
      motherMaidenName: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          this.emailValidator.noEmptySpacesValidator,
          this.emailValidator.noLeadingSpaceValidator,
          Validators.pattern(this.pattern1),
        ],
      ],
      mobileNumber: [
        '',
        Validators.compose([
          Validators.required,
          this.emailValidator.noEmptySpacesValidator,
          Validators.pattern(/^\d{2}\s\d{3}\s\d{4}$/),
          Validators.maxLength(this.maxMobileNodigit),
        ]),
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          this.emailValidator.noEmptySpacesValidator,
          this.emailValidator.noLeadingSpaceValidator,
          Validators.email,
          Validators.pattern(this.emailPattern),
        ]),
        this.emailValidator.createValidator(),
      ],
    });
    this.myForm2 = this.fb.group({
      houseNo: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          this.emailValidator.noEmptySpacesValidator,
          this.emailValidator.noLeadingSpaceValidator,
          Validators.pattern(this.noSpecialCharactersPattern),
        ],
      ],
      street: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          this.emailValidator.noEmptySpacesValidator,
          this.emailValidator.noLeadingSpaceValidator,
          Validators.pattern(this.noSpecialCharactersPattern),
        ],
      ],
      village: [
        '',
        [
          Validators.maxLength(50),
          this.emailValidator.noEmptySpacesValidator,
          this.emailValidator.noLeadingSpaceValidator,
          Validators.pattern(this.noSpecialCharactersPattern),
        ],
      ],
      province: ['', [Validators.required]],
      city: ['', [Validators.required]],
      barangay: ['', [Validators.required]],
      zipCode: [{ value: '', disabled: true }, [Validators.required]],
    });
    this.myForm3 = this.fb.group({
      floorNo: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          this.emailValidator.noEmptySpacesValidator,
          this.emailValidator.noLeadingSpaceValidator,
          Validators.pattern(this.noSpecialCharactersPattern),
        ],
      ],
      building: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          this.emailValidator.noEmptySpacesValidator,
          this.emailValidator.noLeadingSpaceValidator,
          Validators.pattern(this.noSpecialCharactersPattern),
        ],
      ],
      _street: [
        '',
        [
          Validators.required,
          Validators.maxLength(40),
          this.emailValidator.noEmptySpacesValidator,
          this.emailValidator.noLeadingSpaceValidator,
          Validators.pattern(this.noSpecialCharactersPattern),
        ],
      ],
      _village: [
        '',
        [
          Validators.maxLength(50),
          this.emailValidator.noEmptySpacesValidator,
          this.emailValidator.noLeadingSpaceValidator,
          Validators.pattern(this.noSpecialCharactersPattern),
        ],
      ],
      province: ['', [Validators.required]],
      city: ['', [Validators.required]],
      barangay: ['', [Validators.required]],
      zipCode: [{ value: '', disabled: true }, [Validators.required]],
    });
    ////

    this.formSubmitted$ = this.store.pipe(select(formSubmitStatusSelect));
    const submitted = async () => {
      this.formSubmitted = await firstValueFrom(this.formSubmitted$);
      if (this.formSubmitted === false) {
        this.provinces$ = this.store.pipe(select(provinceSelector));
        this.cities$ = this.store.pipe(select(citySelector));
        this.bgys$ = this.store.pipe(select(bgySelector));
        this.postalCodes$ = this.store.pipe(select(postalSelector));
      } else {
      }
    };
    submitted();
  }
  submitText: string[] = [
    `By submitting this form, I understand and agree that any personal information provided as part of the service application will also be used for SIM Registration and will be processed in accordance with the SIM Registration Act, the Data Privacy Act of 2012, and the Privacy Policy of Globe.`,
    `I affirm that the information provided in the Application Form and the supporting documents submitted in connection therewith are true, authentic and correct.`,
  ];
  isEmailValid(id: any) {
    return this.myForm.get('email')?.errors?.['emailValid'] && id === 'email';
  }
  /////
  customerType$: Observable<string | undefined>;
  customerType?: string;
  idNumber$: Observable<string | undefined>;
  firstName$: Observable<string | undefined>;
  lastName$: Observable<string | undefined>;
  dob$: Observable<string | undefined>;
  middleName$: Observable<string | undefined>;
  nationality$: Observable<string | undefined>;
  idType$: Observable<string | undefined>;
  sex$: Observable<string | undefined>;
  gender$: Observable<string | undefined>;
  idNumber?: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  middleName?: string;
  motherName?: string;
  mobileNo?: string;
  nationality?: string;
  idType?: string;
  gender?: string;
  sex?: string;
  motherMaidenName?: string;
  street?: string;
  _street?: string;
  province?: string;
  city?: string;
  barangay?: string;
  postalCode?: string;
  accountInformation$: Observable<any>;
  accInfo: any;
  triggerNationality: Subject<any> = new Subject();
  triggerGender: Subject<any> = new Subject();
  triggerProvince: Subject<any> = new Subject();
  triggerCity: Subject<any> = new Subject();
  triggerBgy: Subject<any> = new Subject();
  //////
  provinces$!: Observable<AddressResponse | undefined>;
  provinces?: AddressResponse;
  selectedProvince?: string;
  cities$!: Observable<AddressResponse | undefined>;
  cities?: AddressResponse;
  selectedCity?: string;
  bgys$!: Observable<AddressResponse | undefined>;
  bgys?: AddressResponse;
  selectedBgy?: string;
  postalCodes$!: Observable<AddressResponse | undefined>;
  //////

  isValid() {
    const invalid = [];
    let controls = this.myForm2.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    controls = this.myForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }

    // if (this.myForm) {
    //   console.log('myform', this.findInvalidControls(this.myForm));
    // }
    // if (this.myForm2) {
    //   console.log('myform2', this.findInvalidControls(this.myForm2));
    // }
    // if (this.myForm3) {
    //   console.log('myform3', this.findInvalidControls(this.myForm3));
    // }
    // console.log(this.myForm.valid, this.myForm2.valid, this.myForm3.valid);

    return !(this.myForm.valid && (this.myForm2.valid || this.myForm3.valid));
  }

  public findInvalidControls(myform: any) {
    const invalid = [];
    const controls = myform.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  markFieldAsTouched(fieldName: string): void {
    const field = this.myForm.get(fieldName);
    const field2 = this.myForm2.get(fieldName);
    const field3 = this.myForm3.get(fieldName);

    if (field) {
      field?.markAsTouched();
    } else if (field2) {
      field2?.markAsTouched();
    } else if (field3) {
      field3?.markAsTouched();
    }
  }

  checkError(inpId: any) {
    return this.showError && this.errorInputId === inpId;
  }

  showError: any = false;
  errorInputId = '';

  checkInput(inputId: any) {
    this.showError = this.myForm.get(inputId)?.invalid;
    this.errorInputId = inputId;
  }

  isFieldInvalid(fieldName: string) {
    const field: any = this.myForm.get(fieldName);
    const field2 = this.myForm2.get(fieldName);
    const field3 = this.myForm3.get(fieldName);
    if (field) {
      return field?.invalid && (field?.dirty || field?.touched);
    } else if (field2) {
      return field2?.invalid && (field2?.dirty || field2?.touched);
    } else if (field3) {
      return field3?.invalid && (field3?.dirty || field3?.touched);
    }
  }

  onProceed(click: any) {
    this.gtmService.captureGTMEvent(
      FTA_ZOLOZ_FAILED_PERSONAL_INFO_SUBMIT_BUTTON
    );
    if (this.formSubmitted == false) {
      const mNo = '09' + this.myForm.get('mobileNumber')?.value;
      // this.myForm.get('mobileNumber')?.setValue(mNo.replace(/\s/g, ''));
      if (this.addressDetails) {
        this.store.dispatch(
          DAFFillActions.formSubmitFta({
            personalInfo: {
              ...this.myForm.getRawValue(),
              mobileNumber: mNo,
            },
            addressInfo: this.myForm2.getRawValue(),
            offlineMode: true,
            lob: this.lob,
          })
        );
      } else {
        this.store.dispatch(
          DAFFillActions.formSubmitFta({
            personalInfo: { ...this.myForm.getRawValue(), mobileNumber: mNo },
            addressInfo: this.myForm3.getRawValue(),
            offlineMode: true,
            lob: this.lob,
          })
        );
      }
    } else {
      this.store.dispatch(
        AppActions.navigate({
          from: 'OFFLINE_DAF_SUBMITTED',
        })
      );
    }
  }

  onInputKeyDown(event: any, id: any): void {
    if (id === 'mobileNumber') {
      // let cursorPosition = event.target['selectionStart'];
      //   // Prevent deleting the first two digits
      //   if (cursorPosition <= 2 && event.key === 'Backspace') {
      //     event.preventDefault();
      //     return;
      //   }
    }
  }
  selectedOption(opt: any, id: any) {
    this.myForm.get(id)?.setValue(opt.selectedOption);
  }
  selectedOption2(opt: any, id: any) {
    let index: any = undefined;

    switch (opt.title) {
      case 'Province':
        this.selectedProvince = opt.selectedOption;
        // console.log('selected', this.selectedProvince);
        // console.log('provinces', this.provinces);
        index = this.provinces?.names?.indexOf(opt.selectedOption).toString();

        if (this.addressDetails) {
          this.myForm2.controls['city'].setValue([]);
          this.myForm2.controls['zipCode'].setValue('');
          this.myForm2.controls['barangay'].setValue([]);
        } else {
          this.myForm3.controls['city'].setValue([]);
          this.myForm3.controls['zipCode'].setValue('');
          this.myForm3.controls['barangay'].setValue([]);
        }

        this.dropdown2[2].options = [];
        // console.log('index', index);
        if (index && index >= 0) {
          const code = this.provinces?.codes?.at(index);
          // console.log('code', code);
          if (code) {
            this.store.dispatch(DAFFillActions.getCityInit({ province: code }));
          }
        } else {
          console.log('index zero', index);
        }
        this.dropdown2[1].disable = false;
        this.dropdown2[2].disable = true;
        if (this.addressDetails) {
          this.myForm2.controls['province'].setValue(this.selectedProvince);
          // this.myForm2.controls['city'].enable();
        } else {
          this.myForm3.controls['province'].setValue(this.selectedProvince);
          // this.myForm3.controls['city'].enable();
        }
        // let CountryObj:Countries =  this.nationalityList.find( (t:Countries) => t.countryName === this.selectedNationality);
        // console.log(CountryObj);

        break;
      case 'City':
        this.selectedCity = opt.selectedOption;
        // console.log('citiess', this.cities);
        // console.log('selected', opt.selectedOption);
        index = this.cities?.names?.indexOf(opt.selectedOption);
        // console.log('index', index);
        // console.log('index type', typeof index);
        if (this.addressDetails) {
          this.myForm2.controls['zipCode'].setValue('');
          this.myForm2.controls['barangay'].setValue([]);
        } else {
          this.myForm3.controls['zipCode'].setValue('');
          this.myForm3.controls['barangay'].setValue([]);
        }

        if (typeof index == 'number' && index >= 0) {
          const code = this.cities?.codes?.at(index);

          if (code) {
            this.store.dispatch(DAFFillActions.getBarangayInit({ city: code }));
          }
        } else {
          console.log('index zero', index);
        }
        this.dropdown2[2].disable = false;
        if (this.addressDetails) {
          this.myForm2.controls['city'].setValue(this.selectedCity);
          // this.myForm2.controls['barangay'].enable();
        } else {
          this.myForm3.controls['city'].setValue(this.selectedCity);
          // this.myForm3.controls['barangay'].enable();
        }
        break;
      case 'Barangay':
        this.selectedBgy = opt.selectedOption;

        index = this.bgys?.names?.indexOf(opt.selectedOption);

        if (this.addressDetails) {
          this.myForm2.controls['zipCode'].setValue('');
        } else {
          this.myForm3.controls['zipCode'].setValue('');
        }

        if (typeof index == 'number' && index >= 0 && this.bgys?.codes) {
          const code = this.bgys.codes[index];

          if (code) {
            this.store.dispatch(
              DAFFillActions.getPostalInit({ barangay: code })
            );
          }
        }

        if (this.addressDetails) {
          this.myForm2.controls['barangay'].setValue(this.selectedBgy);
          // this.myForm2.controls['city'].enable();
        } else {
          this.myForm3.controls['barangay'].setValue(this.selectedBgy);
          // this.myForm3.controls['city'].enable();
        }

        break;
    }
  }

  inputNames = [
    {
      id: 'firstName',
      required: true,
      inputTitle: 'First Name',
      max: 30,
    },
    {
      id: 'middleName',
      required: true,
      inputTitle: 'Middle Name',
      max: 29,
    },
    {
      id: 'lastName',
      required: true,
      inputTitle: 'Last Name',
      max: 30,
    },
  ];

  inputDob = {
    id: 'birthday',
    required: true,
    inputTitle: 'Birthday',
    inputType: 'date',
    inputHeight: '44',
    inputWidth: '159',
    inputId: 'birthday',
  };

  inputGender = {
    id: 'gender',
    required: true,
    // inputTitle: 'Gender',
    inputType: 'text',
    inputHeight: '44',
    inputWidth: '159',
    inputId: 'gender-dropdown',

    dropDown: true,
  };
  inputs = [
    //0
    {
      dropDown: false,
      id: 'motherMaidenName',
      required: true,
      inputTitle: "Mother's Maiden Name (First, Middle, Last)",
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '327',
      inputId: 'mothers-name',
      isVisible: true,
      color: '#62768B',
      dropColor: '#203b59',
      max: 40,
    },
    //1
    {
      id: 'mobileNumber',
      required: true,
      inputTitle: 'Mobile Number',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '130',
      inputId: 'mobileNo',
      isVisible: true,
      color: '#62768b',
      dropColor: '#203b59',
      max: this.maxMobileNodigit,
    },
    //2
    {
      id: 'email',
      required: true,
      inputTitle: 'Email Address',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '130',
      iicon: true,
      inputId: 'email',
      isVisible: true,
      color: '#62768b',
      dropColor: '#1b458b',
    },
  ];
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const tooltips = document.querySelector('[data-title]');
    // Check if the clicked element is not the tooltip or the button
    const clickedElement = event.target as HTMLElement;
    if (
      !clickedElement.closest('app-tooltip') &&
      !clickedElement.closest('button') &&
      tooltips?.classList.contains('active')
    ) {
      tooltips?.classList.add('hide');
      tooltips?.classList.remove('active');
    }
  }
  iIconClicked(event: any, id: any) {
    // console.log('Event ', event);
    // console.log('clicked location');
    const tooltips = document.querySelector('[data-title]');

    tooltips?.classList.remove('hide');
    tooltips?.classList.add('active');
  }
  containerClick() {
    const tooltips = document.querySelector('[data-title]');
    if (tooltips?.classList.contains('active')) {
      tooltips?.classList.add('hide');
      tooltips?.classList.remove('active');
    }
  }
  myForm: FormGroup;
  myForm2: FormGroup;
  myForm3: FormGroup;
  openIdModal() {
    this._planBuilder.openIdModal();
  }
  isDynamic(id: any) {
    return id !== 'gender-dropdown' && id !== 'birthday';
  }
  isDynamic2(id: any) {
    return id === 'gender-dropdown' || id === 'birthday';
  }
}
