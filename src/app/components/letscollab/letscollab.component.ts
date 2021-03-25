import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts.service';
import { faFeatherAlt } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'letscollab',
  templateUrl: './letscollab.component.html',
  styleUrls: ['./letscollab.component.css']
})
export class LetscollabComponent implements OnInit {

  faFeatherAlt = faFeatherAlt;
  posts: Post[];
  error: boolean;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService) { }

  async ngOnInit() {
    this.posts = await this.postsService.getAll(0);
    console.log(this.posts);

  }

  async searchByType(event) {
    this.posts = await this.postsService.getByType(event.target.value)
  }

  async searchByGenre(event) {
    this.posts = await this.postsService.getByGenre(event.target.value)
  }

  async searchByLicense(event) {
    this.posts = await this.postsService.getByLicense(event.target.value)
  }

  async searchByKey(event) {
    this.posts = await this.postsService.getByKey(event.target.value)
  }

  async searchByKeyword(event) {
    if (event.keyCode === 13) {
      this.posts = await this.postsService.getByKeyword(event.target.value);
      if (!this.posts) {
        setTimeout(() => {
          this.posts = []
          this.error = true;
        }, 1000)
      }
    }
  }

  async searchByUser(event) {
    if (event.keyCode === 13) {
      const user = await this.usersService.getByUser(event.target.value);
      if (user) {
        this.error = false;
        this.posts = await this.postsService.getByUserId(user.iduser);
      } else {
        setTimeout(() => {
          this.posts = []
          this.error = true;
        }, 2000)
      }
    }
  }
}
