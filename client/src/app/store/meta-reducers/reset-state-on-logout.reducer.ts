import { ActionReducer } from '@ngrx/store';

import { initialAppState } from '../app/app.reducer';
import { initialUserState } from '../user/user.reducer';
import { initialTransactionsState } from '../transactions/transactions.reducer';
import { initialSavingsState } from '../savings/savings.reducer';

import { resetAllAppSlices } from '../app/app.actions';
import { logoutUserSuccess } from '../user/user.actions';

const initialState = {
  app: initialAppState,
  user: initialUserState,
  transactions: initialTransactionsState,
  savings: initialSavingsState,
};

export const resetStateOnLogoutMetaReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    if (
      action.type === resetAllAppSlices.type ||
      action.type === logoutUserSuccess.type
    ) {
      localStorage.removeItem('appState');

      return { ...initialState };
    }

    return reducer(state, action);
  };
};
