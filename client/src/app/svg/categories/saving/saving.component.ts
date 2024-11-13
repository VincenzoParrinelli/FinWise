import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-saving',
  standalone: true,
  imports: [],
  templateUrl: './saving.component.svg',
})
export class SavingComponent {
  classNames = input<string>('');
  width = input<string>('50');
  height = input<string>('50');
}
