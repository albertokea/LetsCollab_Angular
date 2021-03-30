import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  filter: string;
  filterKeyword: any;
  response: any;

  @ViewChild('selectGenre') selectGenre: ElementRef;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService) {
    this.page = 0;
    this.filter = 'all';
  }

  async ngOnInit() {
    this.response = await this.postsService.getAll(0);
    this.posts = this.response.result;
    this.lastPage = this.response.info.pages;
  }

  async removeFilters() {
    this.response = await this.postsService.getAll(0);
    this.posts = this.response.result;
    this.error = false;
    this.filter = 'all'
  }

  async changePage(prevNextPage) {
    this.page = this.page + prevNextPage;
    switch (this.filter) {
      case "all":
        this.response = await this.postsService.getAll(this.page * 10);
        this.search(this.response);
        break;
      case "type":
        this.response = await this.postsService.getByType(this.filterKeyword, this.page * 10);
        this.search(this.response);
        break;
      case "genre":
        this.response = await this.postsService.getByGenre(this.filterKeyword, this.page * 10);
        this.search(this.response);
        break;
      case "license":
        this.response = await this.postsService.getByLicense(this.filterKeyword, this.page * 10);
        this.search(this.response);
        break;
      case "key":
        this.response = await this.postsService.getByKey(this.filterKeyword, this.page * 10);
        this.search(this.response);
        break;
      case "keyword":
        this.response = await this.postsService.getByKeyword(this.filterKeyword, this.page * 10);
        this.search(this.response);
        break;
      case "user":
        this.response = await this.postsService.getByUserId(this.filterKeyword, this.page * 10);
        this.search(this.response);
        break;
    }
  }

  async searchByType(event) {
    this.initSearch();
    this.page = 0;
    this.filter = 'type'
    this.filterKeyword = event.target.value;
    this.response = await this.postsService.getByType(event.target.value, 0);
    if (this.response.result) this.search(this.response)
    else this.err()
  }

  async searchByGenre(event) {
    this.initSearch();
    this.filter = 'genre'
    this.filterKeyword = event.target.value;
    this.response = await this.postsService.getByGenre(event.target.value, 0);
    if (this.response.result) this.search(this.response)
    else this.err()
  }

  async searchByLicense(event) {
    this.selectGenre.nativeElement.value = "";
    this.initSearch();
    this.filter = 'license'
    this.filterKeyword = event.target.value;
    this.response = await this.postsService.getByLicense(event.target.value, 0);
    if (this.response.result) this.search(this.response)
    else this.err()
  }

  async searchByKey(event) {
    this.initSearch();
    this.filter = 'key'
    this.filterKeyword = event.target.value;
    this.response = await this.postsService.getByKey(event.target.value, 0);
    if (this.response.result) this.search(this.response)
    else this.err()

  }

  async searchByKeyword(event) {
    if (event.keyCode === 13) {
      this.initSearch();
      this.filter = 'keyword'
      this.filterKeyword = event.target.value;
      this.response = await this.postsService.getByKeyword(event.target.value, 0);
      if (this.response.result) this.search(this.response);
      else this.err();
    }
  }

  async searchByUser(event) {
    if (event.keyCode === 13) {
      this.initSearch();
      this.filter = 'user';
      const user = await this.usersService.getByUser(event.target.value);
      if (user) {
        this.filterKeyword = user.iduser;
        this.response = await this.postsService.getByUserId(user.iduser, 0);
        if (this.response.result) this.search(this.response);
        else this.err()
      } else this.err()
    }
  }

  initSearch() {
    this.posts = [];
    this.loading = true;
    this.page = 0;
  }

  search(response) {
    setTimeout(() => {
      this.posts = response.result;
      this.error = false;
      this.loading = false;
      this.lastPage = response.info.pages;
    }, 1000)
  }

  err() {
    setTimeout(() => {
      this.posts = [];
      this.error = true;
    }, 1000);
  }

}
