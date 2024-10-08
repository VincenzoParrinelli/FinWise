import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as UserActions from '../../store/user/user.actions';
import { selectLoading } from '../../store/app/app.selectors';

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
  private store = inject(Store);
  private formIsSubmitted = signal<boolean>(false);
  loading = this.store.selectSignal(selectLoading);

  get isEmailRequired() {
    return (
      this.loginForm.controls.email.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isPasswordRequired() {
    return (
      this.loginForm.controls.password.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  onSubmit() {
    this.formIsSubmitted.set(true);

    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    this.store.dispatch(UserActions.loginUser({ email, password }));
  }
}
