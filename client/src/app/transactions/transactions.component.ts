import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Store } from '@ngrx/store';
import {
  selectTransactions,
  selectTransactionsTotals,
  selectTransactionsTotalDocuments,
} from '../store/transactions/transactions.selectors';

import { selectUserId } from '../store/user/user.selectors';
import * as TransactionActions from '../store/transactions/transactions.actions';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { IncomeCounterComponent } from '../shared/income-counter/income-counter.component';
import { ExpensesCounterComponent } from '../shared/expenses-counter/expenses-counter.component';
import { TransactionsListComponent } from '../shared/transactions-list/transactions-list.component';

import { PlusComponent } from '../svg/plus/plus.component';

import { RouterService } from '../router.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    MainLayoutComponent,
    IncomeCounterComponent,
    ExpensesCounterComponent,
    TransactionsListComponent,
    PlusComponent,
    CurrencyPipe,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  routerService = inject(RouterService);
  private store = inject(Store);
  transactionsTotals = this.store.selectSignal(selectTransactionsTotals);
  transactions = this.store.selectSignal(selectTransactions);
  transactionsTotalDocuments = this.store.selectSignal(
    selectTransactionsTotalDocuments
  );
  userId = this.store.selectSignal(selectUserId);
  isIncomeSelected = signal<boolean>(false);
  isExpensesSelected = signal<boolean>(false);
  private page = 2;
  private pageSize = 10;

  showIncomesOnly(): void {
    this.isIncomeSelected.set(!this.isIncomeSelected());
    this.isExpensesSelected.set(false);

    this.isIncomeSelected()
      ? this.routerService.setQueryParams('filter', 'incomes')
      : this.routerService.resetQueryParams();
  }

  showExpensesOnly(): void {
    this.isIncomeSelected.set(false);
    this.isExpensesSelected.set(!this.isExpensesSelected());

    this.isExpensesSelected()
      ? this.routerService.setQueryParams('filter', 'expenses')
      : this.routerService.resetQueryParams();
  }

  onScroll(event: any): void {
    const element = event.target;
    const threshold = 10;

    if (
      element.scrollHeight - element.scrollTop <=
        element.clientHeight + threshold &&
      this.transactions().length < this.transactionsTotalDocuments()
    ) {
      this.store.dispatch(
        TransactionActions.getTransactionsWithTotals({
          page: this.page,
          pageSize: this.pageSize,
        })
      );

      this.page++;
    }
  }
}
