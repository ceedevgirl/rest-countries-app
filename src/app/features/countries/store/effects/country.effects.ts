// src/app/features/countries/store/effects/country.effects.ts

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CountryActions } from '../actions/country.actions';
import { CountryApiService } from '../../../../core/services/country-api.service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class CountryEffects {
  private actions$ = inject(Actions);
  private api = inject(CountryApiService);

  // Load all countries
  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      tap(() => console.log('[Effect] loadCountries action received')),
      mergeMap(() =>
        this.api.getAllCountries().pipe(
          tap((countries) => console.log('[Effect] Fetched', countries.length, 'countries')),
          map((countries) => CountryActions.loadCountriesSuccess({ countries })),
          catchError((error) => {
            console.error('[Effect] loadCountriesFailure:', error);
            return of(CountryActions.loadCountriesFailure({ error }));
          })
        )
      )
    )
  );

  // Load single country by code
  loadCountryByCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountryByCode),
      tap(({ code }) => console.log('[Effect] loadCountryByCode action received:', code)),
      mergeMap(({ code }) =>
        this.api.getCountryByCode(code).pipe(
          map((countryArray) => {
            const country = countryArray[0]; // API returns an array
            console.log('[Effect] Country loaded:', country?.name?.common);
            return CountryActions.loadCountryByCodeSuccess({ country });
          }),
          catchError((error) => {
            console.error('[Effect] loadCountryByCode failed:', error);
            return of(CountryActions.loadCountriesFailure({ error }));
          })
        )
      )
    )
  );
}
