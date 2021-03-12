import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() onLoginClick: EventEmitter<void>

  constructor() {
    this.onLoginClick = new EventEmitter;
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.onLoginClick.emit()
  }
}
