import { Component, HostListener, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { AppState } from '../../app-state/app.model';
import {
  CustomerTypeState,
  LobState,
  PlanState,
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
import { AddressResponse, DAFFillState } from './state/daf-fill.model';
import {
  provinceSelector,
  citySelector,
  bgySelector,
  formSubmitStatusSelect,
  personalInfoSelect,
  addressInfoSelect,
  postalSelector,
} from './state/daf-fill.selector';
import { DAFFillActions } from './state/daf-fill.actionTypes';
import { EmailValidators } from './state/daf-fill.validator';
import { EligibilityState } from '../eligibility/state/eligibility.model';
import {
  accountInfo,
  mobileNo,
} from '../eligibility/state/eligibility.selectors';
import {
  customerTypeSelect,
  lobState,
  planSelect,
} from '../plan-selector/state/plan-selector.selectors';
import { DAFScanState } from '../daf-scan/state/daf-scan.model';
import {
  selectedIdNameSelector,
  selectedNationSelector,
} from '../daf-scan/state/daf-scan.selectors';
import { OtpState } from '../otp/state/otp.reducer';
import { mobileNoSelect } from '../otp/state/otp.selectors';
import { AppActions } from '../../app-state/app.actionTypes';
import {
  ADA_PERSONAL_INFO_LANDING_PAGE,
  ADA_PERSONAL_INFO_LETS_DO_THIS,
  ECOMM_DAF_CLICK,
  ECOMM_DAF_LOAD,
  FTA_PERSONAL_INFO_LANDING_PAGE,
  FTA_PERSONAL_INFO_LETS_DO_THIS,
} from '../../globals/gtm-events/plan-selector/events';
import { GoogleTagManagerService } from '../../app-state/gtm.service';
import { tags_personalInfo } from '../../globals/redirection-links';
import { Meta, Title } from '@angular/platform-browser';
import { PlanBuilderService } from '../shared/components/plan-builder/services/plan-builder.service';
import { ChatbotService } from '../../app-state/chat.service';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
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
  selector: 'gor-daf-fill',
  templateUrl: './daf-fill.component.html',
  styleUrls: ['./daf-fill.component.scss'],
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
export class DafFillComponent implements OnInit {
  lob$: Observable<string | undefined>;
  selectedGender = '';
  na_value = 'NA';
  restrictInput(value: string): string {
    const digitsOnly = value.replace(/\D/g, '');
    const restrictedValue = digitsOnly.slice(0, 2) + digitsOnly.slice(2);
    return restrictedValue;
  }
  steps = [
    {
      no: 1,
      stepDesc:
        'Please provide your ID for verification and registration purposes.',
    },
    {
      no: 2,
      stepDesc: 'Let’s get to know you more',
    },
    {},
    {},
  ];
  submitText: string[] = [
    `By submitting this form, I understand and agree that any personal information provided as part of the service application will also be used for SIM Registration and will be processed in accordance with the SIM Registration Act, the Data Privacy Act of 2012, and the Privacy Policy of Globe.`,
    `I affirm that the information provided in the application form and the supporting documents submitted in connection therewith are true, authentic and correct.`,
  ];

  myForm: FormGroup;
  myForm2: FormGroup;
  myForm3: FormGroup;
  isSelected = false;
  visible = false;
  /////
  formSubmitted$: Observable<boolean>;
  formSubmitted: any;
  personalInfo$!: Observable<any>;
  personalInfo: any;
  addressInfo$!: Observable<any>;
  addressInfo: any;
  customerType$!: Observable<string | undefined>;
  customerType?: string;
  idNumber$!: Observable<string | undefined>;
  firstName$!: Observable<string | undefined>;
  lastName$!: Observable<string | undefined>;
  dob$!: Observable<string | undefined>;
  middleName$!: Observable<string | undefined>;
  nationality$!: Observable<string | undefined>;
  idType$!: Observable<string | undefined>;
  sex$!: Observable<string | undefined>;
  gender$!: Observable<string | undefined>;
  mobileNo$!: Observable<string | undefined>;
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
  accountInformation$!: Observable<any>;
  accInfo: any;
  triggerNationality: Subject<any> = new Subject();
  triggerGender: Subject<any> = new Subject();
  triggerProvince: Subject<any> = new Subject();
  triggerCity: Subject<any> = new Subject();
  triggerBgy: Subject<any> = new Subject();
  email?: string;
  nameEdit = {
    firstName: true,
    middleName: true,
    lastName: true,
    motherMaidenName: true,
  };
  //////
  provinces$!: Observable<AddressResponse | undefined>;
  provinces: any;
  selectedProvince?: string;
  cities$!: Observable<AddressResponse | undefined>;
  cities?: any;
  selectedCity?: string;
  bgys$!: Observable<AddressResponse | undefined>;
  bgys?: any;
  postalCodes$!: Observable<AddressResponse | undefined>;
  selectedBgy?: string;
  //////
  currDate: Date = new Date();
  minDate: Date = new Date();
  maxDate: Date = new Date();
  maxMobNoLength = 11;
  noEmptySpacesValidator(control: any) {
    if (control.value && control.value.trim() === '') {
      return { emptySpaces: true };
    }
    return null;
  }
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  noSpecialCharactersPattern = /^[a-zA-Z0-9,.,#,-\s]+$/;
  pattern1 = /^[a-zA-Z'-\s]+$/;
  plan: any;
  scrollToTop() {
    window.scrollTo(0, 0);
  }

  constructor(
    private lobStore: Store<LobState>,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private _store: Store<AppState>,
    private store: Store<DAFFillState>,
    private customerStore: Store<CustomerTypeState>,
    private dafScanStore: Store<DAFScanState>,
    private emailValidator: EmailValidators,
    private redirectStore: Store<RedirectState>,
    private otpStore: Store<OtpState>,
    private eligibilityStore: Store<EligibilityState>,
    private gtmService: GoogleTagManagerService,
    private meta: Meta,
    private title: Title,
    private _planBuilder: PlanBuilderService,
    private chatService: ChatbotService,
    private planStore: Store<PlanState>
  ) {
    //set meta
    this.meta.addTags([
      { name: 'description', content: tags_personalInfo.description },
    ]);
    this.title.setTitle(tags_personalInfo.title);
    //

    this.lob$ = this.lobStore.pipe(select(lobState));
    this.minDate.setFullYear(this.currDate.getFullYear() - 100);
    this.maxDate.setFullYear(this.currDate.getFullYear() - 18);

    this.myForm = this.fb.group({
      nationality: [
        '',
        [Validators.required, this.emailValidator.noEmptySpacesValidator],
      ],
      idType: ['', [this.emailValidator.noEmptySpacesValidator]],
      sex: [
        '',
        [Validators.required, this.emailValidator.noEmptySpacesValidator],
      ],
      idNumber: ['', [this.emailValidator.noEmptySpacesValidator]],
      firstName: [
        '',
        [
          Validators.required,
          this.emailValidator.noEmptySpacesValidator,
          this.emailValidator.noLeadingSpaceValidator,
          Validators.pattern(this.pattern1),
        ],
      ],
      middleName: [
        '',
        [
          Validators.required,
          this.emailValidator.noEmptySpacesValidator,
          this.emailValidator.noLeadingSpaceValidator,
          Validators.pattern(this.pattern1),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          this.emailValidator.noEmptySpacesValidator,
          this.emailValidator.noLeadingSpaceValidator,
          Validators.pattern(this.pattern1),
        ],
      ],
      birthday: ['', [Validators.required]],
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
          Validators.maxLength(this.maxMobNoLength),
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
      zipCode: ['', [Validators.required]],
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
      zipCode: ['', [Validators.required]],
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
      if (this.nameEdit.firstName !== false) {
        if (value) value = value.replace(/[^a-zA-Z'-\s]/g, '');
      }
      this.myForm.get('firstName')?.setValue(value, { emitEvent: false });
    });

    this.myForm.get('middleName')?.valueChanges.subscribe(value => {
      if (this.nameEdit.middleName !== false) {
        if (value) value = value.replace(/[^a-zA-Z'-\s]/g, '');
      }
      this.myForm.get('middleName')?.setValue(value, { emitEvent: false });
    });
    this.myForm.get('lastName')?.valueChanges.subscribe(value => {
      if (this.nameEdit.lastName !== false) {
        if (value) value = value.replace(/[^a-zA-Z'-\s]/g, '');
      }
      this.myForm.get('lastName')?.setValue(value, { emitEvent: false });
    });

    this.myForm.get('motherMaidenName')?.valueChanges.subscribe(value => {
      if (this.nameEdit.motherMaidenName !== false) {
        if (value) value = value.replace(/[^a-zA-Z'-\s]/g, '');
      }

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
      console.log('mobile number value changes', value);
      value = value.replace(/\s/g, ''); // Remove any existing spaces from the input
      value = value.replace(/\D/g, '');
      if (value.length >= 11) {
        const match = value.match(/^(\d{4})(\d{3})(\d{4})$/); // Match groups of digits
        console.log('match');
        if (match) {
          value = `${match[1]} ${match[2]} ${match[3]}`;
        }
      } else {
        if (value.length > 2) {
          value = value.slice(0, 2) + ' ' + value.slice(2);
        }
        if (value.length > 6) {
          value = value.slice(0, 6) + ' ' + value.slice(6);
        }
      }
      // if (value > 5) value = value.match(/(.{1,6})/g).join(' ');

      this.myForm.get('mobileNumber')?.setValue(value, { emitEvent: false });
    });

    this.formSubmitted$ = this.store.pipe(select(formSubmitStatusSelect));
    const submitted = async () => {
      this.formSubmitted = await firstValueFrom(this.formSubmitted$);
      if (this.formSubmitted === true) {
        this.personalInfo$ = this.store.pipe(select(personalInfoSelect));
        this.addressInfo$ = this.store.pipe(select(addressInfoSelect));
        this.personalInfo = await firstValueFrom(this.personalInfo$);
        this.addressInfo = await firstValueFrom(this.addressInfo$);
      } else {
        this.customerType$ = this.customerStore.pipe(
          select(customerTypeSelect)
        );
        this.accountInformation$ = this.eligibilityStore.pipe(
          select(accountInfo)
        );
        this.idNumber$ = this.redirectStore.pipe(select(idNumberSelector));
        this.firstName$ = this.redirectStore.pipe(select(firstNameSelector));
        this.lastName$ = this.redirectStore.pipe(select(lastNameSelector));
        this.dob$ = this.redirectStore.pipe(select(dobSelector));
        this.sex$ = this.redirectStore.pipe(select(sexSelector));
        this.gender$ = this.redirectStore.pipe(select(genderSelector));
        this.middleName$ = this.redirectStore.pipe(select(middleNameSelector));
        this.nationality$ = this.dafScanStore.pipe(
          select(selectedNationSelector)
        );
        this.idType$ = this.dafScanStore.pipe(select(selectedIdNameSelector));
        this.mobileNo$ = this.otpStore.pipe(select(mobileNoSelect));

        ////
        this.provinces$ = this.store.pipe(select(provinceSelector));
        this.cities$ = this.store.pipe(select(citySelector));
        this.bgys$ = this.store.pipe(select(bgySelector));
        this.postalCodes$ = this.store.pipe(select(postalSelector));
      }
    };
    submitted();
  }
  prefix = '09';
  ada = false;
  condoDisabled = false;
  async ngOnInit() {
    this.plan = this.planStore.pipe(select(planSelect));
    if (this.formSubmitted === false) {
      this.condoDisabled = false;
      this.store.dispatch(DAFFillActions.getProvinceInit());
      this.customerType = await firstValueFrom(this.customerType$);

      const detailsFta = async () => {
        this.myForm.get('idType')?.setValidators(Validators.required);
        this.myForm.get('idNumber')?.setValidators(Validators.required);
        this.myForm.get('idType')?.updateValueAndValidity();
        this.myForm.get('idNumber')?.updateValueAndValidity();

        this.idNumber = await firstValueFrom(this.idNumber$);
        this.firstName = await firstValueFrom(this.firstName$);
        this.lastName = await firstValueFrom(this.lastName$);
        this.dob = await firstValueFrom(this.dob$);
        this.middleName = await firstValueFrom(this.middleName$);
        this.nationality = await firstValueFrom(this.nationality$);
        this.idType = await firstValueFrom(this.idType$);
        this.sex = await firstValueFrom(this.sex$);
        this.gender = await firstValueFrom(this.gender$);
        this.mobileNo = await firstValueFrom(this.mobileNo$);
        if (this.idType) {
          this.myForm.controls['idType'].setValue(this.idType);
          this.myForm.controls['idType'].disable();
        }
        if (this.idNumber) {
          this.myForm.controls['idNumber'].setValue(this.idNumber);
          this.myForm.controls['idNumber'].disable();
        }
        this.nameEdit.middleName = false;
        this.nameEdit.lastName = false;
        if (this.firstName) {
          this.nameEdit.firstName = false;
          this.myForm.controls['firstName'].setValue(this.firstName);
          this.myForm.controls['firstName'].disable();
        }
        if (this.middleName) {
          this.myForm.controls['middleName'].setValue(this.middleName);
          this.myForm.controls['middleName'].disable();
        } else {
          this.myForm.controls['middleName'].setValue(this.na_value);
          this.myForm.controls['middleName'].disable();
        }
        if (this.lastName) {
          this.myForm.controls['lastName'].setValue(this.lastName);
          this.myForm.controls['lastName'].disable();
        } else {
          this.myForm.controls['lastName'].setValue(this.na_value);
          this.myForm.controls['lastName'].disable();
        }
        if (this.dob) {
          console.log('dob disabling 0');
          this.myForm.controls['birthday'].setValue(
            this.datePipe.transform(this.dob, 'yyyy-MM-dd')
          );
          console.log('dob disabling 1');
          this.myForm.controls['birthday'].disable();
        }
        if (this.nationality) {
          this.dropdown[0].options = [this.nationality];
          this.triggerNationality.next({
            type: 'nationality',
            value: this.nationality,
          });
        }
        console.log('adding mob no');
        if (this.mobileNo) {
          this.mobileNo = this.mobileNo.slice(2);

          if (this.mobileNo.length === 13) {
            this.prefix = '';
          } else if (this.mobileNo.length === 10 && this.mobileNo[0] !== '0') {
            this.prefix = '0';
          } else if (this.mobileNo.length === 9 && this.mobileNo[0] !== '0') {
            this.prefix = '09';
          }
          // const match = mNo.match(/^(\d{4})(\d{3})(\d{4})$/); // Match groups of digits
          // console.log('match');
          // if (match) {
          //   mNo = `${match[1]} ${match[2]} ${match[3]}`;
          // }

          // console.log('prefix', this.prefix);
          // console.log('mNo', mNo);
          // console.log('mobile', this.mobileNo);
          this.myForm.controls['mobileNumber'].setValue(
            this.prefix + this.mobileNo
          );
          this.myForm.controls['mobileNumber'].disable();
        }
        if (this.sex) {
          this.selectedGender = this.sex;
          this.triggerGender.next({
            type: 'sex',
            value:
              this.sex === 'M'
                ? 'Male'
                : this.sex === 'F'
                ? 'Female'
                : undefined,
          });
        } else if (this.gender) {
          this.selectedGender = this.gender;
          this.triggerGender.next({
            type: 'sex',
            value:
              this.gender === 'M'
                ? 'Male'
                : this.gender === 'F'
                ? 'Female'
                : undefined,
          });
        } else {
          this.selectedGender = '';
          // this.triggerGender.next({
          //   type: 'sex',
          //   value: 'Female',
          // });
        }
        console.log('gender FTA::', this.selectedGender);
        this.myForm.get('sex')?.updateValueAndValidity();
        this.myForm2.controls['zipCode'].disable();
        this.myForm3.controls['zipCode'].disable();
      };

      const detailsAda = async () => {
        this.ada = true;
        this.inputs[0].isVisible = false;
        this.inputs[1].isVisible = false;
        this.visible = true;
        this.accInfo = await firstValueFrom(this.accountInformation$);
        this.firstName = this.accInfo?.firstName;
        // if (!this.firstName) {
        //   this.myForm.get('firstName')?.valueChanges.subscribe(value => {
        //     if (value) value = value.replace(/[^a-zA-Z'-\s]/g, '');
        //     this.myForm.get('firstName')?.setValue(value, { emitEvent: false });
        //   });
        // }

        this.middleName = this.accInfo?.middleName;
        this.lastName = this.accInfo?.lastName;
        this.dob = this.accInfo?.birthday;
        this.nationality = this.accInfo?.citizenship;
        this.email = this.accInfo?.email;
        if (!this.nationality) {
          this.nationality = 'Filipino';
        }
        this.gender = this.accInfo?.gender;

        this.motherMaidenName = this.accInfo?.motherMaidenName;
        this.mobileNo = await firstValueFrom(this.mobileNo$);

        this.street = this.accInfo?.street;
        this.province = this.accInfo?.province;
        this.city = this.accInfo?.city;
        this.barangay = this.accInfo?.subdivisionVillage;
        // this.accInfo = firstValueFrom(this.accountInformation$);

        this.myForm.controls['birthday'].setValue(
          this.datePipe.transform(this.dob, 'yyyy-MM-dd')
        );
        if (this.firstName) {
          this.nameEdit.firstName = false;
          this.myForm.controls['firstName'].setValue(this.firstName);
        }
        if (this.middleName) {
          this.nameEdit.middleName = false;
          this.myForm.controls['middleName'].setValue(this.middleName);
        }
        if (this.lastName) {
          this.nameEdit.lastName = false;
          this.myForm.controls['lastName'].setValue(this.lastName);
        }
        if (this.nationality) {
          this.dropdown[0].options = [this.nationality];
          // this.dropdown[0].selected = this.nationality;
          this.selectedNationality = '';
          this.triggerNationality.next({
            type: 'nationality',
            value: this.nationality,
          });
        }
        if (this.gender) {
          if (this.gender === 'M') {
            this.triggerGender.next({
              type: 'sex',
              value: 'Male',
            });
            this.selectedGender = this.gender;
            // this.dropdown[1].selected = 'Male';
          } else if (this.gender === 'F') {
            this.triggerGender.next({
              type: 'sex',
              value: 'Female',
            });
            // this.dropdown[1].selected = 'Female';
          }
        } else {
          this.selectedGender = '';
          // this.triggerGender.next({
          //   type: 'sex',
          //   value: 'Female',
          // });
        }
        console.log('gender ADA::', this.selectedGender);
        if (this.motherMaidenName) {
          this.nameEdit.motherMaidenName = false;
          this.myForm.controls['motherMaidenName'].setValue(
            this.motherMaidenName
          );
          this.myForm.controls['motherMaidenName'].disable();
        }
        if (this.mobileNo) {
          this.mobileNo = this.mobileNo.slice(2);

          if (this.mobileNo.length === 13) {
            this.prefix = '';
          } else if (this.mobileNo.length === 10 && this.mobileNo[0] !== '0') {
            this.prefix = '0';
          } else if (this.mobileNo.length === 9 && this.mobileNo[0] !== '0') {
            this.prefix = '09';
          }

          this.myForm.controls['mobileNumber'].setValue(
            this.prefix + this.mobileNo
          );
        }
        if (this.street) {
          this.myForm2.controls['street'].setValue(this.street);
        }
        if (this.email) {
          this.myForm.controls['email'].setValue(this.email);
        }
        // this.myForm.controls['idType'].disable();
        // this.myForm.controls['idNumber'].disable();
        this.myForm.controls['firstName'].disable();
        this.myForm.controls['lastName'].disable();
        console.log('dob disabling 2');
        this.myForm.controls['birthday'].disable();
        console.log('dob disabling 3');
        this.myForm.controls['middleName'].disable();
        this.myForm.controls['mobileNumber'].disable();
        this.myForm2.controls['zipCode'].disable();
        this.myForm3.controls['zipCode'].disable();
      };

      //for fta
      if (this.customerType == 'FTA') {
        this.gtmService.captureGTMEvent(FTA_PERSONAL_INFO_LANDING_PAGE);
        detailsFta();
      } else {
        this.gtmService.captureGTMEvent(ADA_PERSONAL_INFO_LANDING_PAGE);
        detailsAda();
      }

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
    } else {
      //Here
      this.customerType = await firstValueFrom(
        this.customerStore.pipe(select(customerTypeSelect))
      );
      this.selectedNationality = this.personalInfo.nationality;

      this.selectedAddress.push(this.addressInfo.province);
      this.selectedAddress.push(this.addressInfo.city);
      this.selectedAddress.push(this.addressInfo.barangay);

      // console.log('selected:');
      // console.log(this.selectedNationality);
      // console.log(this.selectedGender);
      // console.log(this.selectedAddress);
      let m = '';
      if (this.personalInfo.mobileNumber.length === 11) {
        m = this.personalInfo.mobileNumber.slice(2);
      }
      // console.log('m', m, this.personalInfo.mobileNumber);
      this.myForm.patchValue({ ...this.personalInfo, mobileNumber: m });

      if (this.personalInfo.sex) {
        // this.selectedGender = this.sex;
        this.triggerGender.next({
          type: 'sex',
          value: this.personalInfo.sex,
        });
      }

      if (this.addressInfo && this.addressInfo.houseNo) {
        this.myForm2.setValue({ ...this.addressInfo });
        this.addressDetails = true;
      } else {
        this.addressDetails = false;
        this.myForm3.setValue({ ...this.addressInfo });
      }

      if (this.customerType == 'ADA') {
        this.inputs[0].isVisible = false;
        this.inputs[1].isVisible = false;
      }

      this.condoDisabled = true;

      this.myForm.controls['nationality'].disable();
      this.myForm.controls['sex'].disable();
      this.myForm.controls['idType'].disable();
      this.myForm.controls['idNumber'].disable();
      this.myForm.controls['motherMaidenName'].disable();
      this.myForm.controls['firstName'].disable();
      this.myForm.controls['lastName'].disable();
      this.myForm.controls['birthday'].disable();
      this.myForm.controls['middleName'].disable();
      this.myForm.controls['mobileNumber'].disable();
      this.myForm.controls['email'].disable();

      this.myForm2.controls['houseNo'].disable();
      this.myForm2.controls['street'].disable();
      this.myForm2.controls['village'].disable();
      this.myForm2.controls['province'].disable();
      this.myForm2.controls['city'].disable();
      this.myForm2.controls['barangay'].disable();
      this.myForm2.controls['zipCode'].disable();

      this.myForm3.controls['floorNo'].disable();
      this.myForm3.controls['building'].disable();
      this.myForm3.controls['_street'].disable();
      this.myForm3.controls['_village'].disable();
      this.myForm3.controls['province'].disable();
      this.myForm3.controls['city'].disable();
      this.myForm3.controls['barangay'].disable();
      this.myForm3.controls['zipCode'].disable();
    }
  }

  ngAfterViewInit() {
    // chat
    this.chatService.checkChat();
    this.triggerGAEvent();
  }

  triggerGAEvent() {
    const eventInfo = ECOMM_DAF_LOAD;
    this.gtmService.captureEcommEvent(eventInfo);
  }

  triggerGAEventClick() {
    const eventInfo = ECOMM_DAF_CLICK;
    this.gtmService.captureEcommEvent(eventInfo);
  }

  selectedString = '';
  addressDetails = true;
  isCity: any = false;

  onCheck() {
    this.addressDetails = !this.addressDetails;
    this.myForm2.reset();
    this.myForm3.reset();
  }

  onProceed(event: any) {
    if (this.formSubmitted === false) {
      if (this.customerType === 'FTA') {
        this.gtmService.captureGTMEvent(FTA_PERSONAL_INFO_LETS_DO_THIS);
        const mNo = '09' + this.myForm.get('mobileNumber')?.value;
        // this.myForm.get('mobileNumber')?.setValue(mNo.replace(/\s/g, ''));
        if (this.addressDetails) {
          this.store.dispatch(
            DAFFillActions.formSubmitFta({
              personalInfo: {
                ...this.myForm.getRawValue(),
                mobileNumber: mNo,

                middleName:
                  this.myForm.get('middleName')?.value === this.na_value
                    ? '.'
                    : this.myForm.get('middleName')?.value,
                lastName:
                  this.myForm.get('lastName')?.value === this.na_value
                    ? '.'
                    : this.myForm.get('lastName')?.value,
              },
              addressInfo: this.myForm2.getRawValue(),
              offlineMode: false,
            })
          );
        } else {
          this.store.dispatch(
            DAFFillActions.formSubmitFta({
              personalInfo: {
                ...this.myForm.getRawValue(),
                mobileNumber: mNo,
              },
              addressInfo: this.myForm3.getRawValue(),
              offlineMode: false,
            })
          );
        }
      } else {
        this.gtmService.captureGTMEvent(ADA_PERSONAL_INFO_LETS_DO_THIS);
        if (this.addressDetails) {
          this.store.dispatch(
            DAFFillActions.formSubmitAda({
              personalInfo: this.myForm.getRawValue(),
              addressInfo: this.myForm2.getRawValue(),
            })
          );
        } else {
          this.store.dispatch(
            DAFFillActions.formSubmitAda({
              personalInfo: this.myForm.getRawValue(),
              addressInfo: this.myForm3.getRawValue(),
            })
          );
        }
      }
      this.triggerGAEventClick();
    } else {
      this.store.dispatch(
        AppActions.navigate({
          from: 'DAF_SUBMITTED',
        })
      );
    }
  }

  submitDisabled = true;
  selectedNationality = 'Nationality';

  selectedAddress: any = [];
  isClicked = false;
  selectedId = '';

  onInputKeyDown(event: any, id: any): void {
    if (id === 'mobileNumber') {
      // let cursorPosition = event.target['selectionStart'];
      //   // Prevent deleting the first two digits
      //   if (cursorPosition <= 2 && event.key === 'Backspace') {
      //     event.preventDefault();
      //     return;
      //   }
    }

    // Allow other key events to proceed normally
  }
  selectedOption(opt: any, id: any) {
    this.myForm.get(id)?.setValue(opt.selectedOption);
  }
  selectedOption2(opt: any, id: any) {
    let index: any = undefined;
    switch (opt.title) {
      case 'Province':
        this.selectedProvince = opt.selectedOption;

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

        if (index && index >= 0) {
          const code = this.provinces.codes[index];

          if (code) {
            this.store.dispatch(DAFFillActions.getCityInit({ province: code }));
          }
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

        break;
      case 'City':
        this.selectedCity = opt.selectedOption;

        index = this.cities?.names?.indexOf(opt.selectedOption);

        if (this.addressDetails) {
          this.myForm2.controls['zipCode'].setValue('');
          this.myForm2.controls['barangay'].setValue([]);
        } else {
          this.myForm3.controls['zipCode'].setValue('');
          this.myForm3.controls['barangay'].setValue([]);
        }

        if (typeof index == 'number' && index >= 0) {
          const code = this.cities.codes[index];

          if (code) {
            this.store.dispatch(DAFFillActions.getBarangayInit({ city: code }));
          }
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
          this.myForm2.controls['barangay'].setValue(opt.selectedOption);
        } else {
          this.myForm3.controls['barangay'].setValue(opt.selectedOption);
        }
        break;
    }
  }
  dropdown2: any = [
    //0
    {
      id: 'province',
      required: true,
      inputTitle: 'Province',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '160',
      options: [],
      inputId: 'province',
      disable: false,
    },
    //1
    {
      id: 'city',
      required: true,
      inputTitle: 'City',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '160',
      options: [],
      inputId: 'city',
      disable: true,
    },
    //2
    {
      id: 'barangay',
      required: true,
      inputTitle: 'Barangay',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '160',
      options: [],
      inputId: 'barangay',
      disable: true,
    },
    //3
    {
      id: 'zipCode',
      required: true,
      inputTitle: 'Zip Code',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '160',
      options: [],
      inputId: 'zip-code',
      disable: false,
      inputTag: true,
    },
  ];

  dropdown = [
    {
      inputTitle: 'Nationality',
      selected: '',
      options: [],
      required: false,
      id: 'nationality',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '160',
      color: '#62768B',
      dropColor: '#79889c',
    },
    {
      id: 'sex',
      options: ['Male', 'Female'],
      selected: '',
      required: true,
      inputTitle: 'Sex',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '160',
      color: '#62768B',
      dropColor: '#1F3B59',
    },
    // {
    //   inputTitle: 'ID Type',
    //   options: ['id 1', 'id 2'],
    //   required: false,
    //   id: 'idType',

    //   inputType: 'text',
    //   inputHeight: '44',
    //   inputWidth: '160',
    //   color: '#a1adb9',
    //   dropColor: '#79889c',
    // },
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
      inputId: 'village_',
      max: 50,
    },
  ];
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
  inputs = [
    // {
    //   inputTitle: 'Nationality',
    //   // options: [],
    //   required: true,
    //   id: 'nationality',
    //   inputType: 'text',
    //   inputHeight: '44',
    //   inputWidth: '160',
    //   inputId: 'nationality',
    // },
    //0
    {
      inputTitle: 'ID Type',
      required: false,
      id: 'idType',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '160',
      inputId: 'idType',
      isVisible: true,
    },
    //1
    {
      id: 'idNumber',
      required: true,
      inputTitle: 'ID Number',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '160',
      inputId: 'idNumber',
      isVisible: true,
    },
    //2
    {
      id: 'firstName',
      required: true,
      inputTitle: 'First Name',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '160',
      inputId: 'fName',
      isVisible: true,
      color: '#a1adb9',
      dropColor: '#768fba',
      max: 30,
    },
    //3
    {
      id: 'middleName',
      required: true,
      inputTitle: 'Middle Name',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '160',
      inputId: 'mName',
      isVisible: true,
      color: '#a1adb9',
      dropColor: '#768fba',
      max: 29,
    },
    //4
    {
      id: 'lastName',
      required: true,
      inputTitle: 'Last Name',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '327',
      inputId: 'lName',
      isVisible: true,
      color: '#a1adb9',
      dropColor: '#768fba',
      max: 30,
    },
    //5
    {
      id: 'birthday',
      required: true,
      inputTitle: 'Birthday',
      inputType: 'date',
      inputHeight: '44',
      inputWidth: '327',
      inputId: 'dob',
      isVisible: true,
      color: '#a1adb9',
      dropColor: '#79889b',
    },
    //6
    {
      dropDown: false,
      id: 'motherMaidenName',
      required: true,
      inputTitle: "Mother's Maiden Name (First, Middle, Last)",
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '327',
      inputId: 'motherMaidenName',
      isVisible: true,
      color: '#62768B',
      dropColor: '#203b59',
      max: 40,
    },
    //7
    {
      id: 'mobileNumber',
      required: true,
      inputTitle: 'Mobile Number',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '160',
      inputId: 'mobileNumber',
      isVisible: true,
      color: '#62768b',
      dropColor: '#203b59',
      max: this.maxMobNoLength,
    },
    //8
    {
      id: 'email',
      required: true,
      inputTitle: 'Email Address',
      inputType: 'text',
      inputHeight: '44',
      inputWidth: '160',
      iicon: true,
      inputId: 'email',
      isVisible: true,
      color: '#62768b',
      dropColor: '#1b458b',
    },
  ];

  selectedValue = '';
  selectedCar = '';
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
  iIconClicked(id: any) {
    const tooltips = document.querySelector('[data-title]');

    if (tooltips?.classList.contains('active')) {
      tooltips?.classList.add('hide');
      tooltips?.classList.remove('active');
    } else {
      tooltips?.classList.remove('hide');
      tooltips?.classList.add('active');
    }
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
    // if (field) console.log(field.errors);
    if (field) {
      if (
        field?.errors &&
        field?.errors.emailValid !== null &&
        field?.errors.emailValid !== undefined
      ) {
        return (
          field?.invalid &&
          field?.errors.emailValid &&
          (field?.dirty || field?.touched)
        );
      } else {
        return field?.invalid && (field?.dirty || field?.touched);
      }
    } else if (field2) {
      return field2?.invalid && (field2?.dirty || field2?.touched);
    } else if (field3) {
      return field3?.invalid && (field3?.dirty || field3?.touched);
    }
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
  isValid() {
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

  isEmailValid(id: any) {
    return this.myForm.get('email')?.errors?.['emailValid'] && id === 'email';
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
  openIdModal() {
    this._planBuilder.openIdModal();
  }
}
