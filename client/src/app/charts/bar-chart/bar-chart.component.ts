import { Component, computed, inject, input, signal } from '@angular/core';

import { Store } from '@ngrx/store';
import { selectLoading } from '../../store/app/app.selectors';
import {
  selectDailyTransactions,
  selectWeeklyTransactions,
} from '../../store/transactions/transactions.selectors';

import { BaseChartDirective } from 'ng2-charts';
import {
  ChartData,
  ChartOptions,
  ChartTypeRegistry,
  ScriptableScaleContext,
} from 'chart.js';

import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective, SpinnerComponent],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  private store = inject(Store);
  loading = this.store.selectSignal(selectLoading);
  selectedBtnText = input<'Daily' | 'Weekly' | 'Monthly' | 'Yearly'>('Daily');

  groupedTransactions = computed(() => {
    switch (this.selectedBtnText()) {
      case 'Daily':
        return {
          transactions: this.store.selectSignal(selectDailyTransactions)(),
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        };

      case 'Weekly':
        return {
          transactions: this.store.selectSignal(selectWeeklyTransactions)(),
          labels: ['1st Week', '2nd Week', '3rd Week', '4th Week'],
        };

      case 'Monthly':
        return {
          labels: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        };

      default:
        return {
          transactions: [] as any,
          labels: [],
        };
    }
  });

  chartType = signal<keyof ChartTypeRegistry>('bar');

  chartData = computed<ChartData>(() => {
    const { transactions, labels } = this.groupedTransactions();

    if (!transactions.length) {
      return {
        labels,
        datasets: [],
      };
    }

    const totalIncome = new Array(labels.length).fill(0);
    const totalExpenses = new Array(labels.length).fill(0);

    transactions?.forEach((t: any) => {
      const index = t.dayOfWeek ? t.dayOfWeek - 1 : t.weekOfMonth - 1;

      totalIncome[index] = t.totalIncome;
      totalExpenses[index] = Math.abs(t.totalExpenses);
    });

    return {
      labels,
      datasets: [
        {
          label: 'Income',
          data: totalIncome,
          backgroundColor: '#00D09E',
        },
        {
          label: 'Expenses',
          data: totalExpenses,
          backgroundColor: '#0068FF',
        },
      ],
    };
  });

  chartOptions = signal<ChartOptions>({
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 40,
        bottom: 45,
        left: 20,
        right: 35,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#093030',
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        grid: {
          color: (context: ScriptableScaleContext) => {
            return context.tick.value === 0 ? '#0E3E3E' : '#6DB6FE';
          },
          tickBorderDash: (context: ScriptableScaleContext) => {
            return context.tick.value === 0 ? [] : [2, 2];
          },
        },
        ticks: {
          color: '#0068FF',

          callback: (value) => {
            const numValue = Number(value);

            if (numValue === 0) return '';

            if (numValue >= 1000) {
              return numValue / 1000 + 'k';
            }

            return numValue;
          },
        },
        border: {
          display: false,
          dash: (context: ScriptableScaleContext) => {
            return context.tick.value === 0 ? [] : [2, 2];
          },
        },
        beginAtZero: true,
      },
    },
    datasets: {
      bar: {
        borderRadius: 50,
        categoryPercentage: 0.5,
        barPercentage: 0.4,
      },
    },
  });
}
