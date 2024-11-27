import { MetaReducer } from '@ngrx/store';
import { resetStateOnLogoutMetaReducer } from './reset-state-on-logout.reducer';
import { updateSavingSavedAmountMetaReducer } from './update-saving-saved-amount.reducer';
import { deleteSavingTransactionsMetaReducer } from './delete-saving-transactions.reducer';

export const metaReducers: MetaReducer<any>[] = [
  resetStateOnLogoutMetaReducer,
  updateSavingSavedAmountMetaReducer,
  deleteSavingTransactionsMetaReducer,
];
