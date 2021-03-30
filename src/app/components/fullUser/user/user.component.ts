import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';
import { faPen, faAd, faStar, faUndo } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup } from '@angular/forms';
import { LikesService } from 'src/app/services/likes.service';
import { Like } from 'src/app/interfaces/like';
declare var Swal;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  faAd = faAd;
  faPen = faPen
  faStar = faStar;
  faUndo = faUndo;

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

  userLikes: Like[];
  likeActive: boolean;

  page: number;
  lastPage: number;
  error: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService,
    private postsService: PostsService,
    private likesService: LikesService
  ) {

    this.headerForm = new FormGroup({
      header_picture: new FormControl(''),
      iduser: new FormControl('')
    });

    this.route.params.subscribe(async username => {
      this.usernamePage = username['username'];
      this.user = await this.usersService.getByUser(this.usernamePage);
    });

    this.canEdit = false
    this.isDisabled = false;
    this.formDisabled = true;
    this.profilePicture = 'default-user-image.png'

    this.page = 0;
    this.likeActive = false;
    this.error = false;
  }

  async ngOnInit() {

    this.fileChosenHeader = false;
    const id = await this.usersService.tokenDecode();
    this.user = await this.usersService.getByUser(this.usernamePage);
    if (this.user) {
      if (this.user.iduser == id) {
        this.canEdit = true;
      }
      const responsePosts = await this.postsService.getByUserId(this.user.iduser, 0);
      this.userPosts = responsePosts.result;
      this.lastPage = responsePosts.info.pages;
    } else {
      this.router.navigate(['error'])
      this.headerForm = new FormGroup({
        header_picture: new FormControl(),
        iduser: new FormControl(this.user.iduser)
      })
    }
    this.userLikes = await this.likesService.getByUser(this.user.iduser);
  }

  seeMore() {
    setTimeout(async () => {
      this.page += 1;
      const response = await this.postsService.getByUserId(this.user.iduser, this.page * 10);
      response.result.forEach(post => this.userPosts.push(post));
    }, 1000);
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

  onLike() {
    this.userPosts = []
    this.page = 0;
    setTimeout(() => {
      if (this.userLikes) {
        this.likeActive = true;
        this.userLikes.forEach(async like => {
          let favouritePost = await this.postsService.getById(like.fk_post);
          this.userPosts.unshift(favouritePost);
        });
      } else {
        this.error = true;
      }
    }, 1000);
  }

  onUserPosts() {
    this.userPosts = []
    this.page = 0;
    setTimeout(async () => {
      const response = await this.postsService.getByUserId(this.user.iduser, this.page * 10);
      if (response.result) {
        this.userPosts = response.result;
        this.likeActive = false;
      } else {
        this.error = true;
      }
    }, 1000)
  }

  async onFileChangeHeader(event) {
    if (event.target.files.length > 0) {
      if (event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {

        this.headerImg = event.target.files[0]
        const formData = new FormData();
        formData.append('header_picture', this.headerImg)

        console.log(formData);

        await this.usersService.updateHeader(formData)
        Swal.fire({
          icon: 'success',
          title: 'Datos actualizados con éxito',
          showConfirmButton: true,
          allowOutsideClick: false

        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
          }
        })


      } else {
        alert('Solo se pueden introducir imagenes en formato jpg, jpeg, png y gif');
      }
    }
  }
}
