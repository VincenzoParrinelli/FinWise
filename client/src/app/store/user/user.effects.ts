import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, of, tap } from 'rxjs';
import { RouterService } from '../../services/router.service';

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
        this.http.post<User>(`${this.apiUrl}/users/create-user`, user).pipe(
          map((createdUser) => {
            return UserActions.createUserSuccess({ user: createdUser });
          }),
          tap(() =>
            this.store.dispatch(AppActions.setLoading({ loading: false }))
          ),
          tap(() => this.routerService.navigateToHome()),
          catchError((error) => {
            this.store.dispatch(AppActions.setLoading({ loading: false }));
            return EMPTY;
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
          .post<User>(`${this.apiUrl}/users/login`, { email, password })
          .pipe(
            map((loggedInUserData) =>
              UserActions.loginUserSuccess({ user: loggedInUserData })
            ),
            tap(() => this.routerService.navigateToHome()),
            catchError((error) => {
              this.store.dispatch(AppActions.setLoading({ loading: false }));
              return EMPTY;
            })
          )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(({ updatedUserFormData }) =>
        this.http
          .patch<void>(`${this.apiUrl}/users/update`, updatedUserFormData)
          .pipe(
            map(() => UserActions.updateUserSuccess({ updatedUserFormData })),
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

  updateUserPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUserPassword),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(({ currPassword, newPassword }) =>
        this.http
          .patch(`${this.apiUrl}/users/settings/edit/password`, {
            currPassword,
            newPassword,
          })
          .pipe(
            map(() => UserActions.updateUserPasswordSuccess()),
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

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.logoutUser),
      tap(() => this.store.dispatch(AppActions.setLoading({ loading: true }))),
      mergeMap(() =>
        this.http.delete<void>(`${this.apiUrl}/users/logout`).pipe(
          map(() => UserActions.logoutUserSuccess()),
          tap(() =>
            this.store.dispatch(AppActions.setLoading({ loading: false }))
          ),
          tap(() => this.routerService.navigateToLogin()),
          catchError((error) => {
            this.store.dispatch(AppActions.setLoading({ loading: false }));
            return EMPTY;
          })
        )
      )
    )
  );
}
