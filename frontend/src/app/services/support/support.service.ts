import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Support } from '../../interfaces/support';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Usage: Create or update a support request
  // Example: this.supportService.createOrUpdateSupport(supportData).subscribe(support => console.log(support));
  createOrUpdateSupport(supportData: any): Observable<Support> {
    return this.http
      .post<Support>(`${this.baseUrl}/support`, supportData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Delete a support request
  // Example: this.supportService.deleteSupport('supportId').subscribe(() => console.log('Support request deleted'));
  deleteSupport(supportId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/support/${supportId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get all support requests
  // Example: this.supportService.getAllSupport().subscribe(supportList => console.log(supportList));
  getAllSupport(): Observable<Support[]> {
    return this.http
      .get<Support[]>(`${this.baseUrl}/support`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get a support request by ID
  // Example: this.supportService.getSupportById('supportId').subscribe(support => console.log(support));
  getSupportById(supportId: string): Observable<Support> {
    return this.http
      .get<Support>(`${this.baseUrl}/support/${supportId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get support requests by status
  // Example: this.supportService.getSupportByStatus('open').subscribe(supportList => console.log(supportList));
  getSupportByStatus(status: string): Observable<Support[]> {
    return this.http
      .get<Support[]>(`${this.baseUrl}/support/status`, { params: { status } })
      .pipe(catchError(this.handleError));
  }

  // Usage: Get support requests by field
  // Example: this.supportService.getSupportByField('field', 'value').subscribe(supportList => console.log(supportList));
  getSupportByField(field: string, value: string): Observable<Support[]> {
    return this.http
      .get<Support[]>(`${this.baseUrl}/support/field`, {
        params: { field, value },
      })
      .pipe(catchError(this.handleError));
  }

  // Usage: Apply filters to support requests
  // Example: this.supportService.applyFilters(filters).subscribe(filteredSupport => console.log(filteredSupport));
  applyFilters(filters: any): Observable<Support[]> {
    return this.http
      .get<Support[]>(`${this.baseUrl}/support/apply-filters`, {
        params: filters,
      })
      .pipe(catchError(this.handleError));
  }

  // Usage: Count support requests
  // Example: this.supportService.countSupport().subscribe(count => console.log(count));
  countSupport(): Observable<number> {
    return this.http
      .post<number>(`${this.baseUrl}/support/count`, {})
      .pipe(catchError(this.handleError));
  }

  // Usage: Soft delete or restore a support request
  // Example: this.supportService.softDeleteOrRestoreSupport('supportId').subscribe(support => console.log(support));
  softDeleteOrRestoreSupport(supportId: string): Observable<Support> {
    return this.http
      .put<Support>(`${this.baseUrl}/support/soft-delete/${supportId}`, {})
      .pipe(catchError(this.handleError));
  }

  // Usage: Get user's support requests
  // Example: this.supportService.getUserSupport('userId').subscribe(supportList => console.log(supportList));
  getUserSupport(userId: string): Observable<Support[]> {
    return this.http
      .get<Support[]>(`${this.baseUrl}/support/user/${userId}`)
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
