import { Component, OnInit, ViewChild } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Conversation } from 'src/app/interfaces/conversation';
import { User } from 'src/app/interfaces/user';
import { ConversationMessagesService } from 'src/app/services/conversation-messages.service';
import { ConversationsService } from 'src/app/services/conversations.service';
import { UsersService } from 'src/app/services/users.service';
import { ConversationComponent } from '../conversation/conversation.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  @ViewChild('conversation') conversationActive: ConversationComponent;
  faUpload = faUpload;

  images = []
  ids = []
  user: User
  user2: User
  conversations: Conversation[];
  currentConversation: Conversation;

  constructor(
    private usersService: UsersService,
    private conversationsService: ConversationsService,
    private conversationMessagesService: ConversationMessagesService) {
    this.images = []
    this.ids = []
  }

  async ngOnInit() {
    const id = await this.usersService.tokenDecode();
    this.user = await this.usersService.getById(id)
    this.conversations = await this.conversationsService.getByUserId(id);

    this.conversations.forEach(async conversation => {
      if (this.user.iduser != conversation.fk_user1) {
        let user2 = await this.usersService.getById(conversation.fk_user1);
        this.images.push(user2.profile_picture);
      }
      if (this.user.iduser != conversation.fk_user2) {
        let user2 = await this.usersService.getById(conversation.fk_user2);
        this.images.push(user2.profile_picture);
      }
    });
  }

  selectConversation(conversation) {
    this.currentConversation = conversation;
  }


  /* async ngOnInit() {
    const id = await this.usersService.tokenDecode();
    this.user = await this.usersService.getById(id)
    this.conversations = await this.conversationsService.getByUserId(id);

    this.conversations.forEach(async conversation => {
      const idUser1 = conversation.fk_user1;
      const idUser2 = conversation.fk_user2;
      if (id != idUser1) {
        const usuario1 = await this.usersService.getById(idUser1)
        const image = usuario1.profile_picture

        this.images.unshift(image)
        this.ids.unshift(conversation.idconversation)
      }
      if (id != idUser2) {
        const usuario2 = await this.usersService.getById(idUser2)
        const image = usuario2.profile_picture
        this.images.unshift(image)
        this.ids.unshift(conversation.idconversation)
      }
    });
  } */

}
