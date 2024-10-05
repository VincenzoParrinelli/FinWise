import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { RouterService } from '../../router.service';

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
  private routerService = inject(RouterService);

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(({ user }) =>
        this.http
          .post<User>(`${this.apiUrl}/users/create-user`, user, {
            withCredentials: true,
          })
          .pipe(
            map((createdUser) => {
              return UserActions.createUserSuccess({ user: createdUser });
            }),
            tap(() =>
              this.store.dispatch(AppActions.setLoading({ loading: false }))
            ),
            tap(() => this.routerService.navigateToHome()),
            catchError((error) => {
              this.store.dispatch(AppActions.setLoading({ loading: false }));
              return of();
              // of(AppActions.setError({ error: error.message }));
            })
          )
      )
    )
  );

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loginUser),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(({ email, password }) =>
        this.http
          .post<User>(
            `${this.apiUrl}/users/login`,
            { email, password },
            { withCredentials: true }
          )
          .pipe(
            map((loggedInUserData) =>
              UserActions.loginUserSuccess({ user: loggedInUserData })
            ),
            tap(() =>
              this.store.dispatch(AppActions.setLoading({ loading: false }))
            ),
            tap(() => this.routerService.navigateToHome()),
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
