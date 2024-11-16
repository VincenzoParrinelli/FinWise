import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-expenses',
  standalone: true,
  imports: [],
  templateUrl: './expenses.component.svg',
})
export class ExpensesComponent {
  stroke = input<string>('stroke-ocean-blue');
  fill = input<string>('fill-ocean-blue');
}
