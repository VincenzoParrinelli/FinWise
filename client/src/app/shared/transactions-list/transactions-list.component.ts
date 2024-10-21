import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, NgComponentOutlet } from '@angular/common';
import { Store } from '@ngrx/store';

import { CategoryService } from '../../category.service';

import { selectTransactions } from '../../store/transactions/transactions.selectors';
import { RentComponent } from '../../svg/categories/rent/rent.component';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, NgComponentOutlet, RentComponent],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss',
})
export class TransactionsListComponent {
  private store = inject(Store);
  transactions = this.store.selectSignal(selectTransactions);
  categoryService = inject(CategoryService);
  categories = this.categoryService.getAllCategories();
}
