import { DestroyRef, inject, signal } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { Transaction } from '../store/transactions/transactions.model';
import { Saving } from '../store/savings/savings.model';

// TODO: use a single method when navigating to routes
export class RouterService {
  private location = inject(Location);
  private destroyRef = inject(DestroyRef);
  private hideNavRoutes: string[] = ['/launch', '/login', '/signup'];
  private hideBackArrowRoutes: string[] = [
    '/launch',
    '/login',
    '/signup',
    '/home',
  ];
  private currUrlSubject = new BehaviorSubject<string>('');

  currUrl$ = this.currUrlSubject.asObservable();
  router = inject(Router);
  showNaw = signal<boolean>(true);
  showBackArrow = signal<boolean>(false);

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  navigateBack() {
    this.location.back();
  }

  resetQueryParams() {
    this.router.navigate([], {
      queryParams: {},
      queryParamsHandling: '',
    });
  }

  setQueryParams(paramName: string, paramValue: string) {
    this.router.navigate([], {
      queryParams: { [paramName]: paramValue },
      queryParamsHandling: 'merge',
    });
  }

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

  navigateToTransactions() {
    this.router.navigate(['/transactions']);
  }

  navigateToTransactionsView(transaction: Transaction) {
    this.router.navigate(['/transactions/view'], { state: { transaction } });
  }

  navigateToTransactionsAdd(saving?: Saving) {
    this.router.navigate(['/transactions/add'], { state: { saving } });
  }

  navigateToTransactionsEdit(transaction: Transaction) {
    this.router.navigate(['/transactions/edit'], { state: { transaction } });
  }

  navigateToSavings() {
    this.router.navigate(['/savings']);
  }

  navigateToSavingsView(saving: Saving) {
    this.router.navigate(['/savings/view'], { state: { saving } });
  }

  navigateToSavingsAdd() {
    this.router.navigate(['/savings/add']);
  }

  navigateToSavingsEdit(saving: Saving) {
    this.router.navigate(['/savings/edit'], { state: { saving } });
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  navigateToProfileEdit() {
    this.router.navigate(['/settings/profile-edit']);
  }

  navigateToSettingsEdit() {
    this.router.navigate(['/settings/edit']);
  }

  navigateToPasswordEdit() {
    this.router.navigate(['/settings/edit/password']);
  }

  navigateToCalendar() {
    this.router.navigate(['/calendar']);
  }

  navigateToSearch() {
    this.router.navigate(['/search']);
  }

  subscribeEvents() {
    const eventsSubscription = this.router.events.subscribe((event) => {
      if (!event) return;

      if (event instanceof NavigationEnd) this.currUrlSubject.next(event.url);

      this.showNaw.set(!this.hideNavRoutes.includes(this.router.url));
      this.showBackArrow.set(
        !this.hideBackArrowRoutes.includes(this.router.url)
      );
    });

    this.destroyRef.onDestroy(() => eventsSubscription.unsubscribe());
  }
}
