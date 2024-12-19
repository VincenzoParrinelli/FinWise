import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-radio-btn',
  standalone: true,
  imports: [],
  templateUrl: './radio-btn.component.svg',
})
export class RadioBtnComponent {
  fill = input<string>('');
}
