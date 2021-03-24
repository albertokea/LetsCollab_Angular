import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Output() goBack: EventEmitter<void>

  user: User;
  iduser: number;

  editForm: FormGroup;
  length: number;
  file: any;

  constructor(
    private usersService: UsersService,
    private router: Router) {
    this.goBack = new EventEmitter
    this.editForm = new FormGroup({
      twitter: new FormControl(''),
      instagram: new FormControl(''),
      facebook: new FormControl(''),
      email: new FormControl('',
        Validators.required),
      profile_picture: new FormControl(''),
      bio: new FormControl(''),
      iduser: new FormControl('')
    })
  }


  async ngOnInit() {

    this.iduser = await this.usersService.tokenDecode();
    this.user = await this.usersService.getById(this.iduser)
    this.editForm = new FormGroup({
      twitter: new FormControl(this.user.twitter),
      instagram: new FormControl(this.user.instagram),
      facebook: new FormControl(this.user.facebook),
      email: new FormControl(this.user.email,
        Validators.required),
      profile_picture: new FormControl(''),
      bio: new FormControl(this.user.bio),
      iduser: new FormControl(this.iduser)
    })
  }

  async onConfirm() {
    const formData = new FormData();
    formData.append('profile_picture', this.file);
    formData.append('twitter', this.editForm.value.twitter);
    formData.append('instagram', this.editForm.value.instagram);
    formData.append('facebook', this.editForm.value.facebook);
    formData.append('email', this.editForm.value.email);
    formData.append('bio', this.editForm.value.bio);
    formData.append('iduser', this.editForm.value.iduser);

    await this.usersService.update(formData);
    alert('Los cambios han sido guardados');
    window.location.reload()
  }
  onKeyUp($event) {

    this.length = $event.target.value.length;

  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      if (event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
        this.file = event.target.files[0]
      } else {
        alert('Solo se pueden introducir imagenes en formato jpg, jpeg, png y gif');
      }
    }
  }


}


