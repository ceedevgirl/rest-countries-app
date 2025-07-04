// src/app/core/services/country-api.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Country } from '../models/country.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://restcountries.com/v3.1';

  /**
   * Fetch all countries with selected fields
   */
  getAllCountries(): Observable<Country[]> {
    const url = `${this.baseUrl}/all?fields=name,population,region,capital,flags,cca3`;
    console.log('[Service] Fetching from:', url);
    return this.http.get<Country[]>(url).pipe(
      tap((data) => console.log('[Service] Received:', data.length, 'countries')),
      catchError((error) => {
        console.error('[Service] Failed to fetch all countries:', error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Fetch one country by its 3‑letter code (e.g., GHA)
   */
  getCountryByCode(code: string): Observable<Country[]> {
    const url = `${this.baseUrl}/alpha/${code}`;
    console.log('[Service] Fetching country by code:', code);
    return this.http.get<Country[]>(url).pipe(
      catchError((error) => {
        console.error(`[Service] Failed to fetch country ${code}:`, error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Fetch multiple countries by 3‑letter codes (e.g., GHA,NGA)
   */
  getCountriesByCodes(codes: string[]): Observable<Country[]> {
    const url = `${this.baseUrl}/alpha?codes=${codes.join(',')}`;
    console.log('[Service] Fetching multiple codes:', codes);
    return this.http.get<Country[]>(url).pipe(
      catchError((error) => {
        console.error('[Service] Failed to fetch multiple countries:', error);
        return throwError(() => error);
      })
    );
  }
}
