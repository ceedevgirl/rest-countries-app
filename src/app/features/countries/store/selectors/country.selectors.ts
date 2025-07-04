import { countriesFeature } from '../reducers/country.reducer';
import { createSelector } from '@ngrx/store';
import { Country } from '../../../../core/models/country.interface';

// Access state using correct selectors from `createFeature`
export const {
  selectCountriesState,
  selectLoading,
  selectError,
  selectSearchQuery,
  selectFilterRegion,
} = countriesFeature;

// Derived Selector: Filtered Countries
export const selectFilteredCountries = createSelector(
  countriesFeature.selectCountriesState,
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
      result = result.filter((c) => c.region.toLowerCase() === region.toLowerCase());
    }

    return result;
  }
);
