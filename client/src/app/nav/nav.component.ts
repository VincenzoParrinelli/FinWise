import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { RouterService } from '../services/router.service';

import { HomeSvgComponent } from '../svg/nav/home/home.component';
import { AnalysisSvgComponent } from '../svg/nav/analysis/analysis.component';
import { TransactionSvgComponent } from '../svg/nav/transaction/transaction.component';
import { CategorySvgComponent } from '../svg/nav/category/category.component';
import { ProfileSvgComponent } from '../svg/nav/profile/profile.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    HomeSvgComponent,
    AnalysisSvgComponent,
    TransactionSvgComponent,
    CategorySvgComponent,
    ProfileSvgComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  selectedSvg = signal<number>(0);
  routerService = inject(RouterService);
  showNav = this.routerService.showNaw;

  ngOnInit() {
    this.routerService.subscribeEvents();

    const subscription = this.routerService.currUrl$.subscribe((currUrl) => {
      switch (currUrl) {
        case '/home':
          this.selectedSvg.set(0);
          break;
        case '/analysis':
          this.selectedSvg.set(1);
          break;
        case '/transactions':
          this.selectedSvg.set(2);
          break;
        case '/savings':
          this.selectedSvg.set(3);
          break;
        case '/settings':
          this.selectedSvg.set(4);
          break;
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  isSvgSelected(i: number): boolean {
    return this.selectedSvg() === i;
  }

  getSvgStrokeColor(i: number) {
    return this.isSvgSelected(i) ? 'stroke-fence-green' : 'stroke-light-green';
  }

  onSvgClick(i: number, route: string): void {
    this.selectedSvg.set(i);
    this.routerService.navigateTo(route);
  }
}
