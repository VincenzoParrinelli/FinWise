import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Store } from '@ngrx/store';
import { selectTransactionsTotals } from '../../store/transactions/transactions.selectors';

@Component({
  selector: 'app-total-counters',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './total-counters.component.html',
  styleUrl: './total-counters.component.scss',
})
export class TotalCountersComponent {
  private store = inject(Store);
  transactionsTotals = this.store.selectSignal(selectTransactionsTotals);
}
