import { Component, inject } from '@angular/core';
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
  private page = 2;
  private pageSize = 10;

  onScroll(event: any): void {
    const element = event.target;
    const threshold = 100;

    if (
      element.scrollHeight - element.scrollTop <=
        element.clientHeight + threshold &&
      this.transactions().length < this.transactionsTotalUserDocuments()
    ) {
      this.store.dispatch(
        TransactionActions.getTransactionsWithTotals({
          userId: this.userId()!,
          page: this.page,
          pageSize: this.pageSize,
        })
      );

      this.page++;
    }
  }
}
