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
  posts: any;
  error: boolean;

  page: number;
  lastPage: number;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService) {
    this.page = 0;
  }

  async changePage(prevNextPage) {
    this.page = this.page + prevNextPage;
    const response = await this.postsService.getAll(this.page * 10);
    this.posts = response.result;
  }

  async ngOnInit() {
    const response = await this.postsService.getAll(0);
    this.posts = response.result;
    this.lastPage = response.info.pages;
  }

  async searchByType(event) {
    this.posts = await this.postsService.getByType(event.target.value, 0)
  }

  async searchByGenre(event) {
    this.posts = await this.postsService.getByGenre(event.target.value, 0)
  }

  async searchByLicense(event) {
    this.posts = await this.postsService.getByLicense(event.target.value, 0)
  }

  async searchByKey(event) {
    this.posts = await this.postsService.getByKey(event.target.value, 0)
  }

  async searchByKeyword(event) {
    if (event.keyCode === 13) {
      this.posts = await this.postsService.getByKeyword(event.target.value, 0);
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
        /* this.posts = await this.postsService.getByUserId(user.iduser); */
      } else {
        setTimeout(() => {
          this.posts = [];
          this.error = true;
        }, 2000)
      }
    }
  }
}
