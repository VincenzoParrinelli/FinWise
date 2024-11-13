import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-medicine',
  standalone: true,
  imports: [],
  templateUrl: './medicine.component.svg',
})
export class MedicineComponent {
  classNames = input<string>('');
  width = input<string>('50');
  height = input<string>('50');
}
