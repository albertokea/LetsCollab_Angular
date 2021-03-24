import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VisitorsService } from 'src/app/services/visitors.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  loginError: boolean;

  @Output() onRegisterClick: EventEmitter<void>

  loginForm: FormGroup

  constructor(
    private visitorsService: VisitorsService,
    private router: Router) {

    this.onRegisterClick = new EventEmitter

    this.loginError = false;
    this.loginForm = new FormGroup({
      user: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    })
  }

  ngOnInit(): void {
  }

  onRegister() {
    this.onRegisterClick.emit();
  }

  onSubmit() {
    this.visitorsService.login(this.loginForm.value)
      .then(response => {
        if (response.error) {
          setTimeout(() => this.loginError = true, 500);
        } else {
          localStorage.setItem('token_auth', response.token);
          setTimeout(() => this.router.navigate(['/home']), 2000)
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
}
