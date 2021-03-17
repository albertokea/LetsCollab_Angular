import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;

  @Output() onRegisterClick: EventEmitter<void>

  loginForm: FormGroup

  constructor(
    private usersService: UsersService,
    private router: Router) {

    this.onRegisterClick = new EventEmitter

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
    this.errorMessage = null;
    this.usersService.login(this.loginForm.value)
      .then(response => {
        if (response.error) {
          setTimeout(() => this.errorMessage = response.error, 500);
        } else {
          localStorage.setItem('token_auth', response.token);
          /* Swal.fire('Login correcto', '', 'success')
            .then(result => {
            this.router.navigate(['/home'])
          }) */
          this.router.navigate(['/'])
          this.errorMessage = null;
        }
      })
      .catch(error => {
        console.log(error);

      })
  }
}
