import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VisitorsService } from 'src/app/services/visitors.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() onLoginClick: EventEmitter<void>

  registerForm: FormGroup

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
        Validators.minLength(4),
        Validators.maxLength(20)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/)
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
    this.registerForm.get(controlName).hasError(validatorName) && this.registerForm.get(controlName).touched;
  }

  register() {
    this.visitorsService.register(this.registerForm.value);
    alert('Toma yeah!!')
    this.onLoginClick.emit()
  }
}

