import { createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';

export interface AppState {
  loading: boolean;
  error: string | null;
}

export const initialAppState: AppState = {
  loading: false,
  error: null,
};

export const appReducer = createReducer(
  initialAppState,
  on(AppActions.setLoading, (state, { loading }) => ({ ...state, loading }))
);
