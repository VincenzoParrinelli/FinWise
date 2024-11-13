import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-transport',
  standalone: true,
  imports: [],
  templateUrl: './transport.component.svg',
})
export class TransportComponent {
  classNames = input<string>('');
  width = input<string>('50');
  height = input<string>('50');
}
