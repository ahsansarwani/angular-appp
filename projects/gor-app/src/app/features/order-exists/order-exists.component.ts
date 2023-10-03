import { Component, Input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ChatbotService } from '../../app-state/chat.service';
import { tags_duplicate } from '../../globals/redirection-links';

@Component({
  selector: 'gor-order-exists',
  templateUrl: './order-exists.component.html',
  styleUrls: ['./order-exists.component.scss'],
})
export class OrderExistsComponent {
  constructor(
    private meta: Meta,
    private title: Title,
    private chatService: ChatbotService
  ) {
    //set meta
    this.meta.addTags([
      { name: 'description', content: tags_duplicate.description },
    ]);
    this.title.setTitle(tags_duplicate.title);
    //
  }

  ngAfterViewInit() {
    // chat
    this.chatService.checkChat();
  }
}
