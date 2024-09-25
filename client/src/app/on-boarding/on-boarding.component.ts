import { Component, inject, input, signal } from '@angular/core';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { CircleComponent } from '../svg/circle/circle.component';

import { RouterService } from '../router.service';

@Component({
  selector: 'app-on-boarding',
  standalone: true,
  imports: [MainLayoutComponent, CircleComponent],
  templateUrl: './on-boarding.component.html',
  styleUrl: './on-boarding.component.scss',
})
export class OnBoardingComponent {
  currentStep = signal(1);
  steps = input([1, 2]);
  routerService = inject(RouterService);

  handleStep() {
    this.currentStep.update((prevStep) => (prevStep += 1));

    if (this.currentStep() === 3) {
      this.routerService.navigateToLogin();
    }
  }
}
