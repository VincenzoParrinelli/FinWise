import { Component, inject, Injector, signal } from '@angular/core';
import { CurrencyPipe, NgComponentOutlet } from '@angular/common';
import { Router } from '@angular/router';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { CustomBtnComponent } from '../shared/custom-btn/custom-btn.component';
import { DialogComponent } from '../shared/dialog/dialog.component';

import { Store } from '@ngrx/store';
import { selectLoading } from '../store/app/app.selectors';
import { Saving, SavingsState } from '../store/savings/savings.model';
import * as SavingActions from '../store/savings/savings.actions';

import { CategoryService } from '../category.service';
import { RouterService } from '../router.service';

import {
  HEIGHT_TOKEN,
  WIDTH_TOKEN,
} from '../shared/injection-tokens/svgs-injection-tokens';

@Component({
  selector: 'app-savings-view',
  standalone: true,
  imports: [
    MainLayoutComponent,
    NgComponentOutlet,
    CurrencyPipe,
    CustomBtnComponent,
    DialogComponent,
  ],
  templateUrl: './savings-view.component.html',
  styleUrl: './savings-view.component.scss',
})
export class SavingsViewComponent {
  private store = inject(Store<SavingsState>);
  private router = inject(Router);
  private injector = inject(Injector);
  categoryService = inject(CategoryService);
  routerService = inject(RouterService);
  categories = this.categoryService.getAllCategories;
  loading = this.store.selectSignal(selectLoading);
  isDialogOpen = signal<boolean>(false);
  saving: Saving = this.router.getCurrentNavigation()?.extras.state!['saving'];

  injectSvgProps(): Injector {
    return Injector.create({
      providers: [
        { provide: WIDTH_TOKEN, useValue: '120' },
        { provide: HEIGHT_TOKEN, useValue: '120' },
      ],
      parent: this.injector,
    });
  }

  openDialog(): void {
    this.isDialogOpen.set(true);
  }

  closeDialog(): void {
    this.isDialogOpen.set(false);
  }

  onSavingDelete(): void {
    // this.store
    //   .dispatch
    //   SavingActions.deleteSaving({
    //     transactionId: this.transaction._id!,
    //   })
    //   ();
  }
}
