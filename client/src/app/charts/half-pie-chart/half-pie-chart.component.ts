import { Component, computed, input, signal } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Transaction } from '../../store/transactions/transactions.model';

@Component({
  selector: 'app-half-pie-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './half-pie-chart.component.html',
  styleUrl: './half-pie-chart.component.scss',
})
export class HalfPieChartComponent {
  transactions = input<Transaction[]>([]);

  get groupedTransactionsByCategory() {
    const groupedTransactions = this.transactions().reduce(
      (acc, { category, amount }) => {
        acc[category] = (acc[category] || 0) + Math.abs(amount);

        return acc;
      },
      {} as Record<string, number>
    );

    const totalAmount = Object.values(groupedTransactions).reduce(
      (sum, amount) => sum + amount,
      0
    );

    const sortedCategories = Object.entries(groupedTransactions).sort(
      (a, b) => b[1] - a[1]
    );

    const topTwo = sortedCategories.slice(0, 2);

    const othersSum = sortedCategories
      .slice(2)
      .reduce((sum, [, amount]) => sum + amount, 0);

    const result = [
      ...topTwo.map(([category, amount]) => ({
        category,
        percentage: parseInt(((amount / totalAmount) * 100).toFixed(0)),
      })),
    ];

    if (othersSum > 0) {
      result.push({
        category: 'Others',
        percentage: parseInt(((othersSum / totalAmount) * 100).toFixed(0)),
      });
    }

    return result;
  }

  ngOnInit() {
    Chart.register(ChartDataLabels);
  }

  chartType = signal<'pie'>('pie');

  chartData = computed<ChartData<'pie'>>(() => {
    const grouped = this.groupedTransactionsByCategory;
    return {
      labels: grouped.map((item) => item.category),
      datasets: [
        {
          data: grouped.map((item) => item.percentage),
          backgroundColor: ['#0068FF', '#6DB6FE', '#3299FF'],
          hoverBackgroundColor: ['#0050CC', '#5FA8F0', '#2680E0'],
          borderColor: '#093030',
          borderWidth: 4,
        },
      ],
    };
  });

  chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -90,
    circumference: 180,

    layout: {
      padding: {
        bottom: 90,
      },
    },

    plugins: {
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: '#fff',
        font: {
          family: 'League Spartan',
          weight: 'bold',
          size: 20,
        },
        formatter: (value: number) => {
          return `${value}%`;
        },
      },
      legend: {
        display: true,
        position: 'bottom',

        labels: {
          boxWidth: 10,
          boxHeight: 10,
          usePointStyle: true,
          color: 'white',
          font: {
            size: 13,
            weight: 'bold',
          },
        },
      },
    },
  };
}
