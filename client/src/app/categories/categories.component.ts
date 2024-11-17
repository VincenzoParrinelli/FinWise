import { Component, inject, Injector } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

import { CategoryService } from '../category.service';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { TotalCountersComponent } from '../shared/total-counters/total-counters.component';
import {
  HEIGHT_TOKEN,
  WIDTH_TOKEN,
} from '../shared/injection-tokens/svgs-injection-tokens';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MainLayoutComponent, TotalCountersComponent, NgComponentOutlet],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categoryService = inject(CategoryService);
  private injector = inject(Injector);

  injectSvgProps(): Injector {
    return Injector.create({
      providers: [
        { provide: WIDTH_TOKEN, useValue: '90' },
        { provide: HEIGHT_TOKEN, useValue: '90' },
      ],
      parent: this.injector,
    });
  }
}
