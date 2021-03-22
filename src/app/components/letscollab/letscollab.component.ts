import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post';
import { PostsService } from 'src/app/services/posts.service';


@Component({
  selector: 'letscollab',
  templateUrl: './letscollab.component.html',
  styleUrls: ['./letscollab.component.css']
})
export class LetscollabComponent implements OnInit {

  posts: Post[];

  constructor(private postsService: PostsService) { }

  async ngOnInit() {
    this.posts = await this.postsService.getAll()
  }

  async searchByType($event) {
    this.posts = await this.postsService.getByType($event.target.value)
  }

  async searchByGenre($event) {
    this.posts = await this.postsService.getByGenre($event.target.value)
  }

  async searchByLicense($event) {
    this.posts = await this.postsService.getByLicense($event.target.value)
  }

  async searchByKey($event) {
    this.posts = await this.postsService.getByKey($event.target.value)
  }

  searchByKeyword() {

  }

  searchByUser($event) {
    /* this.posts = this.postsService */
  }
}
