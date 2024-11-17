import { createReducer, on } from '@ngrx/store';
import { SavingsState } from './savings.model';
import * as SavingsActions from './savings.actions';

export const initialSavingsState: SavingsState = {
  savings: [],
  totalDocuments: 0,
};

export const savingsReducer = createReducer(
  initialSavingsState,
  on(SavingsActions.createSavingSuccess, (state, { saving }) => ({
    ...state,
    totalDocuments: state.totalDocuments + 1,

    savings: [...state.savings, saving].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
  }))
);
