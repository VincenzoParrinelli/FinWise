import { Component, inject, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { selectUserId } from '../store/user/user.selectors';
import {
  selectSavings,
  selectSavingsTotalDocuments,
} from '../store/savings/savings.selectors';
import * as SavingsActions from '../store/savings/savings.actions';

import { SavingsListComponent } from '../savings-list/savings-list.component';

import { MainLayoutComponent } from '../shared/layouts/main/main.component';
import { TotalCountersComponent } from '../shared/total-counters/total-counters.component';
import { CustomBtnComponent } from '../shared/custom-btn/custom-btn.component';

import { CategoryService } from '../services/category.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-savings',
  standalone: true,
  imports: [
    MainLayoutComponent,
    TotalCountersComponent,
    CustomBtnComponent,
    SavingsListComponent,
  ],
  templateUrl: './savings.component.html',
  styleUrl: './savings.component.scss',
})
export class SavingsComponent implements OnInit {
  private store = inject(Store);
  private page = 1;
  private pageSize = 10;

  categoryService = inject(CategoryService);
  routerService = inject(RouterService);
  userId = this.store.selectSignal(selectUserId);
  savings = this.store.selectSignal(selectSavings);
  savingsTotalUserDocuments = this.store.selectSignal(
    selectSavingsTotalDocuments
  );

  ngOnInit() {
    if (this.savings().length) return;

    this.dispatchGetSavings();
  }

  private dispatchGetSavings() {
    this.store.dispatch(
      SavingsActions.getSavings({
        page: this.page,
        pageSize: this.pageSize,
      })
    );

    this.page++;
  }

  onScroll(event: any): void {
    const element = event.target;
    const threshold = 10;

    if (
      element.scrollHeight - element.scrollTop <=
        element.clientHeight + threshold &&
      this.savings().length < this.savingsTotalUserDocuments()
    ) {
      this.dispatchGetSavings();
    }
  }
}
