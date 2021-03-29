import { Component, Input, OnInit } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Conversation } from 'src/app/interfaces/conversation';
import { ConversationMessage } from 'src/app/interfaces/conversation-message';
import { User } from 'src/app/interfaces/user';
import { ConversationMessagesService } from 'src/app/services/conversation-messages.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {
  faUpload = faUpload;

  /* @Input() conversation: Conversation; */

  user: User;
  messages: ConversationMessage[];
  isMyUser: boolean;

  constructor(
    private conversationMessagesService: ConversationMessagesService,
    private usersService: UsersService
  ) { }

  async ngOnInit() {

    /* this.messages = await this.conversationMessagesService.getMessages(this.conversation.idconversation);
    const id = await this.usersService.tokenDecode();
    this.user = await this.usersService.getById(id);
    console.log(this.messages); */

  }

  setConversation(conversation) {
    /* console.log(conversation); */
    /* this.messages = await this.conversationMessagesService.getMessages(this.conversation.idconversation);
    const id = await this.usersService.tokenDecode();
    this.user = await this.usersService.getById(id);
    console.log(this.messages); */
  }

}
