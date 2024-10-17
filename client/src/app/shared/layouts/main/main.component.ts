import { Component, inject, input } from '@angular/core';
import { Location } from '@angular/common';

import { NavComponent } from '../../nav/nav.component';
import { BackArrowComponent } from '../../../svg/back-arrow/back-arrow.component';
import { RouterService } from '../../../router.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavComponent, BackArrowComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainLayoutComponent {
  screenMode = input<'full' | 'half'>();
  routerService = inject(RouterService);
  location = inject(Location);
  showBackArrow = this.routerService.showBackArrow;

  navigateBack() {
    this.location.back();
  }
}
