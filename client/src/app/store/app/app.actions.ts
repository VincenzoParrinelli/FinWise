import { createAction, props } from '@ngrx/store';

export const setLoading = createAction(
  '[App] Set Loading',
  props<{ loading: boolean }>()
);

export const resetAllAppSlices = createAction('[App] Reset All App Slices');
