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
  @Output() onSuccess: EventEmitter<FormGroup>

  user: User;
  editForm: FormGroup

  constructor(private usersService: UsersService) {
    this.onSuccess = new EventEmitter
    this.editForm = new FormGroup({
      twitter: new FormControl(''),
      instagram: new FormControl(''),
      facebook: new FormControl(''),
      email: new FormControl('',
        Validators.required),
      bio: new FormControl('')
    })
  }


  async ngOnInit() {
    const id = await this.usersService.tokenDecode();
    this.user = await this.usersService.getById(id)
  }

  onBack() {
    this.onSuccess.emit(this.editForm)
  }

}
