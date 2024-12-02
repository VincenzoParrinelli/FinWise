import { Component, inject } from '@angular/core';
import { map } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectUserState } from '../store/user/user.selectors';
import { selectTransactions } from '../store/transactions/transactions.selectors';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { TransactionsListComponent } from '../shared/transactions-list/transactions-list.component';
import { TotalCountersComponent } from '../shared/total-counters/total-counters.component';
import { BellComponent } from '../svg/bell/bell.component';
import { MoneyComponent } from '../svg/money/money.component';
import { SilverwareComponent } from '../svg/silverware/silverware.component';
import { CarComponent } from '../svg/car/car.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MainLayoutComponent,
    BellComponent,
    MoneyComponent,
    SilverwareComponent,
    CarComponent,
    TransactionsListComponent,
    TotalCountersComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private store = inject(Store);
  transactions = this.store.selectSignal(selectTransactions);

  get userData() {
    return this.store.select(selectUserState).pipe(
      map((userState) => {
        return userState.user;
      })
    );
  }
}
