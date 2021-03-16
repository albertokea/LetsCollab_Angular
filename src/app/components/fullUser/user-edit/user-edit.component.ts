import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Output() onSuccess: EventEmitter<void>

  editForm: FormGroup

  constructor() {
    this.onSuccess = new EventEmitter
    this.editForm = new FormGroup({
      twitter: new FormControl(''),
      instagram: new FormControl(''),
      facebook: new FormControl(''),
      email: new FormControl(''),
      bio: new FormControl('')
    })
  }


  ngOnInit(): void {

  }

  onBack() {
    this.onSuccess.emit()
  }

}
