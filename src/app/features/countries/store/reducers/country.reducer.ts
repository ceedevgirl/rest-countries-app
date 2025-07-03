// src/app/features/countries/store/country.reducer.ts

import { createFeature, createReducer, on } from '@ngrx/store';
import { Country } from '../../../../core/models/country.interface'; 
import { CountryActions } from '../actions/country.actions';

export const countriesFeatureKey = 'countries';

export interface CountryState {
  countries: Country[];
  loading: boolean;
  error: unknown;
}

export const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(CountryActions.loadCountries, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CountryActions.loadCountriesSuccess, (state, { countries }) => ({
    ...state,
    countries,
    loading: false,
    error: null,
  })),

  on(CountryActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CountryActions.clearCountries, (state) => ({
    ...state,
    countries: [],
    loading: false,
    error: null,
  }))
);

export const countriesFeature = createFeature({
  name: countriesFeatureKey,
  reducer,
});
