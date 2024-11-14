import { Component, DestroyRef, inject, Injector, signal } from '@angular/core';
import { CurrencyPipe, NgComponentOutlet } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import {
  HEIGHT_TOKEN,
  WIDTH_TOKEN,
} from '../injection-tokens/svgs-injection-tokens';

import { CategoryService } from '../../category.service';

import { Store } from '@ngrx/store';
import {
  Transaction,
  TransactionsState,
} from '../../store/transactions/transactions.model';
import { selectTransaction } from '../../store/transactions/transactions.selectors';

import { MainLayoutComponent } from '../layouts/main/main.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-transactions-view',
  standalone: true,
  imports: [MainLayoutComponent, NgComponentOutlet, CurrencyPipe],
  templateUrl: './transactions-view.component.html',
  styleUrl: './transactions-view.component.scss',
})
export class TransactionsViewComponent {
  private store = inject(Store<TransactionsState>);
  private route = inject(ActivatedRoute);
  private injector = inject(Injector);
  private destroyRef = inject(DestroyRef);
  categoryService = inject(CategoryService);
  categories = this.categoryService.getAllCategories;
  transaction = signal<Transaction | null>(null);

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        const id = params.get('id');

        if (id)
          this.store
            .select(selectTransaction(id))
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((transaction) => {
              this.transaction.set(transaction!);
            });
      });
  }

  injectSvgProps(): Injector {
    return Injector.create({
      providers: [
        { provide: WIDTH_TOKEN, useValue: '120' },
        { provide: HEIGHT_TOKEN, useValue: '120' },
      ],
      parent: this.injector,
    });
  }
}
