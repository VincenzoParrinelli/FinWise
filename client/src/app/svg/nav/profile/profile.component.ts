import { Component, input } from '@angular/core';

@Component({
  selector: 'app-svg-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.svg',
})
export class ProfileSvgComponent {
  strokeColor = input<string>('stroke-light-green');
}
