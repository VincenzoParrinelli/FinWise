import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { IncomeComponent } from '../../svg/income/income.component';

@Component({
  selector: 'app-income-counter',
  standalone: true,
  imports: [IncomeComponent, CurrencyPipe],
  templateUrl: './income-counter.component.html',
  styleUrl: './income-counter.component.scss',
})
export class IncomeCounterComponent {
  totalIncome = input<number>(0);
  isSelected = input<boolean>(false);

  get incomesStrokeColor(): string {
    if (this.isSelected()) return 'stroke-honeydew';

    return 'stroke-caribbean-green';
  }

  get incomesFillColor(): string {
    if (this.isSelected()) return 'fill-honeydew';

    return 'fill-caribbean-green';
  }
}
