import { Component, inject, OnInit, signal } from '@angular/core';

import { Store } from '@ngrx/store';
import * as TransactionActions from '../store/transactions/transactions.actions';

import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { TotalCountersComponent } from '../shared/total-counters/total-counters.component';
import { CustomBtnComponent } from '../shared/custom-btn/custom-btn.component';

@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [
    MainLayoutComponent,
    TotalCountersComponent,
    CustomBtnComponent,
    BarChartComponent,
  ],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent implements OnInit {
  private store = inject(Store);
  btnsTexts = signal(['Daily', 'Weekly', 'Monthly', 'Yearly']);
  selectedBtnText = signal<'Daily' | 'Weekly' | 'Monthly' | 'Yearly'>('Daily');

  ngOnInit() {
    this.store.dispatch(
      TransactionActions.getGroupedTransactions({ group: 'Daily' })
    );
  }

  selectedBtnToggle(selectedBtnText: any): void {
    if (selectedBtnText === this.selectedBtnText()) return;

    this.selectedBtnText.set(selectedBtnText);

    this.dispatchGroupedTransactions();
  }

  dispatchGroupedTransactions(): void {
    switch (this.selectedBtnText()) {
      case 'Daily':
        this.store.dispatch(
          TransactionActions.getGroupedTransactions({ group: 'Daily' })
        );
        break;

      case 'Weekly':
        this.store.dispatch(
          TransactionActions.getGroupedTransactions({ group: 'Weekly' })
        );
        break;
    }
  }
}
