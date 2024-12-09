import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { Store } from '@ngrx/store';
import * as TransactionActions from '../store/transactions/transactions.actions';
import {
  selectDailyTransactions,
  selectMonthlyTransactions,
  selectWeeklyTransactions,
  selectYearlyTransactions,
} from '../store/transactions/transactions.selectors';

import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { TotalCountersComponent } from '../shared/total-counters/total-counters.component';
import { CustomBtnComponent } from '../shared/custom-btn/custom-btn.component';
import { IncomeCounterComponent } from '../shared/income-counter/income-counter.component';
import { ExpensesCounterComponent } from '../shared/expenses-counter/expenses-counter.component';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [
    MainLayoutComponent,
    TotalCountersComponent,
    CustomBtnComponent,
    BarChartComponent,
    IncomeCounterComponent,
    ExpensesCounterComponent,
  ],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent implements OnInit {
  private store = inject(Store);
  btnsTexts = signal(['Daily', 'Weekly', 'Monthly', 'Yearly']);
  selectedBtnText = signal<'Daily' | 'Weekly' | 'Monthly' | 'Yearly'>('Daily');

  ngOnInit() {
    this.dispatchGroupedTransactions('Daily');
  }

  selectedBtnToggle(selectedBtnText: any): void {
    if (selectedBtnText === this.selectedBtnText()) return;

    this.selectedBtnText.set(selectedBtnText);

    this.dispatchGroupedTransactions(this.selectedBtnText());
  }

  private dispatchGroupedTransactions(
    group: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly'
  ): void {
    this.store.dispatch(TransactionActions.getGroupedTransactions({ group }));
  }

  groupedTransactions = computed(() => {
    const group = this.selectedBtnText();
    let selector;

    switch (group) {
      case 'Daily':
        selector = selectDailyTransactions;
        break;
      case 'Weekly':
        selector = selectWeeklyTransactions;
        break;
      case 'Monthly':
        selector = selectMonthlyTransactions;
        break;
      case 'Yearly':
        selector = selectYearlyTransactions;
        break;
    }

    return this.store.selectSignal(selector)();
  });

  chartLabels = computed(() => {
    switch (this.selectedBtnText()) {
      case 'Daily':
        return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      case 'Weekly':
        return ['1st Week', '2nd Week', '3rd Week', '4th Week'];
      case 'Monthly':
        return this.last7monthsLabels;
      case 'Yearly':
        return this.last7YearsLabels;
      default:
        return [];
    }
  });

  get last7monthsLabels() {
    const labels = [];
    const currDate = new Date();
    const currMonth = currDate.getMonth();

    for (let i = 6; i >= 0; i--) {
      const monthIndex = (currMonth - i + 12) % 12;
      const monthName = new Date(0, monthIndex).toLocaleString('en', {
        month: 'short',
      });

      labels.push(monthName);
    }

    return labels;
  }

  get last7YearsLabels() {
    const labels = [];
    const currDate = new Date();
    const currYear = currDate.getFullYear();

    for (let i = 6; i >= 0; i--) {
      const year = currYear - i;
      labels.push(year.toString());
    }

    return labels;
  }

  totalIncomeAndExpenses = computed(() => {
    const totalIncome = new Array(this.chartLabels.length).fill(0);
    const totalExpenses = new Array(this.chartLabels.length).fill(0);

    this.groupedTransactions()?.forEach((t: any) => {
      const currYear = new Date().getFullYear();
      let index: number;

      if (t.dayOfWeek) {
        index = t.dayOfWeek - 1;
      } else if (t.month) {
        index = t.month - 6;
      } else if (t.weekOfMonth) {
        index = t.weekOfMonth - 1;
      } else if (t.year) {
        index = currYear - t.year + 5;
      } else {
        index = -1;
      }

      totalIncome[index] = t.totalIncome;
      totalExpenses[index] = Math.abs(t.totalExpenses);
    });

    return {
      totalIncome,
      totalExpenses,
    };
  });
}
