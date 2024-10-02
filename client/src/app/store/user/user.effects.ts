import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

import { User } from './user.model';
import { Store } from '@ngrx/store';
import * as UserActions from './user.actions';
import * as AppActions from '../app/app.actions';

import { environment } from '../../../environments/environment.development';

export class UserEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);
  private store = inject(Store);
  private apiUrl = environment.apiUrl;

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(({ user }) =>
        this.http.post<User>(`${this.apiUrl}/users/create-user`, user).pipe(
          map((createdUser) => {
            this.store.dispatch(AppActions.setLoading({ loading: false }));
            return UserActions.createUserSuccess({ user: createdUser });
          }),
          catchError((error) => {
            this.store.dispatch(AppActions.setLoading({ loading: false }));
            return of();
            // of(AppActions.setError({ error: error.message }));
          })
        )
      )
    )
  );
}
