import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { routes } from './app.routes';
import { RouterService } from './router.service';

import { AuthInterceptor } from './auth.interceptor';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { appReducer } from './store/app/app.reducer';
import { userReducer } from './store/user/user.reducer';
import { transactionsReducer } from './store/transactions/transactions.reducer';
import { metaReducers } from './store/resetStateOnLogoutMetaReducer';

import { UserEffects } from './store/user/user.effects';
import { TransactionsEffects } from './store/transactions/transactions.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    RouterService,
    provideStore(
      {
        app: appReducer,
        user: userReducer,
        transactions: transactionsReducer,
      },
      { metaReducers }
    ),
    provideEffects([UserEffects, TransactionsEffects]),
  ],
};
