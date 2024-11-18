import { inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import { Saving, SavingsState } from './savings.model';
import * as AppActions from '../app/app.actions';
import * as SavingsActions from './savings.actions';
import * as UserActions from '../user/user.actions';

import { environment } from '../../../environments/environment.development';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { RouterService } from '../../router.service';

export class SavingsEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private routerService = inject(RouterService);

  getSavingsOnLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUserSuccess),
      mergeMap(() =>
        this.http.get<SavingsState>(`${this.apiUrl}/savings`).pipe(
          map((savingsWithTotals) =>
            SavingsActions.getSavingsSuccess({
              savingsWithTotals,
            })
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

  getPaginatedSavings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SavingsActions.getSavings),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(({ page, pageSize }) => {
        const params = new HttpParams()
          .set('page', page)
          .set('pageSize', pageSize);

        return this.http
          .get<SavingsState>(`${this.apiUrl}/savings`, {
            params,
          })
          .pipe(
            map((savingsWithTotals) =>
              SavingsActions.getSavingsSuccess({
                savingsWithTotals,
              })
            ),
            tap(() =>
              this.store.dispatch(AppActions.setLoading({ loading: false }))
            ),
            catchError((error) => {
              this.store.dispatch(AppActions.setLoading({ loading: false }));
              return of();
            })
          );
      })
    )
  );

  createSaving$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SavingsActions.createSaving),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(({ saving }) =>
        this.http
          .post<Saving>(`${this.apiUrl}/savings/create`, {
            ...saving,
          })
          .pipe(
            map((createdSaving) =>
              SavingsActions.createSavingSuccess({
                saving: createdSaving,
              })
            ),
            tap(() =>
              this.store.dispatch(AppActions.setLoading({ loading: false }))
            ),
            tap(() => this.routerService.navigateToSavings()),
            catchError((error) => {
              this.store.dispatch(AppActions.setLoading({ loading: false }));
              return of();
            })
          )
      )
    )
  );
}
