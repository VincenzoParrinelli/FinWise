import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-income',
  standalone: true,
  imports: [],
  templateUrl: './income.component.svg',
})
export class IncomeComponent {
  stroke = input<string>('stroke-caribbean-green');
  fill = input<string>('fill-caribbean-green');
}
