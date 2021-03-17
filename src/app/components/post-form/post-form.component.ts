import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup

  constructor() {
    this.postForm = new FormGroup({
      type: new FormControl(),
      genre: new FormControl(),
      key: new FormControl(),
      license: new FormControl(),
      bpm: new FormControl(),
      extra_tags: new FormControl(),
      description: new FormControl(),
    })
  }

  ngOnInit(): void {
  }

}
