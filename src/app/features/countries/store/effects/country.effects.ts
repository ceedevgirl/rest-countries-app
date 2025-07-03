// src/app/features/countries/store/country.effects.ts

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CountryActions } from '../actions/country.actions'; 
import { CountryApiService } from '../../../../core/services/country-api.service';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class CountryEffects {
  private actions$ = inject(Actions);
  private countryApi = inject(CountryApiService);

  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CountryActions.loadCountries),
      mergeMap(() =>
        this.countryApi.getAllCountries().pipe(
          map((countries) =>
            CountryActions.loadCountriesSuccess({ countries })
          ),
          catchError((error) =>
            of(CountryActions.loadCountriesFailure({ error }))
          )
        )
      )
    )
  );
}
