import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Predefined } from '../../interfaces/predefined';

@Injectable({
  providedIn: 'root',
})
export class PredefinedService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Usage: Get all predefined products
  // Example: this.predefinedService.getAllPredefinedProducts().subscribe(products => console.log(products));
  getAllPredefinedProducts(): Observable<Predefined[]> {
    return this.http
      .get<Predefined[]>(`${this.baseUrl}/predefined`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get predefined product by ID
  // Example: this.predefinedService.getPredefinedProductById('productId').subscribe(product => console.log(product));
  getPredefinedProductById(productId: string): Observable<Predefined> {
    return this.http
      .get<Predefined>(`${this.baseUrl}/predefined/${productId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get predefined products by status
  // Example: this.predefinedService.getPredefinedProductsByStatus('available').subscribe(products => console.log(products));
  getPredefinedProductsByStatus(status: string): Observable<Predefined[]> {
    return this.http
      .get<Predefined[]>(`${this.baseUrl}/predefined/status/${status}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get count of predefined products
  // Example: this.predefinedService.countPredefinedProducts().subscribe(count => console.log(count));
  countPredefinedProducts(): Observable<{ count: number }> {
    return this.http
      .get<{ count: number }>(`${this.baseUrl}/predefined/count`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Create or update predefined product
  // Example: this.predefinedService.createOrUpdatePredefinedProduct(productData).subscribe(product => console.log(product));
  createOrUpdatePredefinedProduct(productData: any): Observable<Predefined> {
    return this.http
      .post<Predefined>(`${this.baseUrl}/predefined`, productData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Update predefined product
  // Example: this.predefinedService.updatePredefinedProduct('productId', updatedData).subscribe(updatedProduct => console.log(updatedProduct));
  updatePredefinedProduct(
    productId: string,
    updatedData: any
  ): Observable<Predefined> {
    return this.http
      .put<Predefined>(`${this.baseUrl}/predefined/${productId}`, updatedData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Delete predefined product
  // Example: this.predefinedService.deletePredefinedProduct('productId').subscribe(() => console.log('Predefined product deleted'));
  deletePredefinedProduct(productId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/predefined/${productId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Soft delete or restore predefined product
  // Example: this.predefinedService.softDeleteOrRestorePredefinedProduct('productId', true).subscribe(product => console.log(product));
  softDeleteOrRestorePredefinedProduct(
    productId: string,
    isDeleted: boolean
  ): Observable<Predefined> {
    const queryParam = isDeleted
      ? 'soft-delete-restore'
      : 'soft-delete-restore';
    return this.http
      .put<Predefined>(
        `${this.baseUrl}/predefined/${queryParam}/${productId}`,
        {}
      )
      .pipe(catchError(this.handleError));
  }

  // Usage: Apply filters to predefined products
  // Example: this.predefinedService.applyFilters(filters).subscribe(filteredProducts => console.log(filteredProducts));
  applyFilters(filters: any): Observable<Predefined[]> {
    return this.http
      .post<Predefined[]>(`${this.baseUrl}/predefined/apply-filters`, filters)
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
