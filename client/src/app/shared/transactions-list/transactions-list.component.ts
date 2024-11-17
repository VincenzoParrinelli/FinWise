import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe, DatePipe, NgComponentOutlet } from '@angular/common';

import { Store } from '@ngrx/store';
import { Transaction } from '../../store/transactions/transactions.model';
import { selectTransactions } from '../../store/transactions/transactions.selectors';
import { selectLoading } from '../../store/app/app.selectors';

import { SpinnerComponent } from '../spinner/spinner.component';

import { RouterService } from '../../router.service';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, NgComponentOutlet, SpinnerComponent],
  templateUrl: './transactions-list.component.html',
  styleUrl: './transactions-list.component.scss',
})
export class TransactionsListComponent {
  private store = inject(Store);
  routerService = inject(RouterService);
  private activatedRoute = inject(ActivatedRoute);
  categories = inject(CategoryService).getAllCategories;
  transactions = this.store.selectSignal(selectTransactions);
  filteredTransactions = signal<Transaction[]>([]);
  loading = this.store.selectSignal(selectLoading);

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const filter = params['filter'];

      const filtered = this.transactions().filter((transaction) => {
        return (
          (filter === 'incomes' && transaction.amount > 0) ||
          (filter === 'expenses' && transaction.amount < 0)
        );
      });

      this.filteredTransactions.set(filtered);
    });
  }

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

    if (!prevDate) return currYearMatches ? 'EEEE' : 'y';

    const prevYear = prevDate.getFullYear();
    const prevMonth = prevDate.getMonth();
    const prevDay = prevDate.getDate();
    const currMonth = currDate.getMonth();
    const currDay = currDate.getDate();

    if (currDate.getFullYear() !== prevYear)
      return currYearMatches ? 'MMMM' : 'y';

    if (currMonth !== prevMonth) return 'MMMM';

    if (currDay !== prevDay) return 'EEEE';

    return '';
  }
}
