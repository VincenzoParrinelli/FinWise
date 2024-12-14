import { inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import * as AppActions from '../app/app.actions';
import { Transaction, TransactionsState } from './transactions.model';
import * as TransactionsActions from './transactions.actions';
import * as UserActions from '../user/user.actions';

import { environment } from '../../../environments/environment.development';
import { catchError, EMPTY, map, mergeMap, of, tap } from 'rxjs';

import { RouterService } from '../../services/router.service';

export class TransactionsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private routerService = inject(RouterService);

  getTransactionsOnLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUserSuccess),
      mergeMap(() =>
        this.http.get<TransactionsState>(`${this.apiUrl}/transactions`).pipe(
          map((transactionsWithTotals) =>
            TransactionsActions.getTransactionsWithTotalsSuccess({
              transactionsWithTotals,
            })
          ),
          tap(() =>
            this.store.dispatch(AppActions.setLoading({ loading: false }))
          ),
          catchError((error) => {
            this.store.dispatch(AppActions.setLoading({ loading: false }));
            return EMPTY;
          })
        )
      )
    )
  );

  getPaginatedTransactions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.getTransactionsWithTotals),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(({ page, pageSize, savingId }) => {
        const params = new HttpParams()
          .set('page', page)
          .set('pageSize', pageSize)
          .set('savingId', savingId ?? '');

        return this.http
          .get<TransactionsState>(`${this.apiUrl}/transactions`, {
            params,
          })
          .pipe(
            map((transactionsWithTotals) =>
              TransactionsActions.getTransactionsWithTotalsSuccess({
                transactionsWithTotals,
                savingId,
              })
            ),
            tap(() =>
              this.store.dispatch(AppActions.setLoading({ loading: false }))
            ),
            catchError((error) => {
              this.store.dispatch(AppActions.setLoading({ loading: false }));
              return EMPTY;
            })
          );
      })
    )
  );

  getPaginatedTransactionsByDate = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.getTransactionsByDate),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(({ date }) =>
        this.http
          .get<Transaction[]>(`${this.apiUrl}/transactions/${date}`)
          .pipe(
            map((filteredByDateTransactions) =>
              TransactionsActions.getTransactionsByDateSuccess({
                filteredByDateTransactions,
              })
            ),
            tap(() =>
              this.store.dispatch(AppActions.setLoading({ loading: false }))
            ),
            catchError((error) => {
              this.store.dispatch(AppActions.setLoading({ loading: false }));
              return EMPTY;
            })
          )
      )
    )
  );

  getGroupedTransactions = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.getGroupedTransactions),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(({ group }) =>
        this.http.get<any>(`${this.apiUrl}/transactions/grouped/${group}`).pipe(
          map((groupedTransactions) =>
            TransactionsActions.getGroupedTransactionsSuccess({
              groupedTransactions,
              group,
            })
          ),
          tap(() =>
            this.store.dispatch(AppActions.setLoading({ loading: false }))
          ),
          catchError((error) => {
            this.store.dispatch(AppActions.setLoading({ loading: false }));
            return EMPTY;
          })
        )
      )
    )
  );

  createTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.createTransaction),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(({ transaction, savingId }) =>
        this.http
          .post<Transaction>(`${this.apiUrl}/transactions/create`, {
            transaction,
            savingId,
          })
          .pipe(
            map((createdTransaction) => {
              if (savingId)
                return TransactionsActions.createSavingTransactionSuccess({
                  transaction: createdTransaction,
                  savingId,
                });

              return TransactionsActions.createTransactionSuccess({
                transaction: createdTransaction,
              });
            }),
            tap(() =>
              this.store.dispatch(AppActions.setLoading({ loading: false }))
            ),
            tap(() => this.routerService.navigateToTransactions()),
            catchError((error) => {
              this.store.dispatch(AppActions.setLoading({ loading: false }));
              return EMPTY;
            })
          )
      )
    )
  );

  updateTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.updateTransaction),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(({ updatedTransactionFormData, id }) =>
        this.http
          .patch<void>(`${this.apiUrl}/transactions/edit`, {
            updatedTransaction: updatedTransactionFormData,
            id,
          })
          .pipe(
            map(() =>
              TransactionsActions.updateTransactionSuccess({
                updatedTransactionFormData,
                id,
              })
            ),
            tap(() =>
              this.store.dispatch(AppActions.setLoading({ loading: false }))
            ),
            tap(() => this.routerService.navigateBack()), // TODO: Navigating back still shows old data, but transactions list gets updated properly
            catchError((error) => {
              this.store.dispatch(AppActions.setLoading({ loading: false }));
              return EMPTY;
            })
          )
      )
    )
  );

  deleteTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TransactionsActions.deleteTransaction),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(({ transactionId }) =>
        this.http
          .delete<void>(`${this.apiUrl}/transactions/delete/${transactionId}`)
          .pipe(
            map(() =>
              TransactionsActions.deleteTransactionSuccess({ transactionId })
            ),
            tap(() =>
              this.store.dispatch(AppActions.setLoading({ loading: false }))
            ),
            tap(() => this.routerService.navigateToTransactions()),
            catchError((error) => {
              this.store.dispatch(AppActions.setLoading({ loading: false }));
              return EMPTY;
            })
          )
      )
    )
  );
}
