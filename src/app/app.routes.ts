// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { CountryListComponent } from './features/countries/pages/country-list/country-list.component';

export const routes: Routes = [
  {
    path: '',
    component: CountryListComponent,
    pathMatch: 'full',
  },
  {
    path: 'countries/:code',
    loadComponent: () =>
      import('./features/countries/pages/country-details/country-details.component').then(
        m => m.CountryDetailsComponent
      ),
  },
  {
    path: '**',
    redirectTo: '', // fallback to home
  },
];
