import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map } from 'rxjs';
import { Country } from '../../../../core/models/country.interface';
import { CountryActions } from '../../store/actions/country.actions';

// selector imports 
import {
  selectFilteredCountries,
  selectLoading,
  selectSearchQuery,
  selectFilterRegion,
  selectCurrentPage, 
} from '../../store/selectors/country.selectors';

// all components and pipes used in your template
import { CountryCardComponent } from '../../components/country-card/country-card.component';
import { CountrySearchBarComponent } from '../../components/country-search-bar/country-search-bar.component';
import { RegionFilterComponent } from '../../components/region-filter/region-filter.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-country-list',
  standalone: true,
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
  imports: [
    AsyncPipe,
    CountryCardComponent,
    CountrySearchBarComponent,
    RegionFilterComponent,
    PaginationComponent,
  ],
})
export class CountryListComponent implements OnInit {
  // Observables for state
  loading$: Observable<boolean>;
  searchQuery$: Observable<string>;
  filterRegion$: Observable<string>;
  filteredCountries$: Observable<Country[]>;

  // properties and observables for pagination
  itemsPerPage = 12; 
  currentPage$: Observable<number>;
  paginatedCountries$: Observable<Country[]>;
 totalCountries$: Observable<number>;

  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  constructor(private store: Store) {
    // Select state from the store
    this.loading$ = this.store.select(selectLoading);
    this.searchQuery$ = this.store.select(selectSearchQuery);
    this.filterRegion$ = this.store.select(selectFilterRegion);
    this.filteredCountries$ = this.store.select(selectFilteredCountries);
    this.currentPage$ = this.store.select(selectCurrentPage);

     this.totalCountries$ = this.filteredCountries$.pipe(
      map((countries) => countries.length)
    );

    // the observable for the paginated data slice
    this.paginatedCountries$ = combineLatest([
      this.filteredCountries$,
      this.currentPage$,
    ]).pipe(
      map(([countries, currentPage]) => {
        const startIndex = (currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return countries.slice(startIndex, endIndex);
      })
    );
  }

  ngOnInit(): void {
    this.store.dispatch(CountryActions.loadCountries());
  }

  // Reset to page 1 when filters change to avoid being on an empty page
  onSearchChange(query: string): void {
    this.store.dispatch(CountryActions.setCurrentPage({ page: 1 }));
    this.store.dispatch(CountryActions.setSearchQuery({ query }));
  }

  onRegionChange(region: string): void {
    this.store.dispatch(CountryActions.setCurrentPage({ page: 1 }));
    this.store.dispatch(CountryActions.setFilterRegion({ region }));
  }

  // method to handle page changes from the pagination component
  onPageChange(page: number): void {
    this.store.dispatch(CountryActions.setCurrentPage({ page }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}