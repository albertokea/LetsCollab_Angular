import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {

  isDisabled: boolean;
  loginDisabled: boolean;
  registerDisabled: boolean;

  constructor(private router: Router) {
    this.isDisabled = false;
    this.loginDisabled = true;
    this.registerDisabled = true;
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.isDisabled = true;
    this.registerDisabled = true;
    this.loginDisabled = false;
  }

  onRegister() {
    this.isDisabled = true;
    this.loginDisabled = true;
    this.registerDisabled = false;
  }
}
