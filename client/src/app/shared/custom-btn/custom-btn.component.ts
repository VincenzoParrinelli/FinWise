import { Component, input } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-custom-btn',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './custom-btn.component.html',
})
export class CustomBtnComponent {
  bgColor = input<'primary' | 'secondary'>('primary');
  text = input<string>();
  width = input<'full' | 'half'>('full');
  type = input<'button' | 'submit' | 'reset'>('button');
  form = input<string>();
  loading = input<boolean>(false);
}
