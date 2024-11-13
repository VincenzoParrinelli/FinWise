import { Component, inject } from '@angular/core';
import {
  CLASSNAMES_TOKEN,
  HEIGHT_TOKEN,
  WIDTH_TOKEN,
} from '../../../shared/injection-tokens/svgs-injection-tokens';

@Component({
  selector: 'app-svg-medicine',
  standalone: true,
  imports: [],
  templateUrl: './medicine.component.svg',
})
export class MedicineComponent {
  classNames: string = inject(CLASSNAMES_TOKEN);
  width: string = inject(WIDTH_TOKEN);
  height: string = inject(HEIGHT_TOKEN);
}
