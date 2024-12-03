import { Component, signal } from '@angular/core';

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

  selectedBtnToggle(index: number) {
    this.btnsData.update((items) => {
      items.forEach((item, i) => {
        item.selected = index === i;
      });

      return items;
    });
  }
}
