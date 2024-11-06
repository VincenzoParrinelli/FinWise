import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { catchError, Observable, throwError } from 'rxjs';
import * as UserActions from './store/user/user.actions';
import { UserState } from './store/user/user.model';

export class AuthInterceptor implements HttpInterceptor {
  private store = inject(Store<UserState>);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({ withCredentials: true });

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.store.dispatch(UserActions.logoutUser());
        }

        return throwError(() => err);
      })
    );
  }
}
