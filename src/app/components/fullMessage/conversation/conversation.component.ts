import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  @ViewChild('wrapper2') wrapper2: ElementRef;
  @Input() conversation: Conversation;
  idConversation: number;

  user: User;
  messages: ConversationMessage[];
  file: any;

  constructor(
    private conversationMessagesService: ConversationMessagesService,
    private usersService: UsersService,
    private route: ActivatedRoute,
  ) { }

  async ngOnInit() {
    const id = await this.usersService.tokenDecode();
    this.user = await this.usersService.getById(id)
  }

  async ngOnChanges() {
    this.route.params.subscribe(async conversation => {
      this.idConversation = conversation['idconversation'];
      this.messages = await this.conversationMessagesService.getMessages(this.idConversation);
    });
  }

  ngAfterViewInit() {
    this.scrollDown();
  }

  async sendMessage(event) {
    if (event.keyCode === 13 && event.target.value != "") {
      const body = {
        fk_user: this.user.iduser,
        fk_conversation: this.idConversation,
        text: event.target.value
      }
      event.target.value = "";
      await this.conversationMessagesService.create(body);
      this.messages = await this.conversationMessagesService.getMessages(this.idConversation);
    }
  }

  async onFileChange(event) {
    if (event.target.files.length > 0) {
      if (event.target.files[0].name.match(/\.(mp3|wav)$/)) {
        const formData = new FormData();
        this.file = event.target.files[0];
        console.log(this.file.name);
        formData.append('file', this.file);
        formData.append('fk_user', this.user.iduser.toString());
        formData.append('fk_conversation', this.idConversation.toString());
        await this.conversationMessagesService.createFile(formData);


        /* const body = {
          fk_user: this.user.iduser,
          fk_conversation: this.idConversation,
          text: 'http://localhost:3000/public/messages/audio' + 
        }
        await this.conversationMessagesService.create(body);
        this.messages = await this.conversationMessagesService.getMessages(this.idConversation); */
      } else {
        alert('Solo se pueden introducir imagenes en formato mp3, wav');
      }
    }
  }
  /* if (event.keyCode === 13 && event.target.value != "") {
    const body = {
      fk_user: this.user.iduser,
      fk_conversation: this.idConversation,
      text: event.target.value
    }
    event.target.value = "";
    await this.conversationMessagesService.create(body);
    this.messages = await this.conversationMessagesService.getMessages(this.idConversation);

  } */

  scrollDown() {
    this.wrapper2.nativeElement.scrollIntoView(false);
  }
}

