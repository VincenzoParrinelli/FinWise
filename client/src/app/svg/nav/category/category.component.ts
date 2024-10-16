import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.svg',
})
export class CategorySvgComponent {
  strokeColor = input<string>('stroke-light-green');
}
