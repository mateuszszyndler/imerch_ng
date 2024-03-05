import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Store } from '../../interfaces/store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Usage: Create or update a store entry
  // Example: this.storeService.createOrUpdateStore(storeData).subscribe(store => console.log(store));
  createOrUpdateStore(storeData: any): Observable<Store> {
    return this.http
      .post<Store>(`${this.baseUrl}/store`, storeData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Delete a store entry
  // Example: this.storeService.deleteStore('storeId').subscribe(() => console.log('Store entry deleted'));
  deleteStore(storeId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/store/${storeId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get all store entries
  // Example: this.storeService.getAllStores().subscribe(storeList => console.log(storeList));
  getAllStores(): Observable<Store[]> {
    return this.http
      .get<Store[]>(`${this.baseUrl}/store`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get a store entry by ID
  // Example: this.storeService.getStoreById('storeId').subscribe(store => console.log(store));
  getStoreById(storeId: string): Observable<Store> {
    return this.http
      .get<Store>(`${this.baseUrl}/store/${storeId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get store entries by status
  // Example: this.storeService.getStoresByStatus('active').subscribe(storeList => console.log(storeList));
  getStoresByStatus(status: string): Observable<Store[]> {
    return this.http
      .get<Store[]>(`${this.baseUrl}/store/status/${status}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Count store entries
  // Example: this.storeService.countStores().subscribe(count => console.log(count));
  countStores(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/store/count`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get store entries by field
  // Example: this.storeService.getStoresByField('field', 'value').subscribe(storeList => console.log(storeList));
  getStoresByField(field: string, value: string): Observable<Store[]> {
    return this.http
      .get<Store[]>(`${this.baseUrl}/store/field`, { params: { field, value } })
      .pipe(catchError(this.handleError));
  }

  // Usage: Apply filters to store entries
  // Example: this.storeService.applyFilters(filters).subscribe(filteredStores => console.log(filteredStores));
  applyFilters(filters: any): Observable<Store[]> {
    return this.http
      .get<Store[]>(`${this.baseUrl}/store/apply-filters`, { params: filters })
      .pipe(catchError(this.handleError));
  }

  // Usage: Get top store entries based on a criterion
  // Example: this.storeService.getTopStores().subscribe(storeList => console.log(storeList));
  getTopStores(): Observable<Store[]> {
    return this.http
      .get<Store[]>(`${this.baseUrl}/store/top-stores`)
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
