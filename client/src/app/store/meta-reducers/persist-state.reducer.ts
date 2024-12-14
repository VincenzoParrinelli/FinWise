import { ActionReducer } from '@ngrx/store';

export const persistStateMetaReducer = (
  reducer: ActionReducer<any>
): ActionReducer<any> => {
  return (state, action) => {
    localStorage.setItem('appState', JSON.stringify(reducer(state, action)));

    return reducer(state, action);
  };
};
