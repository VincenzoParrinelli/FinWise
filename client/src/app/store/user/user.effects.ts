import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { User } from './user.model';
import * as UserActions from './user.actions';
import * as AppActions from '../app/app.actions';

export class UserEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap(({ user }) =>
        this.http
          .post<User>('http://localhost:5000/api/users/create-user', user)
          .pipe(
            map((createdUser) => {
              AppActions.setLoading({ loading: false });
              return UserActions.createUserSuccess({ user: createdUser });
            }),
            catchError((error) =>
              of(UserActions.createUserFailure({ error: error.message }))
            )
          )
      )
    )
  );
}
