import { Component, input } from '@angular/core';

@Component({
  selector: 'app-money',
  standalone: true,
  imports: [],
  templateUrl: './money.component.svg',
})
export class MoneyComponent {
  strokeColor = input<string>('stroke-honeydew');
}
