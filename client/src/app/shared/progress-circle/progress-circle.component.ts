import { Component, inject, Injector, input } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

import { Saving } from '../../store/savings/savings.model';

import { CategoryService } from '../../services/category.service';
import {
  CLASSNAMES_TOKEN,
  WIDTH_TOKEN,
  FILL_TOKEN,
  STROKE_TOKEN,
  HEIGHT_TOKEN,
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

  radius = input<number>(30);
  private circumference: number = 2 * Math.PI * this.radius();

  randomSaving = input<Saving | null>(null);
  classNames = input<string>('');
  width = input<number>(50);
  height = input<number>(50);
  stroke = input<string>('#052224');
  categories = inject(CategoryService).getAllCategories;

  injectSvgProps(): Injector {
    return Injector.create({
      providers: [
        { provide: CLASSNAMES_TOKEN, useValue: this.classNames() },
        { provide: WIDTH_TOKEN, useValue: this.width() },
        { provide: HEIGHT_TOKEN, useValue: this.height() },
        { provide: FILL_TOKEN, useValue: 'none' },
        { provide: STROKE_TOKEN, useValue: this.stroke() },
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
