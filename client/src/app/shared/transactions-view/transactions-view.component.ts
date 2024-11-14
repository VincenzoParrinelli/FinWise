import { Component, inject, Injector, signal } from '@angular/core';
import { CurrencyPipe, NgComponentOutlet } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import {
  HEIGHT_TOKEN,
  WIDTH_TOKEN,
} from '../injection-tokens/svgs-injection-tokens';

import { CategoryService } from '../../category.service';

import { Store } from '@ngrx/store';
import { selectLoading } from '../../store/app/app.selectors';
import { TransactionsState } from '../../store/transactions/transactions.model';
import { selectTransaction } from '../../store/transactions/transactions.selectors';
import * as TransactionsActions from '../../store/transactions/transactions.actions';

import { MainLayoutComponent } from '../layouts/main/main.component';
import { CustomBtnComponent } from '../custom-btn/custom-btn.component';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-transactions-view',
  standalone: true,
  imports: [
    MainLayoutComponent,
    NgComponentOutlet,
    CurrencyPipe,
    CustomBtnComponent,
    DialogComponent,
  ],
  templateUrl: './transactions-view.component.html',
  styleUrl: './transactions-view.component.scss',
})
export class TransactionsViewComponent {
  private store = inject(Store<TransactionsState>);
  private route = inject(ActivatedRoute);
  private injector = inject(Injector);
  categoryService = inject(CategoryService);
  categories = this.categoryService.getAllCategories;
  loading = this.store.selectSignal(selectLoading);
  transactionId: string = this.route.snapshot.paramMap.get('id')!;
  isDialogOpen = signal<boolean>(false);
  transaction = this.store.selectSignal(selectTransaction(this.transactionId));

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

  onTransactionDelete(): void {
    this.store.dispatch(
      TransactionsActions.deleteTransaction({
        transactionId: this.transactionId,
      })
    );
  }
}
