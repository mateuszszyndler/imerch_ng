import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Payout } from '../../interfaces/payout';

@Injectable({
  providedIn: 'root',
})
export class PayoutService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Usage: Get all payouts
  // Example: this.payoutService.getAllPayouts().subscribe(payouts => console.log(payouts));
  getAllPayouts(): Observable<Payout[]> {
    return this.http
      .get<Payout[]>(`${this.baseUrl}/payout`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get payout by ID
  // Example: this.payoutService.getPayoutById('payoutId').subscribe(payout => console.log(payout));
  getPayoutById(payoutId: string): Observable<Payout> {
    return this.http
      .get<Payout>(`${this.baseUrl}/payout/${payoutId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get payouts by partner ID
  // Example: this.payoutService.getPayoutsByPartnerId('partnerId').subscribe(payouts => console.log(payouts));
  getPayoutsByPartnerId(partnerId: string): Observable<Payout[]> {
    return this.http
      .get<Payout[]>(`${this.baseUrl}/payout/partner/${partnerId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Find payouts by status
  // Example: this.payoutService.findPayoutsByStatus('success').subscribe(payouts => console.log(payouts));
  findPayoutsByStatus(status: string): Observable<Payout[]> {
    return this.http
      .get<Payout[]>(`${this.baseUrl}/payout/status`, { params: { status } })
      .pipe(catchError(this.handleError));
  }

  // Usage: Get count of payouts
  // Example: this.payoutService.countPayouts().subscribe(count => console.log(count));
  countPayouts(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/payout/count`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Create or update payout
  // Example: this.payoutService.createOrUpdatePayout(payoutData).subscribe(payout => console.log(payout));
  createOrUpdatePayout(payoutData: any): Observable<Payout> {
    return this.http
      .post<Payout>(`${this.baseUrl}/payout`, payoutData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Apply filters to payouts
  // Example: this.payoutService.applyFilters({ status: 'success' }).subscribe(filteredPayouts => console.log(filteredPayouts));
  applyFilters(filters: any): Observable<Payout[]> {
    return this.http
      .post<Payout[]>(`${this.baseUrl}/payout/filter`, filters)
      .pipe(catchError(this.handleError));
  }

  // Usage: Update payout
  // Example: this.payoutService.updatePayout('payoutId', updatedData).subscribe(updatedPayout => console.log(updatedPayout));
  updatePayout(payoutId: string, updatedData: any): Observable<Payout> {
    return this.http
      .put<Payout>(`${this.baseUrl}/payout/${payoutId}`, updatedData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Soft delete or restore payout
  // Example: this.payoutService.softDeleteOrRestorePayout('payoutId', true).subscribe(payout => console.log(payout));
  softDeleteOrRestorePayout(
    payoutId: string,
    isDeleted: boolean
  ): Observable<Payout> {
    const queryParam = isDeleted ? 'restore' : 'soft-delete';
    return this.http
      .put<Payout>(`${this.baseUrl}/payout/${queryParam}/${payoutId}`, {})
      .pipe(catchError(this.handleError));
  }

  // Usage: Delete payout
  // Example: this.payoutService.deletePayout('payoutId').subscribe(() => console.log('Payout deleted'));
  deletePayout(payoutId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/payout/${payoutId}`)
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
