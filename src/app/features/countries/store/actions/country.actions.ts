// src/app/features/countries/store/country.actions.ts

import { createAction, props } from '@ngrx/store';
import { Country } from '../../../../core/models/country.interface'; 

const loadCountries = createAction('[Country] Load Countries');

const loadCountriesSuccess = createAction(
  '[Country] Load Countries Success',
  props<{ countries: Country[] }>()
);

const loadCountriesFailure = createAction(
  '[Country] Load Countries Failure',
  props<{ error: unknown }>()
);

const clearCountries = createAction('[Country] Clear Countries');

// 👇 Group and export all actions under CountryActions namespace
export const CountryActions = {
  loadCountries,
  loadCountriesSuccess,
  loadCountriesFailure,
  clearCountries,
};
