import { Component, inject } from '@angular/core';

import { CustomBtnComponent } from '../shared/custom-btn/custom-btn.component';

import { VectorComponent } from '../svg/vector/vector.component';

import { RouterService } from '../router.service';

@Component({
  selector: 'app-launch',
  standalone: true,
  imports: [VectorComponent, CustomBtnComponent],
  templateUrl: './launch.component.html',
  styleUrl: './launch.component.scss',
})
export class LaunchComponent {
  routerService = inject(RouterService);
}
