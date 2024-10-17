import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NgComponentOutlet } from '@angular/common';
import { RouterService } from '../../router.service';

import { HomeSvgComponent } from '../../svg/nav/home/home.component';
import { AnalysisSvgComponent } from '../../svg/nav/analysis/analysis.component';
import { TransactionSvgComponent } from '../../svg/nav/transaction/transaction.component';
import { CategorySvgComponent } from '../../svg/nav/category/category.component';
import { ProfileSvgComponent } from '../../svg/nav/profile/profile.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    HomeSvgComponent,
    AnalysisSvgComponent,
    TransactionSvgComponent,
    CategorySvgComponent,
    ProfileSvgComponent,
    NgComponentOutlet,
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  selectedSvg = signal<number>(0);
  routerService = inject(RouterService);
  router = inject(Router);
  private destroyRef = inject(DestroyRef);

  showNaw = signal<boolean>(true);
  private hideNavRoutes: string[] = ['/launch', '/login', '/signup'];

  ngOnInit() {
    const subscription = this.router.events.subscribe((event) => {
      if (!event) return;

      this.showNaw.set(!this.hideNavRoutes.includes(this.router.url));
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
