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

  constructor(
    private postsService: PostsService,
    private usersService: UsersService) { }

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

  async searchByUser($event) {
    if ($event.keyCode === 13) {
      const user = await this.usersService.getByUser($event.target.value);
      this.posts = await this.postsService.getByUserId(user.iduser);
    }
  }
}
