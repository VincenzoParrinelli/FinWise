import { Component, computed, inject, OnInit, signal } from '@angular/core';

import { Store } from '@ngrx/store';
import * as TransactionActions from '../store/transactions/transactions.actions';
import * as SavingsActions from '../store/savings/savings.actions';
import {
  selectDailyTransactions,
  selectMonthlyTransactions,
  selectWeeklyTransactions,
  selectYearlyTransactions,
} from '../store/transactions/transactions.selectors';
import {
  selectSavings,
  selectSavingsTotalDocuments,
} from '../store/savings/savings.selectors';

import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { TotalCountersComponent } from '../shared/total-counters/total-counters.component';
import { CustomBtnComponent } from '../shared/custom-btn/custom-btn.component';
import { IncomeCounterComponent } from '../shared/income-counter/income-counter.component';
import { ExpensesCounterComponent } from '../shared/expenses-counter/expenses-counter.component';
import { ProgressCircleComponent } from '../shared/progress-circle/progress-circle.component';

import { RouterService } from '../services/router.service';

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
    ProgressCircleComponent,
  ],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent implements OnInit {
  private store = inject(Store);
  private page = 1;
  private pageSize = 10;

  routerService = inject(RouterService);
  btnsTexts = signal(['Daily', 'Weekly', 'Monthly', 'Yearly']);
  selectedBtnText = signal<'Daily' | 'Weekly' | 'Monthly' | 'Yearly'>('Daily');
  savings = this.store.selectSignal(selectSavings);
  savingsTotalUserDocuments = this.store.selectSignal(
    selectSavingsTotalDocuments
  );

  ngOnInit() {
    this.dispatchGroupedTransactions('Daily');

    if (this.savings().length) return;

    this.dispatchGetSavings();
  }

  selectedBtnToggle(selectedBtnText: any): void {
    if (selectedBtnText === this.selectedBtnText()) return;

    this.selectedBtnText.set(selectedBtnText);

    this.dispatchGroupedTransactions(this.selectedBtnText());
  }

  private dispatchGetSavings() {
    this.store.dispatch(
      SavingsActions.getSavings({
        page: this.page,
        pageSize: this.pageSize,
      })
    );

    this.page++;
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
      let index: number;

      if (t.dayOfWeek) {
        index = t.dayOfWeek - 1;
      } else if (t.month) {
        index = Math.abs(t.month - 7);
      } else if (t.weekOfMonth) {
        index = t.weekOfMonth - 1;
      } else if (t.year) {
        index = this.chartLabels().indexOf(t.year.toString());
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

  get totalIncome() {
    return this.totalIncomeAndExpenses()?.totalIncome.reduce(
      (prevVal, currVal) => prevVal + currVal,
      0
    );
  }

  get totalExpenses() {
    return this.totalIncomeAndExpenses()?.totalExpenses.reduce(
      (prevVal, currVal) => prevVal + currVal,
      0
    );
  }

  onScroll(event: any): void {
    const element = event.target;
    const threshold = 10;

    if (
      element.scrollHeight - element.scrollTop <=
        element.clientHeight + threshold &&
      this.savings().length < this.savingsTotalUserDocuments()
    ) {
      this.dispatchGetSavings();
    }
  }
}
