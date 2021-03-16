import { Component, OnInit } from '@angular/core';
import { faReply, faEnvelope, faHeart, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

declare var WaveSurfer;

@Component({
  selector: 'collab-post',
  templateUrl: './collab-post.component.html',
  styleUrls: ['./collab-post.component.css']
})
export class CollabPostComponent implements OnInit {

  faReply = faReply;
  faEnvelope = faEnvelope;
  faHeart = faHeart;
  faPlay = faPlay;
  faPause = faPause;

  wavesurfer: any;
  isDisabled: boolean;

  constructor() {
    this.isDisabled = true;
  }

  ngOnInit() {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'yellow'
    });
    this.wavesurfer.load('../../../assets/audio/Ocean_Chals_Feb21.mp3');
  }

  onPlayPause() {
    this.wavesurfer.playPause()
  }

  changeVolume(newVolume) {
    this.wavesurfer.setVolume(newVolume / 100)
  }

  onReply() {
    this.isDisabled = false
  }

}
