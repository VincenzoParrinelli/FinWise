import { Component, inject, Injector, OnInit } from '@angular/core';
import { CurrencyPipe, NgComponentOutlet } from '@angular/common';

import { Store } from '@ngrx/store';
import * as TransactionsActions from '../../store/transactions/transactions.actions';
import * as SavingsActions from '../../store/savings/savings.actions';
import { selectRandomSaving } from '../../store/savings/savings.selectors';
import { selectRandomGroupedTransaction } from '../../store/transactions/transactions.selectors';

import { ProgressCircleComponent } from '../progress-circle/progress-circle.component';

import { CategoryService } from '../../services/category.service';

import {
  FILL_TOKEN,
  STROKE_TOKEN,
} from '../injection-tokens/svgs-injection-tokens';

@Component({
  selector: 'app-random-transactions-card',
  standalone: true,
  imports: [ProgressCircleComponent, NgComponentOutlet, CurrencyPipe],
  templateUrl: './random-transactions-card.component.html',
  styleUrl: './random-transactions-card.component.scss',
})
export class RandomTransactionsCardComponent implements OnInit {
  private store = inject(Store);
  private injector = inject(Injector);

  categories = inject(CategoryService).getAllCategories;
  randomSaving = this.store.selectSignal(selectRandomSaving);
  randomGroupedTransaction = this.store.selectSignal(
    selectRandomGroupedTransaction
  );

  ngOnInit() {
    this.store.dispatch(SavingsActions.getRandomSaving());
    this.store.dispatch(TransactionsActions.getRandomGroupedTransaction());
  }

  injectSvgProps(): Injector {
    return Injector.create({
      providers: [
        { provide: FILL_TOKEN, useValue: 'none' },
        { provide: STROKE_TOKEN, useValue: '#052224' },
      ],
      parent: this.injector,
    });
  }
}
