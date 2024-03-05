import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Theme } from '../../interfaces/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Usage: Create or update a theme
  // Example: this.themeService.createOrUpdateTheme(themeData).subscribe(theme => console.log(theme));
  createOrUpdateTheme(themeData: any): Observable<Theme> {
    return this.http
      .post<Theme>(`${this.baseUrl}/theme`, themeData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Delete a theme
  // Example: this.themeService.deleteTheme('themeId').subscribe(() => console.log('Theme deleted'));
  deleteTheme(themeId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/theme/${themeId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get all themes
  // Example: this.themeService.getAllThemes().subscribe(themeList => console.log(themeList));
  getAllThemes(): Observable<Theme[]> {
    return this.http
      .get<Theme[]>(`${this.baseUrl}/theme/all`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get a theme by ID
  // Example: this.themeService.getThemeById('themeId').subscribe(theme => console.log(theme));
  getThemeById(themeId: string): Observable<Theme> {
    return this.http
      .get<Theme>(`${this.baseUrl}/theme/${themeId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get themes by status
  // Example: this.themeService.getThemesByStatus().subscribe(themeList => console.log(themeList));
  getThemesByStatus(): Observable<Theme[]> {
    return this.http
      .get<Theme[]>(`${this.baseUrl}/theme`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Count themes
  // Example: this.themeService.countThemes().subscribe(count => console.log(count));
  countThemes(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/theme/count`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Save or update a theme
  // Example: this.themeService.saveOrUpdateTheme(themeData).subscribe(theme => console.log(theme));
  saveOrUpdateTheme(themeData: any): Observable<Theme> {
    return this.http
      .put<Theme>(`${this.baseUrl}/theme`, themeData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Soft delete or restore a theme
  // Example: this.themeService.softDeleteOrRestoreTheme('themeId').subscribe(theme => console.log(theme));
  softDeleteOrRestoreTheme(themeId: string): Observable<Theme> {
    return this.http
      .put<Theme>(`${this.baseUrl}/theme/softdeleteorrestore/${themeId}`, {})
      .pipe(catchError(this.handleError));
  }

  // Usage: Get themes by field
  // Example: this.themeService.getThemesByField('field', 'value').subscribe(themeList => console.log(themeList));
  getThemesByField(field: string, value: string): Observable<Theme[]> {
    return this.http
      .get<Theme[]>(`${this.baseUrl}/theme/${field}/${value}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Apply filters to themes
  // Example: this.themeService.applyFilters(filters).subscribe(filteredThemes => console.log(filteredThemes));
  applyFilters(filters: any): Observable<Theme[]> {
    return this.http
      .get<Theme[]>(`${this.baseUrl}/theme/apply-filters`, { params: filters })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.status) {
      errorMessage = `Error: ${error.error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
