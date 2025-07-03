import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Country } from '../models/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryApiService {
  private readonly baseUrl = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/all?fields=name,flags,population,region,capital,cca3`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getCountryByCode(code: string): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.baseUrl}/alpha/${code}`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  getCountriesByCodes(codes: string[]): Observable<Country[]> {
    const codesParam = codes.join(',');
    return this.http.get<Country[]>(`${this.baseUrl}/alpha?codes=${codesParam}&fields=name,flags,cca3`)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}