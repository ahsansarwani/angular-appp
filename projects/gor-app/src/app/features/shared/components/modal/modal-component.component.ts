import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GoogleTagManagerService } from 'projects/gor-app/src/app/app-state/gtm.service';
import {
  ADA_NO_POSTPAID_CHANGE_NUMBER,
  ADA_NO_POSTPAID_NEW_ACCOUNT,
} from 'projects/gor-app/src/app/globals/gtm-events/plan-selector/events';

@Component({
  selector: 'gor-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss'],
})
export class ModalComponent {
  constructor(private gtmService: GoogleTagManagerService) {}
  ngAfterViewInit(): void {
    const buttonModal = document.getElementById('modalButton')!;
    buttonModal.addEventListener('click', () => {
      this.openBootstrapModal();
    });
    buttonModal.click();
  }
  @Output() clickedButton = new EventEmitter<string>();
  openModal = true;
  openBootstrapModal() {
    const modal: any = document.getElementById('fta-in-ada-modal');
    console.log(modal);
    if (modal) {
      modal.classList.add('show'); // Add the "show" class to display the modal
      //const body=document.querySelector('body')!;
      //body.style.overflow='hidden';
      //modal.show()
      modal.style.display = 'block'; // Set the display property to "block"
    }
  }

  closeBootstrapModal() {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.classList.remove('show'); // Remove the "show" class to hide the modal
      modal.style.display = 'none'; // Set the display property to "none"
      const body = document.querySelector('body')!;
      body.style.overflow = 'scroll';
    }
  }

  title = "Let's Get You Started with a New Account!";
  subTitle =
    "Hey there! It looks like the mobile number you provided doesn't match an existing postpaid account. Would you like to proceed with setting up a brand new account?";
  primaryBtnText = 'Yes, start with a new account!';
  secondaryBtnText = 'No, I’ll change my number';

  clickMethod(value: string) {
    if (value == 'new') {
      this.gtmService.captureGTMEvent(ADA_NO_POSTPAID_NEW_ACCOUNT);
    } else if (value == 'change') {
      this.gtmService.captureGTMEvent(ADA_NO_POSTPAID_CHANGE_NUMBER);
    }
    this.clickedButton.emit(value);
  }
}
