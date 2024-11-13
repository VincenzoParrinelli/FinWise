import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-salary',
  standalone: true,
  imports: [],
  templateUrl: './salary.component.svg',
})
export class SalaryComponent {
  classNames = input<string>('');
  width = input<string>('50');
  height = input<string>('50');
}
