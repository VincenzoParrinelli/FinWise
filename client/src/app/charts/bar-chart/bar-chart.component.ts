import { Component, computed, inject, input, signal } from '@angular/core';

import { Store } from '@ngrx/store';
import { selectLoading } from '../../store/app/app.selectors';

import { BaseChartDirective } from 'ng2-charts';
import {
  ChartData,
  ChartOptions,
  ChartTypeRegistry,
  ScriptableScaleContext,
} from 'chart.js';

import { RouterService } from '../../services/router.service';

import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { CalendarComponent } from '../../svg/calendar/calendar.component';
import { SearchComponent } from '../../svg/search/search.component';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [
    BaseChartDirective,
    SpinnerComponent,
    CalendarComponent,
    SearchComponent,
  ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  private store = inject(Store);

  routerService = inject(RouterService);
  loading = this.store.selectSignal(selectLoading);
  chartLabels = input<any[]>([]);
  totalIncome = input<any[]>([]);
  totalExpenses = input<any[]>([]);

  chartType = signal<keyof ChartTypeRegistry>('bar');

  get maxIncomeOrExpense() {
    return Math.max(
      ...this.totalIncome().filter((income) => income),
      ...this.totalExpenses().filter((expense) => expense)
    );
  }

  chartData = computed<ChartData>(() => {
    return {
      labels: this.chartLabels(),
      datasets: [
        {
          label: 'Income',
          data: this.totalIncome(),
          backgroundColor: '#00D09E',
        },
        {
          label: 'Expenses',
          data: this.totalExpenses(),
          backgroundColor: '#0068FF',
        },
      ],
    };
  });

  chartOptions = computed<ChartOptions>(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 40,
          bottom: 55,
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
          type: this.maxIncomeOrExpense > 100 ? 'logarithmic' : 'linear',

          suggestedMin: 1,
          suggestedMax: this.maxIncomeOrExpense,

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

              if (numValue >= 1000000) return numValue / 1000000 + 'm';

              if (numValue >= 1000) return numValue / 1000 + 'k';

              return numValue;
            },
          },
          border: {
            display: false,
            dash: (context: ScriptableScaleContext) => {
              return context.tick.value === 0 ? [] : [2, 2];
            },
          },
        },
      },
      datasets: {
        bar: {
          borderRadius: 50,
          categoryPercentage: 0.5,
          barPercentage: 0.4,
        },
      },
    };
  });
}
