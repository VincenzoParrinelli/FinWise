import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, NgComponentOutlet } from '@angular/common';
import { Store } from '@ngrx/store';

import { CategoryService } from '../../category.service';

import { selectTransactions } from '../../store/transactions/transactions.selectors';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, NgComponentOutlet],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss',
})
export class TransactionsListComponent {
  private store = inject(Store);
  transactions = this.store.selectSignal(selectTransactions);
  categoryService = inject(CategoryService);
  categories = this.categoryService.getAllCategories();

  shouldDisplayDate(
    i: number,
    currTransaction: any,
    prevTransaction: any
  ): boolean {
    return i === 0 || currTransaction.date !== prevTransaction?.date;
  }

  getDateFormat(currTransaction: any, prevTransaction: any): string {
    const currDate = new Date(currTransaction.date);
    const prevDate = prevTransaction ? new Date(prevTransaction.date) : null;
    const currYear = new Date().getFullYear();
    const currYearMatches = currDate.getFullYear() === currYear;

    if (!prevDate) {
      return currYearMatches ? 'MMMM' : 'y';
    }

    const prevYear = prevDate.getFullYear();
    const prevMonth = prevDate.getMonth();
    const prevDay = prevDate.getDate();
    const currMonth = currDate.getMonth();
    const currDay = currDate.getDate();

    if (currDate.getFullYear() !== prevYear) {
      return currYearMatches ? 'MMMM' : 'y';
    }

    if (currMonth !== prevMonth) {
      return 'MMMM';
    }

    if (currDay !== prevDay) {
      return 'EEEE';
    }

    return '';
  }
}
