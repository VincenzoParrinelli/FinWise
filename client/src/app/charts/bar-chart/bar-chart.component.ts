import { Component, signal } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import {
  ChartData,
  ChartOptions,
  ChartTypeRegistry,
  ScriptableScaleContext,
} from 'chart.js';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent {
  chartType = signal<keyof ChartTypeRegistry>('bar');

  chartData = signal<ChartData>({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

    datasets: [
      {
        label: 'Income',
        data: [5000, 6000, 5500, 7000, 6500, 5000],
        backgroundColor: '#00D09E',
      },
      {
        label: 'Expenses',
        data: [4000, 4500, 5000, 4800, 5200, 5000],
        backgroundColor: '#0068FF',
      },
    ],
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

            if (numValue === 0) {
              return '';
            }

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
