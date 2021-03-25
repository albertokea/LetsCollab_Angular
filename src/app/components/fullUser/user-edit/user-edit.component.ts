import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { faPen } from '@fortawesome/free-solid-svg-icons'
declare var Swal;
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  @Output() goBack: EventEmitter<void>
  faPen = faPen
  user: User;
  iduser: number;
  fileChosen: boolean;
  isDisabled: boolean;
  fileChosenHeader: boolean;
  editForm: FormGroup;
  length: number;
  file: any;
  fileHeader: any;

  constructor(
    private usersService: UsersService,
    private router: Router) {
    this.goBack = new EventEmitter
    this.fileChosen = false;

    this.editForm = new FormGroup({
      twitter: new FormControl(''),
      instagram: new FormControl(''),
      facebook: new FormControl(''),
      email: new FormControl('',
        Validators.required),
      profile_picture: new FormControl(''),
      header_picture: new FormControl(''),
      bio: new FormControl(''),
      subtitle: new FormControl(''),
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
      header_picture: new FormControl(''),
      bio: new FormControl(this.user.bio),
      subtitle: new FormControl(this.user.subtitle),
      iduser: new FormControl(this.iduser)
    })
  }

  async onConfirm() {
    const formData = new FormData();
    if (this.fileChosen == true) {
      formData.append('profile_picture', this.file);
      this.fileChosen = false;

    } else {
      formData.append('profile_picture', this.user.profile_picture);
    }
    if (this.fileChosenHeader == true) {
      formData.append('header_picture', this.fileHeader);
      this.fileChosenHeader = false;
      this.fileChosenHeader = false;
    } else {
      formData.append('header_picture', this.user.header_picture);
    }
    formData.append('twitter', this.editForm.value.twitter);
    formData.append('instagram', this.editForm.value.instagram);
    formData.append('facebook', this.editForm.value.facebook);
    formData.append('email', this.editForm.value.email);
    formData.append('bio', this.editForm.value.bio);
    formData.append('iduser', this.editForm.value.iduser);
    formData.append('subtitle', this.editForm.value.subtitle);
    await this.usersService.update(formData);
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

  }
  onKeyUp($event) {

    this.length = $event.target.value.length;

  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      if (event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
        this.file = event.target.files[0]
        this.fileChosen = true;
      } else {
        alert('Solo se pueden introducir imagenes en formato jpg, jpeg, png y gif');
      }
    }
  }
  onFileChangeHeader(event) {
    if (event.target.files.length > 0) {
      if (event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
        this.fileHeader = event.target.files[0]
        this.fileChosenHeader = true;
      } else {
        alert('Solo se pueden introducir imagenes en formato jpg, jpeg, png y gif');
      }
    }
  }
  onDisable() {
    this.isDisabled = !this.isDisabled
  }

}


