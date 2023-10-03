import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { PlanBuilderService } from '../plan-builder/services/plan-builder.service';

@Component({
  selector: 'gor-id-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './id-modal.component.html',
  styleUrls: ['./id-modal.component.scss'],
})
export class IdModalComponent implements OnInit {
  @Input() isVisible = true;
  constructor(private _planBuilder: PlanBuilderService) {}
  ngOnInit(): void {
    this._planBuilder.idModalOpen$.subscribe(res => {
      console.log('response', res);
      this.showModal();
    });
  }
  listOfIds = [
    'Driver’s license',
    'PRC ID',
    'UMID (Unified Multi-Purpose identity card)',
    'SSS(Social Security System) ID',
    'Postal ID',
    'Passport (For foreign nationals)',
    'PhilHealth ID',
    'National ID',
    'TIN (Taxpayer Identification Number)',
    "Voter's ID",
  ];

  showModal(): void {
    document.body.style.overflow = 'hidden';
    this.isVisible = true;
  }
  onCloseModal(): void {
    document.body.style.overflow = 'auto';
    this.isVisible = false;
  }
  modal1 = {
    title: 'Thanks for choosing Globe!',
    subTitle: 'Do you have an existing Globe Postpaid plan?',
    primaryBtnText: "I'm new to Globe.",
    secondaryBtnText: 'Yes, I already have an account.',
  };
}
