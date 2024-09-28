import { Component, input } from '@angular/core';

@Component({
  selector: 'app-custom-btn',
  standalone: true,
  imports: [],
  templateUrl: './custom-btn.component.html',
  styleUrl: './custom-btn.component.scss',
})
export class CustomBtnComponent {
  bgColor = input<'primary' | 'secondary'>('primary');
  text = input<string>();
  width = input<'full' | 'half'>('full');
  type = input<'button' | 'submit' | 'reset'>('button');
  form = input<string>();
}
