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
import {
  NewTransactionFormData,
  TransactionsState,
} from '../../store/transactions/transactions.model';
import * as TransactionsActions from '../../store/transactions/transactions.actions';

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
    message: new FormControl('', {
      validators: [Validators.maxLength(50)],
    }),
  });

  categoryService = inject(CategoryService);
  private formIsSubmitted = signal<boolean>(false);
  private store = inject(Store<TransactionsState>);
  loading = this.store.selectSignal<boolean>(selectLoading);

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

  get messageMaxLengthExceeded() {
    return (
      this.transactionsAddForm.controls.message.hasError('maxlength') &&
      this.formIsSubmitted()
    );
  }

  formatAmountOnEnter(): void {
    const amountControl = this.transactionsAddForm.get('amount');

    if (!amountControl || !amountControl.value) return;

    amountControl.setValue(amountControl.value.replace(/[^0-9.]/g, ''));
  }

  formatAmountOnLeave(): void {
    const amountControl = this.transactionsAddForm.get('amount');

    if (!amountControl || !amountControl.value) return;

    const toNegative = parseFloat(amountControl.value).toFixed(2);

    amountControl.setValue(`-$${toNegative}`);
  }

  onSubmit() {
    this.formIsSubmitted.set(true);

    if (!this.transactionsAddForm.valid) {
      this.transactionsAddForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(
      TransactionsActions.createTransaction({
        transaction: {
          ...(this.transactionsAddForm.value as NewTransactionFormData),
        },
      })
    );
  }
}
