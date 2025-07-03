import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ThemeActions = createActionGroup({
  source: 'Theme',
  events: {
    'Theme Themes': emptyProps(),
    'Theme Themes Success': props<{ data: unknown }>(),
    'Theme Themes Failure': props<{ error: unknown }>(),
  }
});
