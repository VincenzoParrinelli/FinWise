import { Component, inject, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { CustomBtnComponent } from '../shared/custom-btn/custom-btn.component';
import { TransactionsListComponent } from '../shared/transactions-list/transactions-list.component';
import { DialogComponent } from '../shared/dialog/dialog.component';
import { ProgressCircleComponent } from '../shared/progress-circle/progress-circle.component';

import { Store } from '@ngrx/store';
import { selectLoading } from '../store/app/app.selectors';
import { Saving, SavingsState } from '../store/savings/savings.model';
import * as SavingActions from '../store/savings/savings.actions';

import { TransactionsState } from '../store/transactions/transactions.model';
import {
  selectSavingsTransactions,
  selectTotalSavingsTransactionsInDb,
} from '../store/transactions/transactions.selectors';
import * as TransactionsActions from '../store/transactions/transactions.actions';

import { CategoryService } from '../services/category.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-savings-view',
  standalone: true,
  imports: [
    MainLayoutComponent,
    CurrencyPipe,
    CustomBtnComponent,
    TransactionsListComponent,
    DialogComponent,
    ProgressCircleComponent,
  ],
  templateUrl: './savings-view.component.html',
  styleUrl: './savings-view.component.scss',
})
export class SavingsViewComponent implements OnInit {
  private store = inject(Store<SavingsState | TransactionsState>);
  private router = inject(Router);
  private page = 1;
  private pageSize = 10;

  categoryService = inject(CategoryService);
  routerService = inject(RouterService);
  categories = this.categoryService.getAllCategories;
  loading = this.store.selectSignal(selectLoading);
  isDialogOpen = signal<boolean>(false);
  saving: Saving = this.router.getCurrentNavigation()?.extras.state!['saving'];
  savingsTransactions = this.store.selectSignal(
    selectSavingsTransactions(this.saving._id!)
  );
  savingsTransactionsTotalDocumentsInDb = this.store.selectSignal(
    selectTotalSavingsTransactionsInDb
  );

  ngOnInit() {
    if (this.savingsTransactions().length) return;

    this.store.dispatch(
      TransactionsActions.getTransactionsWithTotals({
        page: this.page,
        pageSize: this.pageSize,
        savingId: this.saving._id!,
      })
    );
    this.page++;
  }

  openDialog(): void {
    this.isDialogOpen.set(true);
  }

  closeDialog(): void {
    this.isDialogOpen.set(false);
  }

  onSavingDelete(): void {
    this.store.dispatch(
      SavingActions.deleteSaving({
        savingId: this.saving._id!,
      })
    );
  }

  onScroll(event: any): void {
    const element = event.target;
    const threshold = 10;

    if (
      element.scrollHeight - element.scrollTop <=
        element.clientHeight + threshold &&
      this.savingsTransactions().length <
        this.savingsTransactionsTotalDocumentsInDb()
    ) {
      this.store.dispatch(
        TransactionsActions.getTransactionsWithTotals({
          page: this.page,
          pageSize: this.pageSize,
          savingId: this.saving._id!,
        })
      );

      this.page++;
    }
  }
}
