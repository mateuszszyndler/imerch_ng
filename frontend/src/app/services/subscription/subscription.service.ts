import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Subscription } from '../../interfaces/subscription';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Usage: Create or update a subscription entry
  // Example: this.subscriptionService.createOrUpdateSubscription(subscriptionData).subscribe(subscription => console.log(subscription));
  createOrUpdateSubscription(subscriptionData: any): Observable<Subscription> {
    return this.http
      .post<Subscription>(`${this.baseUrl}/subscription`, subscriptionData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Delete a subscription entry
  // Example: this.subscriptionService.deleteSubscription('subscriptionId').subscribe(() => console.log('Subscription entry deleted'));
  deleteSubscription(subscriptionId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/subscription/${subscriptionId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get all subscription entries
  // Example: this.subscriptionService.getAllSubscriptions().subscribe(subscriptionList => console.log(subscriptionList));
  getAllSubscriptions(): Observable<Subscription[]> {
    return this.http
      .get<Subscription[]>(`${this.baseUrl}/subscription`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get a subscription entry by ID
  // Example: this.subscriptionService.getSubscriptionById('subscriptionId').subscribe(subscription => console.log(subscription));
  getSubscriptionById(subscriptionId: string): Observable<Subscription> {
    return this.http
      .get<Subscription>(`${this.baseUrl}/subscription/${subscriptionId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get subscription entries by status
  // Example: this.subscriptionService.getSubscriptionsByStatus('active').subscribe(subscriptionList => console.log(subscriptionList));
  getSubscriptionsByStatus(status: string): Observable<Subscription[]> {
    return this.http
      .get<Subscription[]>(`${this.baseUrl}/subscription/status`, {
        params: { status },
      })
      .pipe(catchError(this.handleError));
  }

  // Usage: Count subscription entries
  // Example: this.subscriptionService.countSubscriptions().subscribe(count => console.log(count));
  countSubscriptions(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/subscription/count`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get subscription entries by field
  // Example: this.subscriptionService.getSubscriptionsByField('field', 'value').subscribe(subscriptionList => console.log(subscriptionList));
  getSubscriptionsByField(
    field: string,
    value: string
  ): Observable<Subscription[]> {
    return this.http
      .get<Subscription[]>(
        `${this.baseUrl}/subscription/field/${field}/${value}`
      )
      .pipe(catchError(this.handleError));
  }

  // Usage: Apply filters to subscription entries
  // Example: this.subscriptionService.applyFilters(filters).subscribe(filteredSubscriptions => console.log(filteredSubscriptions));
  applyFilters(filters: any): Observable<Subscription[]> {
    return this.http
      .get<Subscription[]>(`${this.baseUrl}/subscription/apply-filters`, {
        params: filters,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.status) {
      errorMessage = `Error: ${error.error.message}`;
    }
    return throwError(errorMessage);
  }
}
