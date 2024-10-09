import { Component, input } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';

import { BtnBgColor, BtnWidth, BtnType } from './custom-btn.model';

@Component({
  selector: 'app-custom-btn',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './custom-btn.component.html',
})
export class CustomBtnComponent {
  bgColor = input<BtnBgColor>('primary');
  textColor = input<string>();
  text = input<string>('');
  width = input<BtnWidth>('full');
  type = input<BtnType>('button');
  form = input<string>();
  loading = input<boolean>(false);
  selected = input<boolean>(false);
  rounded = input<'none' | 'md' | 'full'>('full');
}
