import { Component, inject } from '@angular/core';
import {
  CLASSNAMES_TOKEN,
  HEIGHT_TOKEN,
  WIDTH_TOKEN,
} from '../../../shared/injection-tokens/svgs-injection-tokens';

@Component({
  selector: 'app-svg-entertainment',
  standalone: true,
  imports: [],
  templateUrl: './entertainment.component.svg',
})
export class EntertainmentComponent {
  classNames: string = inject(CLASSNAMES_TOKEN);
  width: string = inject(WIDTH_TOKEN);
  height: string = inject(HEIGHT_TOKEN);
}
