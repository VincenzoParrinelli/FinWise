import { ActionReducer } from '@ngrx/store';

import { Saving, SavingsState } from '../savings/savings.model';
import { createSavingTransactionSuccess } from '../transactions/transactions.actions';

export const updateSavingSavedAmountMetaReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action: any) => {
    if (action.type === createSavingTransactionSuccess.type) {
      const { savings } = state.savings as SavingsState;
      const { transaction } = action;

      if (!transaction || !transaction.savingId) return reducer(state, action);

      const updatedSavings = savings.map((saving: Saving) => {
        if (saving._id === transaction.savingId) {
          return {
            ...saving,
            savedAmount: saving.savedAmount + transaction.amount,
          };
        }

        return saving;
      });

      return {
        ...state,
        savings: { ...state.savings, savings: updatedSavings },
      };
    }

    return reducer(state, action);
  };
};
