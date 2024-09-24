import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { CircleComponent } from '../svg/circle/circle.component';

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
  router = inject(Router);

  handleStep() {
    this.currentStep.update((prevStep) => (prevStep += 1));

    if (this.currentStep() === 3) {
      this.router.navigate(['/login']);
    }
  }
}
