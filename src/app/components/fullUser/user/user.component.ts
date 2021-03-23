import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faAd } from '@fortawesome/free-solid-svg-icons'
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  faAd = faAd;

  isDisabled: boolean;
  formDisabled: boolean;

  user: User;
  bio: string;
  profilePicture: string;

  userPosts: Post[];

  constructor(
    private router: Router,
    private usersService: UsersService,
    private postsService: PostsService
  ) {
    this.isDisabled = false;
    this.formDisabled = true;
    this.profilePicture = 'default-user-image.png'

  }

  async ngOnInit() {
    const id = await this.usersService.tokenDecode();
    this.user = await this.usersService.getById(id);
    this.user.profile_picture ? this.profilePicture = this.user.profile_picture : this.profilePicture = 'default-user-image.png';

    this.userPosts = await this.postsService.getByUser(id);
    console.log(this.userPosts);

  }
  onEdit() {
    this.isDisabled = true;
    this.formDisabled = false;
  }
  onSuccess() {
    this.isDisabled = false;
    this.formDisabled = true;
  }
  nothing() {

  }
}
