import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-car',
  standalone: true,
  imports: [],
  templateUrl: './car.component.svg',
})
export class CarComponent {
  classNames = input<string>('');
  width = input<string>('50');
  height = input<string>('50');
}
