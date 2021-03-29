import { Component, OnInit } from '@angular/core';
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
  loading: boolean;

  page: number;
  lastPage: number;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService) {
    this.page = 0;
  }

  async ngOnInit() {
    const response = await this.postsService.getAll(0);
    this.posts = response.result;
    this.lastPage = response.info.pages;
  }

  async removeFilters() {
    const response = await this.postsService.getAll(0);
    this.posts = response.result;
    this.error = false;
  }

  async changePage(prevNextPage) {
    this.page = this.page + prevNextPage;
    const response = await this.postsService.getAll(this.page * 10);
    this.posts = response.result;
  }

  async searchByType(event) {
    this.posts = [];
    this.loading = true;
    const response = await this.postsService.getByType(event.target.value, 0);
    if (response.result) this.search(response.result)
    else this.err()
  }

  async searchByGenre(event) {
    this.posts = [];
    this.loading = true;
    const response = await this.postsService.getByGenre(event.target.value, 0);
    if (response.result) this.search(response.result)
    else this.err()
  }

  async searchByLicense(event) {
    this.posts = [];
    this.loading = true;
    const response = await this.postsService.getByLicense(event.target.value, 0);
    if (response.result) this.search(response.result)
    else this.err()
  }

  async searchByKey(event) {
    this.posts = [];
    this.loading = true;
    const response = await this.postsService.getByKey(event.target.value, 0);
    if (response.result) this.search(response.result)
    else this.err()

  }

  async searchByKeyword(event) {
    if (event.keyCode === 13) {
      this.posts = [];
      this.loading = true;
      const response = await this.postsService.getByKeyword(event.target.value, 0);
      if (response.result) this.search(response.result);
      else this.err();
    }
  }

  async searchByUser(event) {
    if (event.keyCode === 13) {
      this.posts = [];
      this.loading = true;
      const user = await this.usersService.getByUser(event.target.value);
      if (user) {
        const response = await this.postsService.getByUserId(user.iduser, 0);
        if (response.result) this.search(response.result);
        else this.err()
      } else this.err()
    }
  }

  search(result) {
    setTimeout(() => {
      this.posts = result;
      this.error = false;
      this.loading = false;
    }, 1000)
  }

  err() {
    setTimeout(() => {
      this.posts = [];
      this.error = true;
    }, 1000);
  }

}
