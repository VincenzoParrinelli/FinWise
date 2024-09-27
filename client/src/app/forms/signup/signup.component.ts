import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { isEmail, isDate } from 'validator';

import { MainLayoutComponent } from '../../shared/layouts/main/main.component';
import { EyeOpenComponent } from '../../svg/eye-open/eye-open.component';
import { EyeClosedComponent } from '../../svg/eye-closed/eye-closed.component';

import { RouterService } from '../../router.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MainLayoutComponent,
    ReactiveFormsModule,
    EyeOpenComponent,
    EyeClosedComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm = new FormGroup({
    fullName: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(40)],
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    phone: new FormControl('', {
      validators: [Validators.required],
    }),
    dateOfBirth: new FormControl('', {
      validators: [Validators.required, this.dateValidator()],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        this.passwordPatternValidator(),
      ],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, this.passwordMatchValidator()],
    }),
  });

  private dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.signupForm) return null;

      const dateOfBirth = new Date(control.value);

      return !isDate(control.value, { format: 'DD/MM/YYYY' })
        ? { invalidDate: true }
        : null;
    };
  }

  private passwordPatternValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;

      if (!this.signupForm || !password) return null;

      const hasUpperCase = /[A-Z]/.test(password);
      const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (!hasUpperCase || !hasSpecialCharacter) {
        return { passwordPatternMismatch: true };
      }

      return null;
    };
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.signupForm) return null;

      const password = this.signupForm.value.password;
      const confirmPassword = control.value;

      return password !== confirmPassword ? { passwordMismatch: true } : null;
    };
  }

  get isFullNameRequired() {
    return (
      this.signupForm.controls.fullName.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isFullNameMaxLengthExceeded() {
    return (
      this.signupForm.controls.fullName.hasError('maxlength') &&
      this.formIsSubmitted()
    );
  }

  get isEmailRequired() {
    return (
      this.signupForm.controls.email.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isPhoneRequired() {
    return (
      this.signupForm.controls.phone.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isDateOfBirthRequired() {
    return (
      this.signupForm.controls.dateOfBirth.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isPasswordRequired() {
    return (
      this.signupForm.controls.password.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isPasswordPatternMismatched() {
    return (
      this.signupForm.controls.password.hasError('passwordPatternMismatch') &&
      this.formIsSubmitted()
    );
  }

  get isConfirmPasswordRequired() {
    return (
      this.signupForm.controls.confirmPassword.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isConfirmPasswordMismatched() {
    return (
      this.signupForm.controls.confirmPassword.hasError('passwordMismatch') &&
      this.formIsSubmitted()
    );
  }

  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  routerService = inject(RouterService);
  private httpClient = inject(HttpClient);
  private formIsSubmitted = signal<boolean>(false);

  onSubmit() {
    this.formIsSubmitted.set(true);

    if (!this.signupForm.valid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.httpClient
      .post(
        'http://localhost:5000/api/users/create-user',
        this.signupForm.value
      )
      .subscribe();
  }
}
