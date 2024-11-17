import { Component, inject } from '@angular/core';
import { CurrencyPipe, DatePipe, NgComponentOutlet } from '@angular/common';

import { Store } from '@ngrx/store';
import { selectLoading } from '../store/app/app.selectors';
import { selectSavings } from '../store/savings/savings.selectors';

import { SpinnerComponent } from '../shared/spinner/spinner.component';

import { RouterService } from '../router.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-savings-list',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, NgComponentOutlet, SpinnerComponent],
  templateUrl: './savings-list.component.html',
  styleUrl: './savings-list.component.scss',
})
export class SavingsListComponent {
  private store = inject(Store);
  routerService = inject(RouterService);
  categories = inject(CategoryService).getAllCategories;
  savings = this.store.selectSignal(selectSavings);
  loading = this.store.selectSignal(selectLoading);

  shouldDisplayDate(i: number, currSaving: any, prevSaving: any): boolean {
    return i === 0 || currSaving.date !== prevSaving?.date;
  }

  getDateFormat(currSaving: any, prevSaving: any): string {
    const currDate = new Date(currSaving.date);
    const prevDate = prevSaving ? new Date(prevSaving.date) : null;
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
