import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { Store } from '@ngrx/store';
import { UpdatedUserFormData } from '../store/user/user.model';
import * as UserActions from '../store/user/user.actions';
import { selectLoading } from '../store/app/app.selectors';
import { selectUserName } from '../store/user/user.selectors';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { CustomBtnComponent } from '../shared/custom-btn/custom-btn.component';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [MainLayoutComponent, CustomBtnComponent, ReactiveFormsModule],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.scss',
})
export class ProfileEditComponent {
  private store = inject(Store);
  userFullName = this.store.selectSignal(selectUserName);
  loading = this.store.selectSignal(selectLoading);
  private formIsSubmitted = signal<boolean>(false);

  updateProfileForm = new FormGroup(
    {
      fullName: new FormControl('', {
        validators: [Validators.maxLength(40)],
      }),
      phone: new FormControl(''),
      email: new FormControl('', {
        validators: [Validators.email],
      }),
    },
    {
      validators: this.atleastOneFilled,
    }
  );

  private atleastOneFilled(control: AbstractControl): ValidationErrors | null {
    const fullName = control.get('fullName')?.value;
    const phone = control.get('phone')?.value;
    const email = control.get('email')?.value;

    if (fullName || phone || email) return null;

    return { atleastOneFieldRequired: true };
  }

  get isFullNameMaxLengthExceeded() {
    return (
      this.updateProfileForm.controls.fullName.hasError('maxlength') &&
      this.formIsSubmitted()
    );
  }

  get isEmailInvalid() {
    return (
      this.updateProfileForm.controls.email.hasError('email') &&
      this.formIsSubmitted()
    );
  }

  onSubmit() {
    this.formIsSubmitted.set(true);

    if (!this.updateProfileForm.valid) {
      this.updateProfileForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      UserActions.updateUser({
        updatedUserFormData: this.updateProfileForm
          .value as UpdatedUserFormData,
      })
    );
  }
}
