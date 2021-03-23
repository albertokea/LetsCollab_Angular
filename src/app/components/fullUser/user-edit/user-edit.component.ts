import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  editForm: FormGroup
  length: number
  iduser: number
  constructor(private usersService: UsersService) {
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

  onConfirm() {
    /* const formData = new FormData()
    formData.append('profile_picture', this.editForm.get('profile_picture').value)
    console.log(this.editForm.get('profile_picture').value); */



    /* this.usersService.update(this.editForm.value) */
    /* alert('Los cambios han sido guardados') */
    /* this.goBack.emit() */

  }
  onKeyUp($event) {

    this.length = $event.target.value.length;

  }
  onFileChange(event) {
    /* if (event.target.files.length > 0) {
      const file = event.target.files[0]
      console.log(file);

      this.editForm.get('profile_picture').setValue(file) */

  }


}


