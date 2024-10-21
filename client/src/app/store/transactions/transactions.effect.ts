import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment.development';
import { catchError, map, mergeMap, of, tap, withLatestFrom } from 'rxjs';

import { RouterService } from '../../router.service';

import * as TransactionsActions from './transactions.actions';
import * as UserActions from '../user/user.actions';
import * as AppActions from '../app/app.actions';

import { Transaction } from './transactions.model';

import { selectUserId } from '../user/user.selectors';

export class TransactionsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private routerService = inject(RouterService);

  getTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUserSuccess),
      mergeMap((action) =>
        this.http
          .get<Transaction[]>(
            `${this.apiUrl}/transactions/${action.user._id}`,
            {
              withCredentials: true,
            }
          )
          .pipe(
            map((transactions) =>
              TransactionsActions.getTransactionsSuccess({ transactions })
            ),
            tap(() =>
              this.store.dispatch(AppActions.setLoading({ loading: false }))
            ),
            catchError((error) => {
              this.store.dispatch(AppActions.setLoading({ loading: false }));
              return of();
            })
          )
      )
    )
  );

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.createTransaction),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      withLatestFrom(this.store.select(selectUserId)),
      mergeMap(([{ transaction }, _id]) =>
        this.http
          .post<Transaction>(
            `${this.apiUrl}/transactions/create`,
            { ...transaction, userId: _id },
            {
              withCredentials: true,
            }
          )
          .pipe(
            map((createdTransaction) =>
              TransactionsActions.createTransactionSuccess({
                transaction: createdTransaction,
              })
            ),
            tap(() =>
              this.store.dispatch(AppActions.setLoading({ loading: false }))
            ),
            tap(() => this.routerService.navigateToTransactions()),
            catchError((error) => {
              this.store.dispatch(AppActions.setLoading({ loading: false }));
              return of();
            })
          )
      )
    )
  );
}
