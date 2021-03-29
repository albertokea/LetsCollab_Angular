import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faReply, faEnvelope, faHeart, faPlay, faPause, faDownload, faCrosshairs } from '@fortawesome/free-solid-svg-icons';

import { Post } from 'src/app/interfaces/post';
import { PostMessage } from 'src/app/interfaces/post-message';
import { User } from 'src/app/interfaces/user';
import { PostMessagesService } from 'src/app/services/post-message.service';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

declare var WaveSurfer;
declare var Swal;
@Component({
  selector: 'collab-post',
  templateUrl: './collab-post.component.html',
  styleUrls: ['./collab-post.component.css'],

})
export class CollabPostComponent implements OnInit {
  @Input() post: Post;
  @Output() search: EventEmitter<void>;
  @Output() keyword: EventEmitter<string>;

  faReply = faReply;
  faEnvelope = faEnvelope;
  faHeart = faHeart;
  faPlay = faPlay;
  faPause = faPause;
  faUpload = faDownload;
  faCross = faCrosshairs;
  datePublish: string
  canDelete: boolean
  user: User;
  userReply: User;
  profile_picture: string;
  id: number
  wavesurfer: any;
  waveformContainer: string;
  isDisabled: boolean;

  extraTags: any[];

  messages: PostMessage[];
  messageForm: FormGroup;
  username: string;
  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
    private postMessagesService: PostMessagesService,
    private rouer: Router) {
    this.canDelete = false;
    this.extraTags = []
    this.isDisabled = true;
    this.search = new EventEmitter;
    this.messageForm = new FormGroup({
      fk_user: new FormControl(''),
      fk_post: new FormControl(''),
      text: new FormControl('')
    })
  }

  async ngOnInit() {

    this.messages = await this.postMessagesService.getByPost(this.post.idpost);
    const id = await this.usersService.tokenDecode();
    this.userReply = await this.usersService.getById(id);
    this.extraTags = this.post.extra_tags.split(',')
  }

  async ngAfterViewInit() {
    this.wavesurfer = WaveSurfer.create({
      container: '.waveContainer' + this.post.idpost,
      waveColor: 'violet',
      progressColor: 'yellow'
    });
    this.wavesurfer.load('http://localhost:3000/audio/' + this.post.audio);

    console.log(this.extraTags);

    this.user = await this.usersService.getById(this.post.fk_user);
    this.user.profile_picture ? this.profile_picture = this.user.profile_picture : this.profile_picture = 'default-user-image.png'
    this.username = this.user.user;
    this.id = this.usersService.tokenDecode();
    if (this.id == this.post.fk_user) {
      this.canDelete = true;
    }
  }

  onPlayPause() {
    this.wavesurfer.playPause()
  }

  changeVolume(newVolume) {
    this.wavesurfer.setVolume(newVolume / 100)
  }

  onReply() {
    this.isDisabled = !this.isDisabled;
  }


  onSearch($event) {
    const type = $event.target.value.shift();
    this.search.emit();
  }

  async newMessage(text_message) {
    this.messageForm.value.fk_user = this.userReply.iduser;
    this.messageForm.value.fk_post = this.post.idpost;
    if (text_message) {
      await this.postMessagesService.create(this.messageForm.value);
      this.isDisabled = true;
      window.location.reload();
    }
  }

  async Genre($event) {
    this.post[0] = await this.postsService.getByGenre($event.target.value, 0)
  }

  async License($event) {
    this.post[0] = await this.postsService.getByLicense($event.target.value, 0)
  }

  async Key($event) {
    this.post[0] = await this.postsService.getByKey($event.target.value, 0)
  }

  onDeletePost() {

    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar tu post?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí, borrarlo',
      allowOutsideClick: false
    }).then(async (result) => {
      if (result.isConfirmed) {

        await this.postsService.deleteById(this.post.idpost),
          window.location.reload()

      }
    })
  }
}
