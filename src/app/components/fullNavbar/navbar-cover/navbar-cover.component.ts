import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'navbar-cover',
  templateUrl: './navbar-cover.component.html',
  styleUrls: ['./navbar-cover.component.css']
})
export class NavbarCoverComponent implements OnInit {

  @Output() onLoginClick: EventEmitter<void>;
  @Output() onRegisterClick: EventEmitter<void>;

  constructor() {
    this.onLoginClick = new EventEmitter;
    this.onRegisterClick = new EventEmitter;
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.onLoginClick.emit()
  }

  onRegister() {
    this.onRegisterClick.emit()
  }
}
