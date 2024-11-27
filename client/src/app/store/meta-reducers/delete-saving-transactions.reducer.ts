import { ActionReducer } from '@ngrx/store';

import { deleteSavingSuccess } from '../savings/savings.actions';
import { Saving } from '../savings/savings.model';

export const deleteSavingTransactionsMetaReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action: any) => {
    if (action.type === deleteSavingSuccess.type) {
      const { savingId } = action;

      const newState = {
        ...state,
        transactions: {
          ...state.transactions,
          savingsTransactions: state.transactions.savingsTransactions.filter(
            (saving: Saving) => saving._id !== savingId
          ),
        },
      };

      return reducer(newState, action);
    }

    return reducer(state, action);
  };
};
