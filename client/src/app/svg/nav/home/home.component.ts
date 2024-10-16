import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.svg',
})
export class HomeSvgComponent {
  strokeColor = input<string>('stroke-light-green');
}
