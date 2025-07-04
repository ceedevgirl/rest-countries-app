import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Country } from '../../../../core/models/country.interface';
import { CommonModule, AsyncPipe, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { CountryActions } from '../../store/actions/country.actions';
import {
  selectLoading,
  selectSelectedCountry
} from '../../store/selectors/country.selectors';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, AsyncPipe, DecimalPipe],
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {
  country$!: Observable<Country | null>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const code = this.route.snapshot.paramMap.get('code');
    if (code) {
      this.store.dispatch(CountryActions.loadCountryByCode({ code }));
    }
    this.country$ = this.store.select(selectSelectedCountry);
  }

  getNativeName(country: Country): string {
    const native = country.name.nativeName;
    if (!native) return 'N/A';
    const firstKey = Object.keys(native)[0];
    return native[firstKey]?.common ?? 'N/A';
  }

  getCurrencies(country: Country): string {
    return country.currencies
      ? Object.values(country.currencies).map(c => c.name).join(', ')
      : 'N/A';
  }

  getLanguages(country: Country): string {
    return country.languages
      ? Object.values(country.languages).join(', ')
      : 'N/A';
  }
}
