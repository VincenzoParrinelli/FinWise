import { ActionReducer } from '@ngrx/store';

import { createSavingTransactionSuccess } from '../transactions/transactions.actions';
import { Saving, SavingsState } from '../savings/savings.model';
import { Transaction } from '../transactions/transactions.model';

export const updateSavingSavedAmountMetaReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action: any) => {
    if (action.type === createSavingTransactionSuccess.type) {
      const { savings } = state.savings as SavingsState;
      const { transaction }: { transaction: Transaction } = action;

      const updatedSavings = savings.map((saving: Saving) => {
        if (saving._id === transaction.savingId) {
          return {
            ...saving,
            savedAmount: saving.savedAmount + transaction.amount,
          };
        }

        return saving;
      });

      const newState = {
        ...state,
        savings: { ...state.savings, savings: updatedSavings },
      };

      return reducer(newState, action);
    }

    return reducer(state, action);
  };
};
