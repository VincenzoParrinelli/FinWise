import { Component, inject } from '@angular/core';
import {
  CLASSNAMES_TOKEN,
  WIDTH_TOKEN,
  HEIGHT_TOKEN,
  FILL_TOKEN,
  STROKE_TOKEN,
} from '../../../shared/injection-tokens/svgs-injection-tokens';

@Component({
  selector: 'app-svg-salary',
  standalone: true,
  imports: [],
  templateUrl: './salary.component.svg',
})
export class SalaryComponent {
  classNames: string = inject(CLASSNAMES_TOKEN);
  width: string = inject(WIDTH_TOKEN);
  height: string = inject(HEIGHT_TOKEN);
  fill: string = inject(FILL_TOKEN);
  stroke: string = inject(STROKE_TOKEN);
}
