import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-gift',
  standalone: true,
  imports: [],
  templateUrl: './gift.component.svg',
})
export class GiftComponent {
  classNames = input<string>('');
  width = input<string>('50');
  height = input<string>('50');
}
