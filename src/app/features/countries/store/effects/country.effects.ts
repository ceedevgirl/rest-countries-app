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
}
