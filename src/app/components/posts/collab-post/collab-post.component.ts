import { Component, Input, OnInit } from '@angular/core';
import { faReply, faEnvelope, faHeart, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

declare var WaveSurfer;

@Component({
  selector: 'collab-post',
  templateUrl: './collab-post.component.html',
  styleUrls: ['./collab-post.component.css']
})
export class CollabPostComponent implements OnInit {
  @Input() post;

  faReply = faReply;
  faEnvelope = faEnvelope;
  faHeart = faHeart;
  faPlay = faPlay;
  faPause = faPause;

  user: User;
  displayTextarea: boolean;

  wavesurfer: any;
  waveformContainer: string;
  isDisabled: boolean;

  constructor(
    private postsService: PostsService,
    private usersService: UsersService) {
    this.isDisabled = true;
    this.displayTextarea = false;
  }

  async ngOnInit() {

  }

  async ngAfterViewInit() {
    this.wavesurfer = WaveSurfer.create({
      container: '.waveContainer' + this.post.idpost,
      waveColor: 'violet',
      progressColor: 'yellow'
    });
    this.wavesurfer.load('../../../assets/audio/Ocean_Chals_Feb21.mp3');
    this.user = await this.usersService.getById(this.post.fk_user);
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

}
