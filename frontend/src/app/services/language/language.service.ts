import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Language } from '../../interfaces/language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Usage: Get all languages
  // Example: this.languageService.getAllLanguages().subscribe(languages => console.log(languages));
  getAllLanguages(): Observable<Language[]> {
    return this.http
      .get<Language[]>(`${this.baseUrl}/language`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get language by ID
  // Example: this.languageService.getLanguageById('123').subscribe(language => console.log(language));
  getLanguageById(languageId: string): Observable<Language> {
    return this.http
      .get<Language>(`${this.baseUrl}/language/${languageId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Create or update language
  // Example: this.languageService.createOrUpdateLanguage(languageData).subscribe(language => console.log(language));
  createOrUpdateLanguage(languageData: any): Observable<Language> {
    return this.http
      .post<Language>(`${this.baseUrl}/language`, languageData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Delete language
  // Example: this.languageService.deleteLanguage('123').subscribe(() => console.log('Language deleted'));
  deleteLanguage(languageId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/language/${languageId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get languages by field
  // Example: this.languageService.getLanguagesByField('name', 'English').subscribe(languages => console.log(languages));
  getLanguagesByField(field: string, value: string): Observable<Language[]> {
    return this.http
      .get<Language[]>(`${this.baseUrl}/language/field/${field}/${value}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Find languages by status
  // Example: this.languageService.findLanguagesByStatus('active').subscribe(languages => console.log(languages));
  findLanguagesByStatus(status: string): Observable<Language[]> {
    return this.http
      .get<Language[]>(`${this.baseUrl}/language/status`, {
        params: { status },
      })
      .pipe(catchError(this.handleError));
  }

  // Usage: Get count of languages
  // Example: this.languageService.countLanguages().subscribe(count => console.log(count));
  countLanguages(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/language/count`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Apply filters to languages
  // Example: this.languageService.applyFilters({ isActive: true }).subscribe(filteredLanguages => console.log(filteredLanguages));
  applyFilters(filters: any): Observable<Language[]> {
    return this.http
      .get<Language[]>(`${this.baseUrl}/language/apply-filters`, {
        params: filters,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.status) {
      errorMessage = `Error: ${error.error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
