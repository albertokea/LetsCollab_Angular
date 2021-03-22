import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAd } from '@fortawesome/free-solid-svg-icons'
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  faAd = faAd

  isDisabled: boolean;
  formDisabled: boolean;

  user: User;
  bio: string;
  profileImg: string;
  userName: string;
  instagram: string;
  facebook: string;
  twitter: string;

  constructor(
    private router: Router,
    private usersService: UsersService
  ) {
    this.isDisabled = false;
    this.formDisabled = true;
  }

  async ngOnInit() {
    const id = await this.usersService.tokenDecode();
    this.user = await this.usersService.getById(id);

    this.user.profile_picture ? this.profileImg = this.user.profile_picture : this.profileImg = 'default-user-image.png';
    this.userName = this.user.user;
    this.instagram = this.user.instagram;
    this.facebook = this.user.facebook;
    this.twitter = this.user.twitter;
  }
  onEdit() {
    this.isDisabled = true;
    this.formDisabled = false;
  }
  onSuccess() {
    this.isDisabled = false;
    this.formDisabled = true;
  }
}
