import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-entertainment',
  standalone: true,
  imports: [],
  templateUrl: './entertainment.component.svg',
})
export class EntertainmentComponent {
  classNames = input<string>('');
  width = input<string>('50');
  height = input<string>('50');
}
