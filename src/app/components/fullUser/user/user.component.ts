import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAd } from '@fortawesome/free-solid-svg-icons'
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  faAd = faAd;

  isDisabled: boolean;
  formDisabled: boolean;
  usernamePage: string
  user: User;
  allUsers: User[]
  canEdit: boolean;
  bio: string;
  profilePicture: string;

  userPosts: Post[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private postsService: PostsService
  ) {
    this.route.params.subscribe(username => {
      this.usernamePage = username['username']
    })

    this.canEdit = false
    this.isDisabled = false;
    this.formDisabled = true;
    this.profilePicture = 'default-user-image.png'

  }

  async ngOnInit() {

    const id = await this.usersService.tokenDecode();
    this.user = await this.usersService.getByUser(this.usernamePage);
    if (this.user) {
      if (this.user.iduser == id) {
        this.canEdit = true;
      }
      this.userPosts = await this.postsService.getByUserId(this.user.iduser);
    } else {
      this.router.navigate(['error'])
    }

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
