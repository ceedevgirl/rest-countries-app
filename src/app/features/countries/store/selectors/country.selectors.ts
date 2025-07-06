import { countriesFeature } from '../reducers/country.reducer';
import { createSelector } from '@ngrx/store';

// Base selectors from createFeature
export const {
  selectCountriesState,
  selectLoading,
  selectError,
  selectSearchQuery,
  selectFilterRegion,
  selectCurrentPage, 
} = countriesFeature;

// Filtered list of countries for list page
export const selectFilteredCountries = createSelector(
  selectCountriesState,
  selectSearchQuery,
  selectFilterRegion,
  (state, query, region) => {
    let result = state.countries;

    if (query) {
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (region) {
      result = result.filter(
        (c) => c.region.toLowerCase() === region.toLowerCase()
      );
    }

    return result;
  }
);

// Single country for details page
export const selectSelectedCountry = createSelector(
  selectCountriesState,
  (state) => state.selectedCountry
);