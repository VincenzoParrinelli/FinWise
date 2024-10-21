import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { RouterService } from './router.service';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { appReducer } from './store/app/app.reducer';
import { userReducer } from './store/user/user.reducer';
import { transactionsReducer } from './store/transactions/transactions.reducer';

import { UserEffects } from './store/user/user.effects';
import { TransactionsEffects } from './store/transactions/transactions.effect';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    RouterService,
    provideStore({
      app: appReducer,
      user: userReducer,
      transactions: transactionsReducer,
    }),
    provideEffects([UserEffects, TransactionsEffects]),
  ],
};
