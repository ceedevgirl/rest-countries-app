import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { CountryActions } from '../actions/country.actions';


@Injectable()
export class CountryEffects {

  countryCountrys$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CountryActions.countryCountrys),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => CountryActions.countryCountrysSuccess({ data })),
          catchError(error => of(CountryActions.countryCountrysFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
