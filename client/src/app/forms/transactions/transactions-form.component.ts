import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MainLayoutComponent } from '../../shared/layouts/main/main.component';
import { CustomBtnComponent } from '../../shared/custom-btn/custom-btn.component';

import { CategoryService } from '../../category.service';

import { Store } from '@ngrx/store';
import { selectLoading } from '../../store/app/app.selectors';
import {
  NewTransactionFormData,
  Transaction,
  TransactionsState,
} from '../../store/transactions/transactions.model';
import * as TransactionsActions from '../../store/transactions/transactions.actions';

@Component({
  selector: 'app-transactions-form',
  standalone: true,
  imports: [MainLayoutComponent, ReactiveFormsModule, CustomBtnComponent],
  templateUrl: './transactions-form.component.html',
  styleUrl: './transactions-form.component.scss',
})
export class TransactionsFormComponent {
  categoryService = inject(CategoryService);
  private formIsSubmitted = signal<boolean>(false);
  private store = inject(Store<TransactionsState>);
  private router = inject(Router);
  loading = this.store.selectSignal<boolean>(selectLoading);
  toggleCategoryDropdown = signal<boolean>(false);
  selectedTransaction =
    this.router.getCurrentNavigation()?.extras?.state?.['transaction'];
  updatedTransaction = signal({});

  ngOnInit() {
    this.formatAmountOnLeave();
  }

  transactionsForm = new FormGroup({
    date: new FormControl(this.formatSelectedTransactionDate || '', {
      validators: [Validators.required],
    }),
    category: new FormControl(this.selectedTransaction?.category || '', {
      validators: [Validators.required],
    }),
    amount: new FormControl(this.selectedTransaction?.amount.toString() || '', {
      validators: [Validators.required],
    }),
    transactionTitle: new FormControl(
      this.selectedTransaction?.transactionTitle || '',
      {
        validators: [Validators.maxLength(50)],
      }
    ),
    description: new FormControl(this.selectedTransaction?.description || '', {
      validators: [Validators.maxLength(50)],
    }),
  });

  get formatSelectedTransactionDate(): string {
    return this.selectedTransaction
      ? new Date(this.selectedTransaction.date).toISOString().split('T')[0]
      : '';
  }

  get isDateRequired() {
    return (
      this.transactionsForm.controls.date.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isCategoryRequired() {
    return (
      this.transactionsForm.controls.category.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get isAmountRequired() {
    return (
      this.transactionsForm.controls.amount.hasError('required') &&
      this.formIsSubmitted()
    );
  }

  get descriptionMaxLengthExceeded() {
    return (
      this.transactionsForm.controls.description.hasError('maxlength') &&
      this.formIsSubmitted()
    );
  }

  get transactionTitleLengthExceeded() {
    return (
      this.transactionsForm.controls.transactionTitle.hasError('maxlength') &&
      this.formIsSubmitted()
    );
  }

  get categoryFormValue() {
    return this.transactionsForm.get('category')?.value;
  }

  formatAmountOnEnter(): void {
    const amountControl = this.transactionsForm.get('amount');

    if (!amountControl?.value) return;

    amountControl.setValue(amountControl.value.replace(/[^0-9.]/g, ''));
  }

  formatAmountOnLeave(): void {
    const amountControl = this.transactionsForm.get('amount');
    const categoryControl = this.transactionsForm.get('category');

    if (!amountControl?.value) return;

    amountControl.setValue(amountControl.value.replace(/[-]/g, ''));
    const fixedValue = parseFloat(amountControl.value).toFixed(2);

    if (categoryControl?.value === 'Salary') {
      amountControl.setValue(`$${fixedValue}`);
    } else {
      amountControl.setValue(`-$${fixedValue}`);
    }
  }

  setCategory(categoryName: string): void {
    this.transactionsForm.patchValue({ category: categoryName });

    const amountControl = this.transactionsForm.get('amount');

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

  private isTransactionEdited(formattedFormData: object): number {
    for (const key in formattedFormData) {
      const formField = formattedFormData[key as keyof object];
      const selectedTransactionField =
        this.selectedTransaction[key as keyof Transaction];

      if (formField !== selectedTransactionField) {
        this.updatedTransaction.set({
          ...this.updatedTransaction(),
          [key]: formField,
        });
      } else {
        const updatedTransaction = { ...this.updatedTransaction() };
        delete updatedTransaction[key as keyof object];
        this.updatedTransaction.set(updatedTransaction);
      }
    }

    return Object.values(this.updatedTransaction()).length;
  }

  // TODO: do not submit if no field has chan
  onSubmit(): void {
    this.formIsSubmitted.set(true);

    if (!this.transactionsForm.valid) {
      this.transactionsForm.markAllAsTouched();
      return;
    }

    const formattedTransaction = {
      ...this.transactionsForm.value,
      amount: parseFloat(
        this.transactionsForm.controls.amount.value?.replace(/[^0-9.-]/g, '')!
      ),
    } as NewTransactionFormData;

    if (!this.selectedTransaction) {
      this.store.dispatch(
        TransactionsActions.createTransaction({
          transaction: formattedTransaction,
        })
      );
    } else if (this.isTransactionEdited(formattedTransaction)) {
      this.store.dispatch(
        TransactionsActions.updateTransaction({
          updatedTransactionFormData: this.updatedTransaction(),
          id: this.selectedTransaction._id,
        })
      );
    }
  }
}
