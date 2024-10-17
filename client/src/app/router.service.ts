import { DestroyRef, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

export class RouterService {
  router = inject(Router);
  showNaw = signal<boolean>(true);
  showBackArrow = signal<boolean>(false);
  private destroyRef = inject(DestroyRef);
  private hideNavRoutes: string[] = ['/launch', '/login', '/signup'];
  private hideBackArrowRoutes: string[] = [
    '/launch',
    '/login',
    '/signup',
    '/home',
  ];

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToAnalysis() {
    this.router.navigate(['/analysis']);
  }

  subscribe() {
    const subscription = this.router.events.subscribe((event) => {
      if (!event) return;

      this.showNaw.set(!this.hideNavRoutes.includes(this.router.url));
      this.showBackArrow.set(
        !this.hideBackArrowRoutes.includes(this.router.url)
      );
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}
