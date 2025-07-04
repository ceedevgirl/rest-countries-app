import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { countriesFeature } from './features/countries/store/reducers/country.reducer'; 
import { CountryEffects } from './features/countries/store/effects/country.effects';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; 
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),  provideHttpClient(), provideRouter(routes), provideStore({
      [countriesFeature.name]: countriesFeature.reducer,
    }), provideEffects([CountryEffects]), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
