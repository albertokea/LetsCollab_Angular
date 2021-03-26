import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAd } from '@fortawesome/free-solid-svg-icons'
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  faAd = faAd;
  faPen = faPen

  isDisabled: boolean;
  formDisabled: boolean;

  usernamePage: string
  user: User;
  allUsers: User[]
  canEdit: boolean;
  bio: string;
  profilePicture: string;
  headerImg: string
  userPosts: Post[];
  headerForm: FormGroup
  fileChosenHeader: boolean

  page: number;
  lastPage: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private postsService: PostsService
  ) {
    this.headerForm = new FormGroup({
      header_picture: new FormControl(''),
      iduser: new FormControl('')
    })
    this.route.params.subscribe(username => {
      this.usernamePage = username['username']
    })

    this.canEdit = false
    this.isDisabled = false;
    this.formDisabled = true;
    this.profilePicture = 'default-user-image.png'

    this.page = 0;
  }

  async ngOnInit() {

    this.fileChosenHeader = false;
    const id = await this.usersService.tokenDecode();
    this.user = await this.usersService.getByUser(this.usernamePage);
    if (this.user) {
      if (this.user.iduser == id) {
        this.canEdit = true;
      }
      const responsePosts = await this.postsService.getAll(0);
      this.userPosts = responsePosts.result;
      this.lastPage = responsePosts.info.pages;
    } else {
      this.router.navigate(['error'])
      this.headerForm = new FormGroup({
        header_picture: new FormControl(),
        iduser: new FormControl(this.user.iduser)
      })

    }

  }

  async changePage(prevNextPage) {
    this.page = this.page + prevNextPage;
    const response = await this.postsService.getAll(this.page * 10);
    this.userPosts = response.result;
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
  async onFileChangeHeader(event) {
    if (event.target.files.length > 0) {
      if (event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {

        this.headerImg = event.target.files[0]
        const formData = new FormData();
        formData.append('header_picture', this.headerImg)

        console.log(formData);

        const idk = await this.usersService.updateHeader(formData)
        console.log(idk);

      } else {
        alert('Solo se pueden introducir imagenes en formato jpg, jpeg, png y gif');
      }
    }
  }
}
