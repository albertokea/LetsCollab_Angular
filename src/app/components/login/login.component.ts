import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() onRegisterClick: EventEmitter<void>

  constructor() {
    this.onRegisterClick = new EventEmitter
  }

  ngOnInit(): void {
  }

  onRegister() {
    this.onRegisterClick.emit();
  }
}
