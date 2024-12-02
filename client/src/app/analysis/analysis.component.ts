import { Component, signal } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import {
  ChartTypeRegistry,
  ChartOptions,
  ChartData,
  ScriptableScaleContext,
} from 'chart.js';

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
    BaseChartDirective,
  ],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.scss',
})
export class AnalysisComponent {
  btnsData = signal([
    {
      text: 'Daily',
      selected: true,
    },
    {
      text: 'Weekly',
      selected: false,
    },
    {
      text: 'Monthly',
      selected: false,
    },
    {
      text: 'Yearly',
      selected: false,
    },
  ]);

  chartType: keyof ChartTypeRegistry = 'bar';

  chartData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],

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
  };

  chartOptions: ChartOptions = {
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
            return context.tick.value === 0 ? '#0E3E3E' : '#0068FF';
          },
          tickBorderDash: (context: ScriptableScaleContext) => {
            return context.tick.value === 0 ? [] : [2, 2];
          },
        },
        ticks: {
          color: '#0068FF',

          callback: (value, index) => {
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
  };

  selectedBtnToggle(index: number) {
    this.btnsData.update((items) => {
      items.forEach((item, i) => {
        item.selected = index === i;
      });

      return items;
    });
  }
}
