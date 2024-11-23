import { Component, inject } from '@angular/core';

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

import { CategoryService } from '../category.service';
import { RouterService } from '../router.service';

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
export class SavingsComponent {
  categoryService = inject(CategoryService);
  routerService = inject(RouterService);
  private store = inject(Store);
  private page = 2;
  private pageSize = 10;
  userId = this.store.selectSignal(selectUserId);
  savings = this.store.selectSignal(selectSavings);
  savingsTotalUserDocuments = this.store.selectSignal(
    selectSavingsTotalDocuments
  );

  onScroll(event: any): void {
    const element = event.target;
    const threshold = 10;

    if (
      element.scrollHeight - element.scrollTop <=
        element.clientHeight + threshold &&
      this.savings().length < this.savingsTotalUserDocuments()
    ) {
      this.store.dispatch(
        SavingsActions.getSavings({
          page: this.page,
          pageSize: this.pageSize,
        })
      );

      this.page++;
    }
  }
}
