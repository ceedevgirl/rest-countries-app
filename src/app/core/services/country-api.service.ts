// src/app/core/services/country-api.service.ts

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../models/country.interface'; 
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://restcountries.com/v3.1';

  /**
   * Get all countries
   */
  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/all`).pipe(
      catchError((error) => {
        console.error('Failed to fetch all countries', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get a country by its code (e.g., 'GHA')
   */
  getCountryByCode(code: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/alpha/${code}`).pipe(
      catchError((error) => {
        console.error(`Failed to fetch country by code: ${code}`, error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get multiple countries by codes (e.g., ['GHA', 'NGA', 'KEN'])
   */
  getCountriesByCodes(codes: string[]): Observable<Country[]> {
    const codesParam = codes.join(',');
    return this.http.get<Country[]>(`${this.baseUrl}/alpha?codes=${codesParam}`).pipe(
      catchError((error) => {
        console.error('Failed to fetch multiple countries', error);
        return throwError(() => error);
      })
    );
  }
}
