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
    category: new FormControl('', {
      validators: [Validators.required],
    }),
    amount: new FormControl('', {
      validators: [Validators.required],
    }),
    transactionTitle: new FormControl('', {
      validators: [Validators.maxLength(50)],
    }),
    description: new FormControl('', {
      validators: [Validators.maxLength(50)],
    }),
  });

  categoryService = inject(CategoryService);
  private formIsSubmitted = signal<boolean>(false);
  private store = inject(Store<TransactionsState>);
  loading = this.store.selectSignal<boolean>(selectLoading);
  toggleCategoryDropdown = signal<boolean>(false);

  get isDateRequired() {
    return (
      this.transactionsAddForm.controls.date.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isCategoryRequired() {
    return (
      this.transactionsAddForm.controls.category.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isAmountRequired() {
    return (
      this.transactionsAddForm.controls.amount.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get descriptionMaxLengthExceeded() {
    return (
      this.transactionsAddForm.controls.description.hasError('maxlength') &&
      this.formIsSubmitted()
    );
  }

  get transactionTitleLengthExceeded() {
    return (
      this.transactionsAddForm.controls.transactionTitle.hasError(
        'maxlength'
      ) && this.formIsSubmitted()
    );
  }

  get categoryFormValue() {
    return this.transactionsAddForm.get('category')?.value;
  }

  formatAmountOnEnter(): void {
    const amountControl = this.transactionsAddForm.get('amount');

    if (!amountControl?.value) return;

    amountControl.setValue(amountControl.value.replace(/[^0-9.]/g, ''));
  }

  formatAmountOnLeave(): void {
    const amountControl = this.transactionsAddForm.get('amount');

    if (!amountControl?.value) return;

    const toNegative = parseFloat(amountControl.value).toFixed(2);

    amountControl.setValue(`-$${toNegative}`);
  }

  setCategory(categoryName: string): void {
    this.transactionsAddForm.patchValue({ category: categoryName });

    const amountControl = this.transactionsAddForm.get('amount');

    if (!amountControl?.value) return;

    const isNotSalary = categoryName !== 'Salary';
    let amountValueNumeric = amountControl.value.replace(/[^0-9.]/g, '');

    if (isNotSalary) {
      amountValueNumeric = amountValueNumeric.includes('-')
        ? amountValueNumeric
        : `-$${amountValueNumeric}`;
    } else {
      amountValueNumeric = `$${amountValueNumeric}`;
    }

    amountControl.setValue(amountValueNumeric);
  }

  onSubmit(): void {
    this.formIsSubmitted.set(true);

    if (!this.transactionsAddForm.valid) {
      this.transactionsAddForm.markAllAsTouched();
      return;
    }

    const amountWithRemovedCurrencySymbol = parseFloat(
      this.transactionsAddForm.controls.amount.value?.replace(/[^0-9.-]/g, '')!
    );

    const transaction = {
      ...this.transactionsAddForm.value,
      amount: amountWithRemovedCurrencySymbol,
    } as NewTransactionFormData;

    this.store.dispatch(
      TransactionsActions.createTransaction({
        transaction,
      })
    );
  }
}
