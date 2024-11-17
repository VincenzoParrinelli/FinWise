import { Component, inject, Injector } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';

import { CategoryService } from '../category.service';
import { RouterService } from '../router.service';

import { SavingsListComponent } from '../savings-list/savings-list.component';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { TotalCountersComponent } from '../shared/total-counters/total-counters.component';
import {
  HEIGHT_TOKEN,
  WIDTH_TOKEN,
} from '../shared/injection-tokens/svgs-injection-tokens';
import { CustomBtnComponent } from '../shared/custom-btn/custom-btn.component';

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [
    MainLayoutComponent,
    TotalCountersComponent,
    NgComponentOutlet,
    CustomBtnComponent,
    SavingsListComponent,
  ],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.scss',
})
export class SavingsComponent {
  categoryService = inject(CategoryService);
  routerService = inject(RouterService);
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
