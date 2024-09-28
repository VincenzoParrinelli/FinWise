import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MainLayoutComponent } from '../../shared/layouts/main/main.component';
import { CustomBtnComponent } from '../../shared/custom-btn/custom-btn.component';

import { FacebookComponent } from '../../svg/facebook/facebook.component';
import { GoogleComponent } from '../../svg/google/google.component';
import { EyeOpenComponent } from '../../svg/eye-open/eye-open.component';
import { EyeClosedComponent } from '../../svg/eye-closed/eye-closed.component';

import { RouterService } from '../../router.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MainLayoutComponent,
    ReactiveFormsModule,
    FacebookComponent,
    GoogleComponent,
    EyeOpenComponent,
    EyeClosedComponent,
    CustomBtnComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  isPasswordVisible: boolean = false;
  routerService = inject(RouterService);

  onSubmit() {
    const enteredEmail = this.loginForm.value.email;
    const enteredPassword = this.loginForm.value.password;

    console.log(enteredEmail);
  }
}
