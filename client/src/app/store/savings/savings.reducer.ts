import { createReducer, on } from '@ngrx/store';
import { SavingsState } from './savings.model';
import * as SavingsActions from './savings.actions';

import { removeDuplicatesAndSortByDate } from '../../utils/array-utils';

export const initialSavingsState: SavingsState = {
  totalDocuments: 0,
  savings: [],
};

export const savingsReducer = createReducer(
  initialSavingsState,
  on(SavingsActions.getSavingsSuccess, (state, { savingsWithTotals }) => ({
    ...state,
    totalDocuments: savingsWithTotals.totalDocuments,
    savings: removeDuplicatesAndSortByDate(
      state.savings,
      savingsWithTotals.savings
    ),
  })),
  on(SavingsActions.createSavingSuccess, (state, { saving }) => ({
    ...state,
    totalDocuments: state.totalDocuments + 1,

    savings: [...state.savings, saving].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
  })),
  on(
    SavingsActions.updateSavingSuccess,
    (state, { updatedSavingFormData, id }) => {
      const updatedSavings = state.savings.map((saving) => {
        if (saving._id !== id) return saving;

        return {
          ...saving,
          ...updatedSavingFormData,
          date: updatedSavingFormData.date
            ? new Date(updatedSavingFormData.date)
            : saving.date,
        };
      });

      return {
        ...state,
        savings: updatedSavings,
      };
    }
  ),
  on(SavingsActions.deleteSavingSuccess, (state, { savingId }) => ({
    ...state,
    totalDocuments: state.totalDocuments - 1,
    savings: state.savings.filter((saving) => saving._id !== savingId),
  }))
);
