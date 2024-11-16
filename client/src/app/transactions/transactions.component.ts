import { Component, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Store } from '@ngrx/store';
import {
  selectTransactions,
  selectTransactionsTotals,
  selectTransactionsTotalUserDocuments,
} from '../store/transactions/transactions.selectors';

import { selectUserId } from '../store/user/user.selectors';
import * as TransactionActions from '../store/transactions/transactions.actions';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { TransactionsListComponent } from '../shared/transactions-list/transactions-list.component';

import { IncomeComponent } from '../svg/income/income.component';
import { ExpensesComponent } from '../svg/expenses/expenses.component';
import { PlusComponent } from '../svg/plus/plus.component';

import { RouterService } from '../router.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    MainLayoutComponent,
    IncomeComponent,
    ExpensesComponent,
    PlusComponent,
    TransactionsListComponent,
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
  transactionsTotalUserDocuments = this.store.selectSignal(
    selectTransactionsTotalUserDocuments
  );
  userId = this.store.selectSignal(selectUserId);
  isIncomesSelected = signal<boolean>(false);
  isExpensesSelected = signal<boolean>(false);
  private page = 2;
  private pageSize = 10;

  showIncomesOnly(): void {
    this.isIncomesSelected.set(!this.isIncomesSelected());
    this.isExpensesSelected.set(false);

    this.isIncomesSelected()
      ? this.routerService.setQueryParams('filter', 'incomes')
      : this.routerService.resetQueryParams();
  }

  showExpensesOnly(): void {
    this.isIncomesSelected.set(false);
    this.isExpensesSelected.set(!this.isExpensesSelected());

    this.isExpensesSelected()
      ? this.routerService.setQueryParams('filter', 'expenses')
      : this.routerService.resetQueryParams();
  }

  get incomesStrokeColor(): string {
    if (this.isIncomesSelected()) return 'stroke-honeydew';

    return 'stroke-caribbean-green';
  }

  get incomesFillColor(): string {
    if (this.isIncomesSelected()) return 'fill-honeydew';

    return 'fill-caribbean-green';
  }

  get expensesStrokeColor(): string {
    if (this.isExpensesSelected()) return 'stroke-honeydew';

    return 'stroke-ocean-blue';
  }

  get expensesFillColor(): string {
    if (this.isExpensesSelected()) return 'fill-honeydew';

    return 'fill-ocean-blue';
  }

  onScroll(event: any): void {
    const element = event.target;
    const threshold = 10;

    if (
      element.scrollHeight - element.scrollTop <=
        element.clientHeight + threshold &&
      this.transactions().length < this.transactionsTotalUserDocuments()
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
