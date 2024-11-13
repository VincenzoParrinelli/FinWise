import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-travel',
  standalone: true,
  imports: [],
  templateUrl: './travel.component.svg',
})
export class TravelComponent {
  classNames = input<string>('');
  width = input<string>('50');
  height = input<string>('50');
}
