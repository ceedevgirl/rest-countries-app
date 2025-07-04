// country.reducer.ts
import { createFeature, createReducer, on } from '@ngrx/store';
import { CountryActions } from '../actions/country.actions';
import { Country } from '../../../../core/models/country.interface';

export interface CountryState {
  countries: Country[];
  loading: boolean;
  error: unknown;
  searchQuery: string;
  filterRegion: string;
}

export const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
  searchQuery: '',
  filterRegion: '',
};

const countryReducer = createReducer(
  initialState,
  on(CountryActions.loadCountries, (state) => ({
    ...state,
    loading: true,
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
  })),

  //search query in state
  on(CountryActions.setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query,
  })),

  // filter region in state
  on(CountryActions.setFilterRegion, (state, { region }) => ({
    ...state,
    filterRegion: region,
  }))
);

export const countriesFeature = createFeature({
  name: 'countries',
  reducer: countryReducer,
});
