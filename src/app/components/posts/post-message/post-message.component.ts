import { Component, Input, OnInit } from '@angular/core';
import { PostMessage } from 'src/app/interfaces/post-message';
import { User } from 'src/app/interfaces/user';
import { PostMessagesService } from 'src/app/services/post-message.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'post-message',
  templateUrl: './post-message.component.html',
  styleUrls: ['./post-message.component.css']
})
export class PostMessageComponent implements OnInit {

  user: User;
  @Input() message: PostMessage;

  constructor(private postMessagesService: PostMessagesService,
    private usersService: UsersService) { }

  async ngOnInit() {
    this.user = await this.usersService.getById(this.message.fk_user);
  }

}
