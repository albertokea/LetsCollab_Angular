import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faReply, faEnvelope, faHeart, faPlay, faPause, faDownload } from '@fortawesome/free-solid-svg-icons';

import { Post } from 'src/app/interfaces/post';
import { PostMessage } from 'src/app/interfaces/post-message';
import { User } from 'src/app/interfaces/user';
import { PostMessagesService } from 'src/app/services/post-message.service';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

declare var WaveSurfer;

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
  datePublish: string

  user: User;
  profile_picture: string;

  wavesurfer: any;
  waveformContainer: string;
  isDisabled: boolean;

  messages: PostMessage[];

  constructor(
    private usersService: UsersService,
    private postsService: PostsService,
    private postMessagesService: PostMessagesService) {
    this.isDisabled = true;
    this.search = new EventEmitter;
  }

  async ngOnInit() {
    this.messages = await this.postMessagesService.getByPost(this.post.idpost)
  }

  async ngAfterViewInit() {
    this.wavesurfer = WaveSurfer.create({
      container: '.waveContainer' + this.post.idpost,
      waveColor: 'violet',
      progressColor: 'yellow'
    });
    this.wavesurfer.load('http://localhost:3000/audio/' + this.post.audio);
    console.log(this.post.audio);


    this.user = await this.usersService.getById(this.post.fk_user);
    this.user.profile_picture ? this.profile_picture = this.user.profile_picture : this.profile_picture = 'default-user-image.png'
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
  /*  onDownload(file) {
     const fileName = this.post.audio;
   } */

  onSearch($event) {
    const type = $event.target.value.shift();
    this.search.emit();
  }

  newMessage(text_message) {
    const formData = new FormData();
    formData.append('fk_user', this.user.iduser.toString());
    formData.append('fk_post', this.post.idpost.toString());
    formData.append('text', text_message);

    this.postMessagesService.getByPost(this.post.idpost)
  }

  async Genre($event) {
    this.post[0] = await this.postsService.getByGenre($event.target.value)
  }

  async License($event) {
    this.post[0] = await this.postsService.getByLicense($event.target.value)
  }

  async Key($event) {
    this.post[0] = await this.postsService.getByKey($event.target.value)
  }

}
