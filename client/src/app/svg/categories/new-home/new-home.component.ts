import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-new-home',
  standalone: true,
  imports: [],
  templateUrl: './new-home.component.svg',
})
export class NewHomeComponent {
  classNames = input<string>('');
  width = input<string>('50');
  height = input<string>('50');
}
