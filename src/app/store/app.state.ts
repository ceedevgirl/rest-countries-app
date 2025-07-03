import { Country } from "../core/models/country.interface"; 

export interface CountryState {
  countries: Country[];
  selectedCountry: Country | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filterRegion: string;
}

export const initialCountryState: CountryState = {
  countries: [],
  selectedCountry: null,
  loading: false,
  error: null,
  searchQuery: '',
  filterRegion: ''
};