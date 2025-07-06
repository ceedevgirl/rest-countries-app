import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Country } from '../../../../core/models/country.interface';
import { CommonModule, AsyncPipe, DecimalPipe } from '@angular/common';
import { Observable, switchMap, of } from 'rxjs';
import { CountryActions } from '../../store/actions/country.actions';
import { selectSelectedCountry, selectLoading} from '../../store/selectors/country.selectors';
import { CountryApiService } from '../../../../core/services/country-api.service';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, DecimalPipe],
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  country$!: Observable<Country | null>;
  borderCountries$!: Observable<Country[]>;
  loading$!: Observable<boolean>;

  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private api = inject(CountryApiService);

  ngOnInit(): void {
    // Trigger effect when `:code` changes (even on same route)
    this.route.paramMap.subscribe(params => {
      const code = params.get('code');
      if (code) {
        this.store.dispatch(CountryActions.loadCountryByCode({ code }));
      }
    });

    // Select current country from store
    this.country$ = this.store.select(selectSelectedCountry);
     this.loading$ = this.store.select(selectLoading); 

    // Dynamically fetch border country names
    this.borderCountries$ = this.country$.pipe(
      switchMap((country) =>
        country?.borders?.length
          ? this.api.getCountriesByCodes(country.borders)
          : of([])
      )
    );
  }

  getNativeName(country: Country): string {
    const native = country.name.nativeName;
    if (!native) return 'N/A';
    const firstKey = Object.keys(native)[0];
    return native[firstKey]?.common ?? 'N/A';
  }

  getCurrencies(country: Country): string {
    return country.currencies
      ? Object.values(country.currencies).map((c) => c.name).join(', ')
      : 'N/A';
  }

  getLanguages(country: Country): string {
    return country.languages
      ? Object.values(country.languages).join(', ')
      : 'N/A';
  }
}
