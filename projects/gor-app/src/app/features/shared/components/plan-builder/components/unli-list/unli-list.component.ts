import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { appList } from 'projects/gor-app/src/dummy-data';

@Component({
  selector: 'gor-unli-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './unli-list.component.html',
  styleUrls: ['./unli-list.component.scss'],
})
export class UnliListComponent {
  @ViewChild('container') containerRef!: ElementRef<HTMLDivElement>;
  @Output() selectedApp = new EventEmitter<any>();
  selectedIndex = -1;
  app: any = null;
  appClicked = false;
  onAppClick(event: any, value: any, i: number) {
    console.log(event);
    const button = event.target as HTMLButtonElement;
    const container = this.containerRef.nativeElement;
    button.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
    // Check if the button is only partially visible

    if (this.selectedIndex === i) {
      this.appClicked = false;
      this.selectedIndex = -1;
      this.app = null;
      this.selectedApp.emit(false);
    } else {
      this.appClicked = true;
      this.selectedIndex = i;
      this.app = value;
      this.selectedApp.emit(value);
    }
  }
  isSelected = false;

  listOfApps = appList;
}
