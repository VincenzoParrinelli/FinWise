import { Component, inject } from '@angular/core';
import { VectorComponent } from '../svg/vector/vector.component';

import { RouterService } from '../router.service';

@Component({
  selector: 'app-launch',
  standalone: true,
  imports: [VectorComponent],
  templateUrl: './launch.component.html',
  styleUrl: './launch.component.scss',
})
export class LaunchComponent {
  routerService = inject(RouterService);
}
