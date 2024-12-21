import { Component, inject, signal } from '@angular/core';

import { Store } from '@ngrx/store';
import { TransactionsState } from '../../store/transactions/transactions.model';
import { selectLoading } from '../../store/app/app.selectors';
import {
  selectSearchedTransactions,
  selectTotalSearchedTransactionsInDb,
} from '../../store/transactions/transactions.selectors';
import * as TransactionActions from '../../store/transactions/transactions.actions';

import { CategoryService } from '../../services/category.service';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MainLayoutComponent } from '../../shared/layouts/main/main.component';
import { CustomBtnComponent } from '../../shared/custom-btn/custom-btn.component';
import { RadioBtnComponent } from '../../svg/radio-btn/radio-btn.component';
import { TransactionsListComponent } from '../../shared/transactions-list/transactions-list.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MainLayoutComponent,
    ReactiveFormsModule,
    CustomBtnComponent,
    RadioBtnComponent,
    TransactionsListComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  private formIsSubmitted = signal<boolean>(false);
  private store = inject(Store<TransactionsState>);
  private page = 1;
  private pageSize = 10;

  categories = inject(CategoryService).getAllCategories;
  toggleCategoryDropdown = signal<boolean>(false);
  searchedTransactions = this.store.selectSignal(selectSearchedTransactions);
  totalSearchedTransactionsInDb = this.store.selectSignal(
    selectTotalSearchedTransactionsInDb
  );
  loading = this.store.selectSignal<boolean>(selectLoading);

  searchForm = new FormGroup({
    search: new FormControl('', {
      validators: [Validators.maxLength(50)],
    }),
    categories: new FormControl<string[]>([]),
    date: new FormControl(''),
    categoryRadio: new FormControl(''),
  });

  get categoryFormValue() {
    return this.searchForm.get('categories')?.value;
  }

  get categoryRadioValue() {
    return this.searchForm.get('categoryRadio')?.value;
  }

  setCategories(categoryName: string): void {
    const categories = this.searchForm.value.categories!;

    if (categories?.includes(categoryName)) {
      this.searchForm.patchValue({
        categories: categories.filter((category) => category !== categoryName),
      });
    } else {
      this.searchForm.patchValue({
        categories: [...categories, categoryName],
      });
    }
  }

  setCategoryRadio(category: string): void {
    if (this.categoryRadioValue === category) {
      this.searchForm.patchValue({ categoryRadio: '' });
    } else {
      this.searchForm.patchValue({ categoryRadio: category });
    }
  }

  onScroll(event: any): void {
    const element = event.target;
    const threshold = 10;
    const cleanedSearchQuery = this.removeEmptyFormFields(
      this.searchForm.value
    );

    if (
      element.scrollHeight - element.scrollTop <=
        element.clientHeight + threshold &&
      this.searchedTransactions().length < this.totalSearchedTransactionsInDb()
    ) {
      this.store.dispatch(
        TransactionActions.getTransactionsBySearch({
          ...cleanedSearchQuery,
          page: this.page,
          pageSize: this.pageSize,
        })
      );

      this.page++;
    }
  }

  onSubmit(): void {
    this.formIsSubmitted.set(true);

    if (!this.searchForm.valid) {
      this.searchForm.markAllAsTouched();
      return;
    }

    this.page = 1;

    const cleanedSearchQuery = this.removeEmptyFormFields(
      this.searchForm.value
    );

    this.store.dispatch(
      TransactionActions.getTransactionsBySearch({
        ...cleanedSearchQuery,
        page: this.page,
        pageSize: this.pageSize,
      })
    );

    this.page++;
  }

  private removeEmptyFormFields(formValues: any): any {
    const cleanedValues: any = {};

    for (const key in formValues) {
      if (formValues[key] !== '' && formValues[key].length) {
        cleanedValues[key] = formValues[key];
      }
    }

    return cleanedValues;
  }
}
