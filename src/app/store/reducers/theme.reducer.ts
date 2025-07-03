import { createFeature, createReducer, on } from '@ngrx/store';
import { ThemeActions } from '../actions/theme.actions';

export const themeFeatureKey = 'theme';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(ThemeActions.themeThemes, state => state),
  on(ThemeActions.themeThemesSuccess, (state, action) => state),
  on(ThemeActions.themeThemesFailure, (state, action) => state),
);

export const themeFeature = createFeature({
  name: themeFeatureKey,
  reducer,
});

