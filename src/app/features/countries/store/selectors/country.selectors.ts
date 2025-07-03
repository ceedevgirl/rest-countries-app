// src/app/features/countries/store/country.selectors.ts

import { createSelector } from '@ngrx/store';
import { countriesFeature } from '../reducers/country.reducer';

export const selectCountries = createSelector(
  countriesFeature.selectCountriesState,
  (state) => state.countries
);

export const selectLoading = createSelector(
  countriesFeature.selectCountriesState,
  (state) => state.loading
);

export const selectError = createSelector(
  countriesFeature.selectCountriesState,
  (state) => state.error
);

