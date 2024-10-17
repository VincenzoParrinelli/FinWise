import { Component, inject, input } from '@angular/core';
import { Location } from '@angular/common';

import { RouterService } from '../../../router.service';

import { NavComponent } from '../../nav/nav.component';
import { BackArrowComponent } from '../../../svg/back-arrow/back-arrow.component';
import { BellComponent } from '../../../svg/bell/bell.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavComponent, BackArrowComponent, BellComponent],
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
