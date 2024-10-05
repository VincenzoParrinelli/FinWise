import { inject } from '@angular/core';
import { Router } from '@angular/router';

export class RouterService {
  router = inject(Router);

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
