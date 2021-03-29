import { Component, Input, OnInit } from '@angular/core';
import { ConversationMessage } from 'src/app/interfaces/conversation-message';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'conversation-message',
  templateUrl: './conversation-message.component.html',
  styleUrls: ['./conversation-message.component.css']
})
export class ConversationMessageComponent implements OnInit {
  @Input() message: ConversationMessage;

  user: User;
  isMyUser: boolean;


  constructor(private usersService: UsersService) { }

  async ngOnInit() {
    const id = await this.usersService.tokenDecode();
    if (this.message.fk_user === id) this.isMyUser = true;
  }

}
