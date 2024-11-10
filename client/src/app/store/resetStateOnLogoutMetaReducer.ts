import { ActionReducer, MetaReducer } from '@ngrx/store';

import { initialAppState } from './app/app.reducer';
import { initialUserState } from './user/user.reducer';
import { initialTransactionsState } from './transactions/transactions.reducer';

import { resetAllAppSlices } from './app/app.actions';
import { logoutUserSuccess } from './user/user.actions';

const initialState = {
  app: initialAppState,
  user: initialUserState,
  transactions: initialTransactionsState,
};

export const resetStateOnLogoutMetaReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    if (
      action.type === resetAllAppSlices.type ||
      action.type === logoutUserSuccess.type
    ) {
      return { ...initialState };
    }
    return reducer(state, action);
  };
};

export const metaReducers: MetaReducer<any>[] = [resetStateOnLogoutMetaReducer];
