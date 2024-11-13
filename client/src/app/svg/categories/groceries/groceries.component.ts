import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-groceries',
  standalone: true,
  imports: [],
  templateUrl: './groceries.component.svg',
})
export class GroceriesComponent {
  classNames = input<string>('');
  width = input<string>('50');
  height = input<string>('50');
}
