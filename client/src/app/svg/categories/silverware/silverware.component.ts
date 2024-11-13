import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-silverware',
  standalone: true,
  imports: [],
  templateUrl: './silverware.component.svg',
})
export class SilverwareComponent {
  classNames = input<string>('');
  width = input<string>('50');
  height = input<string>('50');
}
