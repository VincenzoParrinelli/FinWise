import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SavingsState } from './savings.model';

export const selectSavingsState =
  createFeatureSelector<SavingsState>('savings');

export const selectSavings = createSelector(
  selectSavingsState,
  (state: SavingsState) => state.savings
);

export const selectSavingsTotalDocuments = createSelector(
  selectSavingsState,
  (state: SavingsState) => state.totalDocuments
);
