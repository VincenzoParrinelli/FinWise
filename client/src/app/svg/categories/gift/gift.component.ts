import { Component, inject } from '@angular/core';
import {
  CLASSNAMES_TOKEN,
  HEIGHT_TOKEN,
  WIDTH_TOKEN,
} from '../../../shared/injection-tokens/svgs-injection-tokens';

@Component({
  selector: 'app-svg-gift',
  standalone: true,
  imports: [],
  templateUrl: './gift.component.svg',
})
export class GiftComponent {
  classNames: string = inject(CLASSNAMES_TOKEN);
  width: string = inject(WIDTH_TOKEN);
  height: string = inject(HEIGHT_TOKEN);
}
