import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VisitorsService } from 'src/app/services/visitors.service';
import { User } from 'src/app/interfaces/user';

declare var Swal;
@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() onLoginClick: EventEmitter<void>

  registerForm: FormGroup;
  userValid: number;
  existingUser: User;

  constructor(
    private visitorsService: VisitorsService,
    private router: Router) {
    this.onLoginClick = new EventEmitter;

    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
      ]),
      surname: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/)
      ]),
      birth_date: new FormControl('', [
        Validators.required
      ]),
      gender: new FormControl('', [
        Validators.required
      ]),
      user: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{1,100}$/),
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      password_repeat: new FormControl('', [
        Validators.required
      ]),
    }, this.passwordValidator)
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.onLoginClick.emit()
  }

  passwordValidator(form: FormGroup) {
    const passwordValue = form.get('password').value;
    const passwordRepeatValue = form.get('password_repeat').value;

    if (passwordValue === passwordRepeatValue) {
      return null;
    } else {
      return { passwordvalidator: true }
    }
  }

  checkValidator(controlName, validatorName) {
    return this.registerForm.get(controlName).hasError(validatorName) && this.registerForm.get(controlName).touched;
  }

  async userValidator(user) {
    this.existingUser = await this.visitorsService.getByUser(user);

    if (this.existingUser) {
      this.userValid = 0;
    } else {
      this.userValid = 1;
    }
  }

  register(username) {
      setTimeout(() => {
        this.visitorsService.register(this.registerForm.value);
      Swal.fire({
        icon: 'success',
        title: 'Cuenta creada con éxito',
        showConfirmButton: false,
        timer: 2000
      });
      this.onLoginClick.emit()
      },1000);
  }
}

