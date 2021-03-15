import { Component, OnInit } from '@angular/core';

declare var WaveSurfer;

@Component({
  selector: 'letscollab',
  templateUrl: './letscollab.component.html',
  styleUrls: ['./letscollab.component.css']
})
export class LetscollabComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple'
    });
    wavesurfer.load('../../../assets/audio/Ocean_Chals_Feb21.wav');
    console.log(wavesurfer);

  }

}
