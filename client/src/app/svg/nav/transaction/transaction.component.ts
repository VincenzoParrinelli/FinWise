import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-transaction',
  standalone: true,
  imports: [],
  templateUrl: './transaction.component.svg',
})
export class TransactionSvgComponent {
  strokeColor = input<string>('stroke-light-green');
}
