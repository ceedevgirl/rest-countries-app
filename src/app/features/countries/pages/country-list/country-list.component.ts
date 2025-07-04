import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
// import { If, For } from '@angular/core';

import { Country } from '../../../../core/models/country.interface';
import { CountryActions } from '../../store/actions/country.actions';
import {
  selectFilteredCountries,
  selectLoading as selectCountryLoading,
  selectSearchQuery,
  selectFilterRegion,
} from '../../store/selectors/country.selectors';

import { CountryCardComponent } from '../../components/country-card/country-card.component'; 
import { CountrySearchBarComponent } from '../../components/country-search-bar/country-search-bar.component';
import { RegionFilterComponent } from '../../components/region-filter/region-filter.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [
    AsyncPipe,
    CountryCardComponent,
    CountrySearchBarComponent,
    RegionFilterComponent
  ],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  filteredCountries$: Observable<Country[]>;
  loading$: Observable<boolean>;
  searchQuery$: Observable<string>;
  filterRegion$: Observable<string>;

  private searchSubject = new Subject<string>();
  regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  constructor(private store: Store) {
    this.filteredCountries$ = this.store.select(selectFilteredCountries);
    this.loading$ = this.store.select(selectCountryLoading);
    this.searchQuery$ = this.store.select(selectSearchQuery);
    this.filterRegion$ = this.store.select(selectFilterRegion);
  }

  ngOnInit(): void {
    this.store.dispatch(CountryActions.loadCountries());

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((query) => {
      this.store.dispatch(CountryActions.setSearchQuery({ query }));
    });
  }

  onSearchChange(query: string): void {
    this.searchSubject.next(query);
  }

  onRegionChange(region: string): void {
    this.store.dispatch(CountryActions.setFilterRegion({ region }));
  }
}
