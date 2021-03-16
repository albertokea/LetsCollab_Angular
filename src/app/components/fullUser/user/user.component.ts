import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  isDisabled: boolean;
  formDisabled: boolean;
  constructor(private router: Router) {
    this.isDisabled = false;
    this.formDisabled = true;
  }

  ngOnInit(): void {
  }
  onEdit() {
    this.isDisabled = true;
    this.formDisabled = false;
  }
  onSuccess() {
    this.isDisabled = false;
    this.formDisabled = true;
  }
}
