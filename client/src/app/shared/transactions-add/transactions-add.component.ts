import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MainLayoutComponent } from '../layouts/main/main.component';
import { CustomBtnComponent } from '../custom-btn/custom-btn.component';

import { CategoryService } from '../../category.service';

import { Store } from '@ngrx/store';
import { selectLoading } from '../../store/app/app.selectors';
import { UserState } from '../../store/user/user.reducer';

@Component({
  selector: 'app-transactions-add',
  standalone: true,
  imports: [MainLayoutComponent, ReactiveFormsModule, CustomBtnComponent],
  templateUrl: './transactions-add.component.html',
  styleUrl: './transactions-add.component.scss',
})
export class TransactionsAddComponent {
  transactionsAddForm = new FormGroup({
    date: new FormControl('', {
      validators: [Validators.required],
    }),
    amount: new FormControl('', {
      validators: [Validators.required],
    }),
    category: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  categoryService = inject(CategoryService);
  private formIsSubmitted = signal<boolean>(false);
  private store = inject(Store<UserState>);
  loading = this.store.selectSignal(selectLoading);

  get isDateRequired() {
    return (
      this.transactionsAddForm.controls.date.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isAmountRequired() {
    return (
      this.transactionsAddForm.controls.amount.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isCategoryRequired() {
    return (
      this.transactionsAddForm.controls.category.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  onSubmit() {
    this.formIsSubmitted.set(true);

    if (!this.transactionsAddForm.valid) {
      this.transactionsAddForm.markAllAsTouched();
      return;
    }

    console.log(this.transactionsAddForm.value);
  }
}
