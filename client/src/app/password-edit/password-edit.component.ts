import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { UserState } from '../store/user/user.model';
import { selectLoading } from '../store/app/app.selectors';
import * as UserActions from '../store/user/user.actions';

import { passwordPatternValidator } from '../shared/validators/password-pattern.validator';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { CustomBtnComponent } from '../shared/custom-btn/custom-btn.component';
import { EyeOpenComponent } from '../svg/eye-open/eye-open.component';
import { EyeClosedComponent } from '../svg/eye-closed/eye-closed.component';
import { passwordMatchValidator } from '../shared/validators/password-match.validator';

@Component({
  selector: 'app-password-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MainLayoutComponent,
    CustomBtnComponent,
    EyeOpenComponent,
    EyeClosedComponent,
  ],
  templateUrl: './password-edit.component.html',
  styleUrl: './password-edit.component.scss',
})
export class PasswordEditComponent {
  private store = inject(Store<UserState>);
  loading = this.store.selectSignal(selectLoading);
  isCurrPasswordVisible = false;
  isNewPasswordVisible = false;
  isNewPasswordConfirmVisible = false;
  formIsSubmitted = signal<boolean>(false);

  passwordEditForm = new FormGroup({
    currPassword: new FormControl('', {
      validators: [Validators.required],
    }),
    newPassword: new FormControl('', {
      validators: [Validators.required, passwordPatternValidator()],
    }),
    newPasswordConfirm: new FormControl('', {
      validators: [Validators.required, passwordMatchValidator('newPassword')],
    }),
  });

  get isCurrPasswordRequired() {
    return (
      this.passwordEditForm.controls.currPassword.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isNewPasswordRequired() {
    return (
      this.passwordEditForm.controls.newPassword.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isNewPasswordConfirmRequired() {
    return (
      this.passwordEditForm.controls.newPasswordConfirm.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isNewPasswordPatternMismatched() {
    return (
      this.passwordEditForm.controls.newPassword.hasError(
        'passwordPatternMismatch'
      ) && this.formIsSubmitted()
    );
  }

  get isNewPasswordConfirmMismatched() {
    return (
      this.passwordEditForm.controls.newPasswordConfirm.hasError(
        'passwordMismatch'
      ) && this.formIsSubmitted()
    );
  }

  onSubmit() {
    this.formIsSubmitted.set(true);

    if (!this.passwordEditForm.valid) {
      this.passwordEditForm.markAllAsTouched();
      return;
    }

    const currPassword = this.passwordEditForm.value.currPassword as string;
    const newPassword = this.passwordEditForm.value.newPassword as string;

    this.store.dispatch(
      UserActions.updateUserPassword({ currPassword, newPassword })
    );
  }
}
