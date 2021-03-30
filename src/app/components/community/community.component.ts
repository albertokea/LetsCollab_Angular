import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.css']
})
export class CommunityComponent implements OnInit {

  allUsers: any;
  page: number;
  lastPage: number;

  constructor(private usersService: UsersService) {
    this.page = 0;
  }

  async ngOnInit() {
    const response = await this.usersService.getAll(0);
    this.allUsers = response.result;
    this.lastPage = response.info.pages
  }

  seeMore() {
    setTimeout(async () => {
      this.page += 1;
      const response = await this.usersService.getAll(this.page * 10);
      response.result.forEach(user => this.allUsers.push(user));
    }, 1000);
  }
}
