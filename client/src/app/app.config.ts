import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

import { routes } from './app.routes';
import { RouterService } from './services/router.service';

import { AuthInterceptor } from './auth.interceptor';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { appReducer } from './store/app/app.reducer';
import { userReducer } from './store/user/user.reducer';
import { transactionsReducer } from './store/transactions/transactions.reducer';
import { savingsReducer } from './store/savings/savings.reducer';

import { metaReducers } from './store/meta-reducers/entry';

import { UserEffects } from './store/user/user.effects';
import { TransactionsEffects } from './store/transactions/transactions.effects';
import { SavingsEffects } from './store/savings/saving.effects';

const loadInitialState = () => {
  const savedState = localStorage.getItem('appState');

  return savedState ? JSON.parse(savedState) : undefined;
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    RouterService,
    provideCharts(withDefaultRegisterables()),
    provideStore(
      {
        app: appReducer,
        user: userReducer,
        transactions: transactionsReducer,
        savings: savingsReducer,
      },
      { metaReducers, initialState: loadInitialState() }
    ),
    provideEffects([UserEffects, TransactionsEffects, SavingsEffects]),
  ],
};
