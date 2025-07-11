// src/app/features/countries/store/country.actions.ts

import { createAction, props } from '@ngrx/store';
import { Country } from '../../../../core/models/country.interface';

// API Actions
const loadCountries = createAction('[Country] Load Countries');

const loadCountriesSuccess = createAction(
  '[Country] Load Countries Success',
  props<{ countries: Country[] }>()
);

const loadCountriesFailure = createAction(
  '[Country] Load Countries Failure',
  props<{ error: unknown }>()
);

// Single country detail action
const loadCountryByCode = createAction(
  '[Country] Load Country By Code',
  props<{ code: string }>()
);

const loadCountryByCodeSuccess = createAction(
  '[Country] Load Country By Code Success',
  props<{ country: Country }>()
);

// Clear countries from state
const clearCountries = createAction('[Country] Clear Countries');

// UI State Actions
const setSearchQuery = createAction(
  '[Country] Set Search Query',
  props<{ query: string }>()
);

const setFilterRegion = createAction(
  '[Country] Set Filter Region',
  props<{ region: string }>()
);

const setCurrentPage = createAction(
  '[Country] Set Current Page',
  props<{ page: number }>()
);

// Export grouped for reducer/effects use
export const CountryActions = {
  loadCountries,
  loadCountriesSuccess,
  loadCountriesFailure,
  clearCountries,
  setSearchQuery,
  setFilterRegion,
  loadCountryByCode,
  loadCountryByCodeSuccess,
  setCurrentPage,
};
