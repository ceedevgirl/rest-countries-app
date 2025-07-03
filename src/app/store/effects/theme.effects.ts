import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { ThemeActions } from '../actions/theme.actions';


@Injectable()
export class ThemeEffects {

  themeThemes$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ThemeActions.themeThemes),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => ThemeActions.themeThemesSuccess({ data })),
          catchError(error => of(ThemeActions.themeThemesFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
