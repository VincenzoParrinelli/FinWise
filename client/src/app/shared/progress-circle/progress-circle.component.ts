import { Component, inject, Injector, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

import { Saving } from '../../store/savings/savings.model';

import { CategoryService } from '../../services/category.service';
import {
  FILL_TOKEN,
  STROKE_TOKEN,
} from '../injection-tokens/svgs-injection-tokens';

@Component({
  selector: 'app-progress-circle',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './progress-circle.component.html',
  styleUrl: './progress-circle.component.scss',
})
export class ProgressCircleComponent {
  private injector = inject(Injector);
  private circumference: number = 2 * Math.PI * 30; // fixed radius of 30;

  randomSaving = input<Saving | null>(null);
  categories = inject(CategoryService).getAllCategories;

  injectSvgProps(): Injector {
    return Injector.create({
      providers: [
        { provide: FILL_TOKEN, useValue: 'none' },
        { provide: STROKE_TOKEN, useValue: '#052224' },
      ],
      parent: this.injector,
    });
  }

  get progressPercentage(): number {
    return (
      (this.randomSaving()!.savedAmount / this.randomSaving()!.goalAmount) * 100
    );
  }

  get strokeDasharray(): number {
    return this.circumference;
  }

  get strokeDashoffset(): number {
    return (
      this.circumference - (this.progressPercentage / 100) * this.circumference
    );
  }
}
