import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Seo } from '../../interfaces/seo';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Usage: Create or update a SEO entry
  // Example: this.seoService.createOrUpdateSeo(seoData).subscribe(seo => console.log(seo));
  createOrUpdateSeo(seoData: any): Observable<Seo> {
    return this.http
      .post<Seo>(`${this.baseUrl}/seo`, seoData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Delete a SEO entry
  // Example: this.seoService.deleteSeo('seoId').subscribe(() => console.log('SEO entry deleted'));
  deleteSeo(seoId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/seo/${seoId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get all SEO entries
  // Example: this.seoService.getAllSeo().subscribe(seoList => console.log(seoList));
  getAllSeo(): Observable<Seo[]> {
    return this.http
      .get<Seo[]>(`${this.baseUrl}/seo`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get a SEO entry by ID
  // Example: this.seoService.getSeoById('seoId').subscribe(seo => console.log(seo));
  getSeoById(seoId: string): Observable<Seo> {
    return this.http
      .get<Seo>(`${this.baseUrl}/seo/${seoId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get SEO entries by status
  // Example: this.seoService.getSeoByStatus('active').subscribe(seoList => console.log(seoList));
  getSeoByStatus(status: string): Observable<Seo[]> {
    return this.http
      .get<Seo[]>(`${this.baseUrl}/seo`, { params: { status } })
      .pipe(catchError(this.handleError));
  }

  // Usage: Count SEO entries
  // Example: this.seoService.countSeo().subscribe(count => console.log(count));
  countSeo(): Observable<{ count: number }> {
    return this.http
      .get<{ count: number }>(`${this.baseUrl}/seo/count`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get SEO entries by field
  // Example: this.seoService.getSeoByField('field', 'value').subscribe(seoList => console.log(seoList));
  getSeoByField(field: string, value: string): Observable<Seo[]> {
    return this.http
      .get<Seo[]>(`${this.baseUrl}/seo`, { params: { field, value } })
      .pipe(catchError(this.handleError));
  }

  // Usage: Get SEO entries by title
  // Example: this.seoService.getSeoByTitle('title').subscribe(seoList => console.log(seoList));
  getSeoByTitle(title: string): Observable<Seo[]> {
    return this.http
      .get<Seo[]>(`${this.baseUrl}/seo/title`, { params: { title } })
      .pipe(catchError(this.handleError));
  }

  // Usage: Get SEO entries by keywords
  // Example: this.seoService.getSeoByKeywords('keyword1,keyword2').subscribe(seoList => console.log(seoList));
  getSeoByKeywords(keywords: string): Observable<Seo[]> {
    return this.http
      .get<Seo[]>(`${this.baseUrl}/seo/keywords`, { params: { keywords } })
      .pipe(catchError(this.handleError));
  }

  // Usage: Get SEO entries by version
  // Example: this.seoService.getSeoByVersion(1).subscribe(seoList => console.log(seoList));
  getSeoByVersion(version: number): Observable<Seo[]> {
    return this.http
      .get<Seo[]>(`${this.baseUrl}/seo/version`, {
        params: { version: String(version) },
      })
      .pipe(catchError(this.handleError));
  }

  // Usage: Get SEO entries created within a specific date range
  // Example: this.seoService.getSeoByCreatedAtRange(startDate, endDate).subscribe(seoList => console.log(seoList));
  getSeoByCreatedAtRange(
    startDate: string,
    endDate: string
  ): Observable<Seo[]> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http
      .get<Seo[]>(`${this.baseUrl}/seo/created-at`, { params })
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
