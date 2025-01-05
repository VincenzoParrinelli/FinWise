import { inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { Store } from '@ngrx/store';
import { Saving, SavingsState } from './savings.model';
import * as AppActions from '../app/app.actions';
import * as SavingsActions from './savings.actions';
import * as UserActions from '../user/user.actions';

import { environment } from '../../../environments/environment.development';
import { catchError, EMPTY, map, mergeMap, of, tap } from 'rxjs';

import { RouterService } from '../../services/router.service';

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
            return EMPTY;
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
              return EMPTY;
            })
          );
      })
    )
  );

  getRandomSaving$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SavingsActions.getRandomSaving),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(() =>
        this.http.get<Saving>(`${this.apiUrl}/savings/random`).pipe(
          map((randomSaving) =>
            SavingsActions.getRandomSavingSuccess({ randomSaving })
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
              return EMPTY;
            })
          )
      )
    )
  );

  updateSaving$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SavingsActions.updateSaving),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(({ updatedSavingFormData, id }) =>
        this.http
          .patch<void>(`${this.apiUrl}/savings/edit`, {
            updatedSaving: updatedSavingFormData,
            id,
          })
          .pipe(
            map(() =>
              SavingsActions.updateSavingSuccess({
                updatedSavingFormData,
                id,
              })
            ),
            tap(() =>
              this.store.dispatch(AppActions.setLoading({ loading: false }))
            ),
            tap(() => this.routerService.navigateBack()),
            catchError((error) => {
              this.store.dispatch(AppActions.setLoading({ loading: false }));
              return EMPTY;
            })
          )
      )
    )
  );

  deleteSaving$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SavingsActions.deleteSaving),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(({ savingId }) =>
        this.http
          .delete<void>(`${this.apiUrl}/savings/delete/${savingId}`)
          .pipe(
            map(() => SavingsActions.deleteSavingSuccess({ savingId })),
            tap(() =>
              this.store.dispatch(AppActions.setLoading({ loading: false }))
            ),
            tap(() => this.routerService.navigateToSavings()),
            catchError((error) => {
              this.store.dispatch(AppActions.setLoading({ loading: false }));
              return EMPTY;
            })
          )
      )
    )
  );
}
