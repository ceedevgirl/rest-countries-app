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
  path: 'details/:code', // ✅ correct spelling
  loadComponent: () =>
    import('./features/countries/pages/country-detail/country-detail.component').then(
      m => m.CountryDetailComponent
    ),
},
  {
    path: '**',
    redirectTo: '', // fallback to home
  },
];
