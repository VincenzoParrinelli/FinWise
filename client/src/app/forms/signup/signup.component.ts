import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    phone: new FormControl('', {
      validators: [Validators.required],
    }),
    dateOfBirth: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  isPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  routerService = inject(RouterService);

  onSubmit() {}
}
