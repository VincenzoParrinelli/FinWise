import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Store } from '@ngrx/store';
import {
  selectTransactions,
  selectTransactionsTotals,
} from '../store/transactions/transactions.selectors';
import { TransactionsState } from '../store/transactions/transactions.model';

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
  private store = inject(Store<TransactionsState>);
  transactionsTotals = this.store.selectSignal(selectTransactionsTotals);
  transactions = this.store.selectSignal(selectTransactions);
}
