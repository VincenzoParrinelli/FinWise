import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-wedding',
  standalone: true,
  imports: [],
  templateUrl: './wedding.component.svg',
})
export class WeddingComponent {
  classNames = input<string>('');
  width = input<string>('50');
  height = input<string>('50');
}
