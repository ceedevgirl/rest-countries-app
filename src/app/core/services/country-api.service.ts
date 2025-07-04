import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../models/country.interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags,cca3,cca2,borders';

  /**
   * Get all countries with selected fields
   */
  getAllCountries(): Observable<Country[]> {
  const url = `${this.baseUrl}/all`; // ✅ remove ?fields=...
  return this.http.get<Country[]>(url).pipe(
    catchError((error) => {
      console.error('❌ Failed to fetch all countries', error);
      return throwError(() => error);
    })
  );
}


  /**
   * Get one country by its alpha3Code (e.g., 'GHA')
   */
  getCountryByCode(code: string): Observable<Country[]> {
    const url = `${this.baseUrl}/alpha/${code}`;

    return this.http.get<Country[]>(url).pipe(
      catchError((error) => {
        console.error(`❌ Failed to fetch country by code: ${code}`, error);
        return throwError(() => error);
      })
    );
  }

  /**
   * Get multiple countries by alpha3Codes (e.g., ['GHA', 'NGA'])
   */
  // country-api.service.ts
getCountriesByCodes(codes: string[]): Observable<Country[]> {
  const joinedCodes = codes.join(',');
  return this.http.get<Country[]>(`https://restcountries.com/v3.1/alpha?codes=${joinedCodes}`);
}

}
