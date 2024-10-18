import { Component } from '@angular/core';
import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { TotalBalanceComponent } from '../shared/total-balance/total-balance.component';
import { IncomeComponent } from '../svg/income/income.component';
import { ExpensesComponent } from '../svg/expenses/expenses.component';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    MainLayoutComponent,
    TotalBalanceComponent,
    IncomeComponent,
    ExpensesComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {}
