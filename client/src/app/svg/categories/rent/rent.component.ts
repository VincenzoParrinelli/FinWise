import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-rent',
  standalone: true,
  imports: [],
  templateUrl: './rent.component.svg',
})
export class RentComponent {
  classNames = input<string>('');
  width = input<string>('50');
  height = input<string>('50');
}
