import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Shipping } from '../../interfaces/shipping';

@Injectable({
  providedIn: 'root',
})
export class ShippingService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.status) {
      errorMessage = `Error: ${error.error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }

  getAllShippings(): Observable<Shipping[]> {
    return this.http
      .get<Shipping[]>(`${this.baseUrl}/shipping`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get all shippings
  // Example: this.shippingService.getAllShippings().subscribe(shippings => console.log(shippings));

  getShippingById(id: string): Observable<Shipping> {
    return this.http
      .get<Shipping>(`${this.baseUrl}/shipping/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get shipping by ID
  // Example: this.shippingService.getShippingById('123').subscribe(shipping => console.log(shipping));

  saveOrUpdateShipping(shipping: Shipping): Observable<Shipping> {
    if (shipping._id) {
      return this.http
        .put<Shipping>(`${this.baseUrl}/shipping/${shipping._id}`, shipping)
        .pipe(catchError(this.handleError));
    } else {
      return this.http
        .post<Shipping>(`${this.baseUrl}/shipping`, shipping)
        .pipe(catchError(this.handleError));
    }
  }

  // Usage: Save or update shipping
  // Example: this.shippingService.saveOrUpdateShipping({ _id: '123', carrier: 'Carrier', estimatedDeliveryTime: '2 days', cost: 10, deletedAt: null, isActive: true, version: 1 }).subscribe(shipping => console.log(shipping));

  deleteShipping(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/shipping/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Delete shipping
  // Example: this.shippingService.deleteShipping('123').subscribe(() => console.log('Shipping deleted'));

  softDeleteOrRestoreShipping(id: string): Observable<Shipping> {
    return this.http
      .put<Shipping>(`${this.baseUrl}/shipping/soft-delete-restore/${id}`, {})
      .pipe(catchError(this.handleError));
  }

  // Usage: Soft delete or restore shipping
  // Example: this.shippingService.softDeleteOrRestoreShipping('123').subscribe(shipping => console.log(shipping));

  activateShipping(id: string): Observable<Shipping> {
    return this.http
      .put<Shipping>(`${this.baseUrl}/shipping/activate/${id}`, {})
      .pipe(catchError(this.handleError));
  }

  // Usage: Activate shipping
  // Example: this.shippingService.activateShipping('123').subscribe(shipping => console.log(shipping));

  deactivateShipping(id: string): Observable<Shipping> {
    return this.http
      .put<Shipping>(`${this.baseUrl}/shipping/deactivate/${id}`, {})
      .pipe(catchError(this.handleError));
  }

  //Usage: Deactivate shipping
  // Example: this.shippingService.deactivateShipping('123').subscribe(shipping => console.log(shipping));

  restoreShipping(id: string): Observable<Shipping> {
    return this.http
      .put<Shipping>(`${this.baseUrl}/shipping/restore/${id}`, {})
      .pipe(catchError(this.handleError));
  }

  // Usage: Restore shipping
  // Example: this.shippingService.restoreShipping('123').subscribe(shipping => console.log(shipping));

  countShippings(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/shipping/count`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get count of shippings
  // Example: this.shippingService.countShippings().subscribe(count => console.log(count));

  findShippingByStatus(): Observable<Shipping[]> {
    return this.http
      .get<Shipping[]>(`${this.baseUrl}/shipping/active`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Find shippings by status
  // Example: this.shippingService.findShippingByStatus().subscribe(shippings => console.log(shippings));

  applyFilters(): Observable<Shipping[]> {
    return this.http
      .get<Shipping[]>(`${this.baseUrl}/shipping/apply-filters`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Apply filters to shippings
  // Example: this.shippingService.applyFilters().subscribe(shippings => console.log(shippings));
}
