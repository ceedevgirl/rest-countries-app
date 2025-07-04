import { createFeature, createReducer, on } from '@ngrx/store';
import { CountryActions } from '../actions/country.actions';
import { Country } from '../../../../core/models/country.interface';

export interface CountryState {
  countries: Country[];
  loading: boolean;
  error: unknown;
  searchQuery: string;
  filterRegion: string;
  selectedCountry: Country | null;
}

export const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
  searchQuery: '',
  filterRegion: '',
  selectedCountry: null,
};

const countryReducer = createReducer(
  initialState,

  // Load all countries
  on(CountryActions.loadCountries, (state) => ({ ...state, loading: true })),
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

  // Detail page support
  on(CountryActions.loadCountryByCode, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CountryActions.loadCountryByCodeSuccess, (state, { country }) => ({
    ...state,
    selectedCountry: country,
    loading: false,
    error: null,
  })),

  // Clear and UI actions
  on(CountryActions.clearCountries, (state) => ({
    ...state,
    countries: [],
    loading: false,
    error: null,
  })),
  on(CountryActions.setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query,
  })),
  on(CountryActions.setFilterRegion, (state, { region }) => ({
    ...state,
    filterRegion: region,
  }))
);

//  Moved below reducer declaration
export const countriesFeature = createFeature({
  name: 'countries',
  reducer: countryReducer,
});
