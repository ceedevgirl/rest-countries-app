import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Country } from '../models/country.model';

export const CountryActions = createActionGroup({
  source: 'Country/API',
  events: {
    'Load Countrys': props<{ countrys: Country[] }>(),
    'Add Country': props<{ country: Country }>(),
    'Upsert Country': props<{ country: Country }>(),
    'Add Countrys': props<{ countrys: Country[] }>(),
    'Upsert Countrys': props<{ countrys: Country[] }>(),
    'Update Country': props<{ country: Update<Country> }>(),
    'Update Countrys': props<{ countrys: Update<Country>[] }>(),
    'Delete Country': props<{ id: string }>(),
    'Delete Countrys': props<{ ids: string[] }>(),
    'Clear Countrys': emptyProps(),
  }
});
