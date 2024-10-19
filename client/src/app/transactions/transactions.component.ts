import { Component, inject } from '@angular/core';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { TotalBalanceComponent } from '../shared/total-balance/total-balance.component';

import { IncomeComponent } from '../svg/income/income.component';
import { ExpensesComponent } from '../svg/expenses/expenses.component';
import { PlusComponent } from '../svg/plus/plus.component';

import { RouterService } from '../router.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    MainLayoutComponent,
    TotalBalanceComponent,
    IncomeComponent,
    ExpensesComponent,
    PlusComponent,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent {
  routerService = inject(RouterService);
}
