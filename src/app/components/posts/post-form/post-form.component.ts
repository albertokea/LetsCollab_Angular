import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;

  constructor(private postsService: PostsService) {
    this.postForm = new FormGroup({
      type: new FormControl('', [
        Validators.required
      ]),
      genre: new FormControl(''),
      key_note: new FormControl(''),
      license: new FormControl('',
        Validators.required),
      bpm: new FormControl(''),
      extra_tags: new FormControl(''),
      description_text: new FormControl(''),
      audio: new FormControl('',
        Validators.required),
      download: new FormControl('',
        Validators.required)
    })
  }

  ngOnInit(): void {
  }

  newPost() {
    const newpost = this.postsService.create(this.postForm.value);
    console.log(this.postForm.value);

    alert('Exito!!')
  }

}
