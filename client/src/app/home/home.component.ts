import { Component, inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { selectTransactions } from '../store/transactions/transactions.selectors';

import { BellComponent } from '../svg/bell/bell.component';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { TransactionsListComponent } from '../shared/transactions-list/transactions-list.component';
import { TotalCountersComponent } from '../shared/total-counters/total-counters.component';
import { RandomTransactionsCardComponent } from '../shared/random-transactions-card/random-transactions-card.component';

import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainLayoutComponent,
    BellComponent,
    TransactionsListComponent,
    TotalCountersComponent,
    RandomTransactionsCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private store = inject(Store);
  routerService = inject(RouterService);
  transactions = this.store.selectSignal(selectTransactions);

  get firstFiveTransactions() {
    return this.transactions().slice(0, 5);
  }
}
