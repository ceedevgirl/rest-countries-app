// src/app/features/countries/pages/country-list/country-list.component.ts

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Country } from '../../../../core/models/country.interface';
import { CountryActions } from '../../store/actions/country.actions';
import {
  selectFilteredCountries,
  selectLoading,
  selectSearchQuery,
  selectFilterRegion
} from '../../store/selectors/country.selectors';

// all components and pipes used in your template
import { CountryCardComponent } from '../../components/country-card/country-card.component';
import { CountrySearchBarComponent } from '../../components/country-search-bar/country-search-bar.component';
import { RegionFilterComponent } from '../../components/region-filter/region-filter.component';

import { AsyncPipe } from '@angular/common'; // required for | async and | json

@Component({
  selector: 'app-country-list',
  standalone: true,
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  imports: [
    AsyncPipe, 
    CountryCardComponent,
    CountrySearchBarComponent,
    RegionFilterComponent
  ],
})
export class CountryListComponent implements OnInit {
  filteredCountries$: Observable<Country[]>;
  loading$: Observable<boolean>;
  searchQuery$: Observable<string>;
  filterRegion$: Observable<string>;

  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  constructor(private store: Store) {
    this.filteredCountries$ = this.store.select(selectFilteredCountries);
    this.loading$ = this.store.select(selectLoading);
    this.searchQuery$ = this.store.select(selectSearchQuery);
    this.filterRegion$ = this.store.select(selectFilterRegion);
  }

  ngOnInit(): void {
    this.store.dispatch(CountryActions.loadCountries());

    // Debug
    this.filteredCountries$.subscribe((countries) =>
      console.log('[Component] filteredCountries:', countries)
    );
  }

  onSearchChange(query: string): void {
    this.store.dispatch(CountryActions.setSearchQuery({ query }));
  }

  onRegionChange(region: string): void {
    this.store.dispatch(CountryActions.setFilterRegion({ region }));
  }
}
