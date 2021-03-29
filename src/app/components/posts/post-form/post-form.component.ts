import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';


declare var Swal;

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  iduser: string;
  postForm: FormGroup;
  file: any;
  error: boolean;
  extraTags: any[]

  @ViewChild('extraTagsInput') extraTagsInput: ElementRef;

  constructor(

    private postsService: PostsService,
    private router: Router) {
    this.extraTags = []
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
      download: new FormControl(''),
      fk_user: new FormControl(''),
    });
    this.error = false;
  }

  async ngOnInit() {

  }

  async newPost() {
    if (this.file && this.postForm.valid) {
      this.error = false;
      const formData = new FormData();
      this.postForm.value.extra_tags = this.extraTags.join(',')
      console.log(this.postForm.value.extra_tags);

      formData.append('audio', this.file);
      formData.append('type', this.postForm.value.type);
      formData.append('genre', this.postForm.value.genre);
      formData.append('key_note', this.postForm.value.key_note);
      formData.append('license', this.postForm.value.license);
      formData.append('bpm', this.postForm.value.bpm);
      formData.append('extra_tags', this.postForm.value.extra_tags);
      formData.append('description_text', this.postForm.value.description_text);
      formData.append('download', this.postForm.value.download);

      await this.postsService.create(formData);
      Swal.fire({
        icon: 'success',
        title: 'Post creado con éxito',
        showConfirmButton: false,
        timer: 2000
      })
      this.router.navigate(['/collab']);
    } else {
      this.error = true;
    }
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      if (event.target.files[0].name.match(/\.(mp3|wav)$/)) {
        this.file = event.target.files[0]
      } else {
        alert('Solo se pueden introducir imagenes en formato mp3, wav');
      }
    }
  }


  onSeparate(event) {
    const tag = event.target.value
    console.log(tag);
    if (tag !== '')
      this.extraTags.push(tag)
    this.extraTagsInput.nativeElement.value = ''
  }
}
