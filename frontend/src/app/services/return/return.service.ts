import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Return } from '../../interfaces/return';

@Injectable({
  providedIn: 'root',
})
export class ReturnService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Usage: Create or update a return policy
  // Example: this.returnService.createOrUpdateReturn(returnData).subscribe(returnPolicy => console.log(returnPolicy));
  createOrUpdateReturn(returnData: any): Observable<Return> {
    return this.http
      .post<Return>(`${this.baseUrl}/return`, returnData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Delete a return policy
  // Example: this.returnService.deleteReturn('returnId').subscribe(() => console.log('Return policy deleted'));
  deleteReturn(returnId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/return/${returnId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get return policies by status
  // Example: this.returnService.getReturnPoliciesByStatus('active').subscribe(returnPolicies => console.log(returnPolicies));
  getReturnPoliciesByStatus(status: string): Observable<Return[]> {
    return this.http
      .get<Return[]>(`${this.baseUrl}/return?status=${status}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Count return policies
  // Example: this.returnService.countReturnPolicies().subscribe(count => console.log(count));
  countReturnPolicies(): Observable<{ count: number }> {
    return this.http
      .get<{ count: number }>(`${this.baseUrl}/return/count`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Save or update a return policy
  // Example: this.returnService.saveOrUpdateReturn('returnId', updatedData).subscribe(updatedReturn => console.log(updatedReturn));
  saveOrUpdateReturn(returnId: string, updatedData: any): Observable<Return> {
    return this.http
      .put<Return>(`${this.baseUrl}/return/${returnId}`, updatedData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Soft delete or restore a return policy
  // Example: this.returnService.softDeleteOrRestoreReturn('returnId').subscribe(returnPolicy => console.log(returnPolicy));
  softDeleteOrRestoreReturn(returnId: string): Observable<Return> {
    return this.http
      .put<Return>(`${this.baseUrl}/return/softDeleteOrRestore/${returnId}`, {})
      .pipe(catchError(this.handleError));
  }

  // Usage: Get return policy by ID
  // Example: this.returnService.getReturnPolicyById('returnId').subscribe(returnPolicy => console.log(returnPolicy));
  getReturnPolicyById(returnId: string): Observable<Return> {
    return this.http
      .get<Return>(`${this.baseUrl}/return/getById/${returnId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get all return policies
  // Example: this.returnService.getAllReturnPolicies().subscribe(returnPolicies => console.log(returnPolicies));
  getAllReturnPolicies(): Observable<Return[]> {
    return this.http
      .get<Return[]>(`${this.baseUrl}/return/getAll`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get return policies by field
  // Example: this.returnService.getReturnPoliciesByField('field', 'value').subscribe(returnPolicies => console.log(returnPolicies));
  getReturnPoliciesByField(field: string, value: string): Observable<Return[]> {
    return this.http
      .get<Return[]>(
        `${this.baseUrl}/return/getByField?field=${field}&value=${value}`
      )
      .pipe(catchError(this.handleError));
  }

  // Usage: Apply filters to return policies
  // Example: this.returnService.applyFiltersToReturnPolicies(filters).subscribe(filteredPolicies => console.log(filteredPolicies));
  applyFiltersToReturnPolicies(filters: any): Observable<Return[]> {
    return this.http
      .get<Return[]>(`${this.baseUrl}/return/apply-filters`, {
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
