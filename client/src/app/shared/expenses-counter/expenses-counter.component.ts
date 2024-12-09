import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { ExpensesComponent } from '../../svg/expenses/expenses.component';

@Component({
  selector: 'app-expenses-counter',
  standalone: true,
  imports: [ExpensesComponent, CurrencyPipe],
  templateUrl: './expenses-counter.component.html',
  styleUrl: './expenses-counter.component.scss',
})
export class ExpensesCounterComponent {
  totalExpenses = input<number>(0);
  isSelected = input<boolean>(false);

  get expensesStrokeColor(): string {
    if (this.isSelected()) return 'stroke-honeydew';

    return 'stroke-ocean-blue';
  }

  get expensesFillColor(): string {
    if (this.isSelected()) return 'fill-honeydew';

    return 'fill-ocean-blue';
  }
}
