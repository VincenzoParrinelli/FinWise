import { Component, inject, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as SavingsActions from '../../store/savings/savings.actions';
import { selectRandomSaving } from '../../store/savings/savings.selectors';

import { ProgressCircleComponent } from '../progress-circle/progress-circle.component';

import { MoneyComponent } from '../../svg/money/money.component';
import { SilverwareComponent } from '../../svg/silverware/silverware.component';

@Component({
  selector: 'app-random-transactions-card',
  standalone: true,
  imports: [MoneyComponent, SilverwareComponent, ProgressCircleComponent],
  templateUrl: './random-transactions-card.component.html',
  styleUrl: './random-transactions-card.component.scss',
})
export class RandomTransactionsCardComponent implements OnInit {
  private store = inject(Store);
  randomSaving = this.store.selectSignal(selectRandomSaving);

  ngOnInit() {
    this.store.dispatch(SavingsActions.getRandomSaving());
  }
}
