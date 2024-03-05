import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Payment } from '../../interfaces/payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const headers = new HttpHeaders();
    // Add any additional headers here
    return headers;
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

  // Usage: Get all payments
  // Example: this.paymentService.getAllPayments().subscribe(payments => console.log(payments));
  getAllPayments(): Observable<Payment[]> {
    const url = `${this.baseUrl}/payments`;
    const headers = this.getHeaders();
    return this.http.get<Payment[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Get payment by ID
  // Example: this.paymentService.getPayment(paymentId).subscribe(payment => console.log(payment));
  getPayment(paymentId: string): Observable<Payment> {
    const url = `${this.baseUrl}/payments/${paymentId}`;
    const headers = this.getHeaders();
    return this.http.get<Payment>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Create a payment
  // Example: this.paymentService.createPayment(payment).subscribe(result => console.log(result));
  createPayment(payment: Payment): Observable<any> {
    const url = `${this.baseUrl}/payments`;
    const headers = this.getHeaders();
    return this.http.post<any>(url, payment, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Update a payment
  // Example: this.paymentService.updatePayment(paymentId, updatedPayment).subscribe(result => console.log(result));
  updatePayment(paymentId: string, updatedPayment: Payment): Observable<any> {
    const url = `${this.baseUrl}/payments/${paymentId}`;
    const headers = this.getHeaders();
    return this.http.put<any>(url, updatedPayment, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Delete a payment
  // Example: this.paymentService.deletePayment(paymentId).subscribe(result => console.log(result));
  deletePayment(paymentId: string): Observable<any> {
    const url = `${this.baseUrl}/payments/${paymentId}`;
    const headers = this.getHeaders();
    return this.http.delete<any>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Find payments by status
  // Example: this.paymentService.findPaymentsByStatus(status).subscribe(payments => console.log(payments));
  findPaymentsByStatus(status: string): Observable<Payment[]> {
    const url = `${this.baseUrl}/payments/status?status=${status}`;
    const headers = this.getHeaders();
    return this.http.get<Payment[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Count the number of payments
  // Example: this.paymentService.countPayments().subscribe(count => console.log(count));
  countPayments(): Observable<number> {
    const url = `${this.baseUrl}/payments/count`;
    const headers = this.getHeaders();
    return this.http.get<number>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Soft delete a payment
  // Example: this.paymentService.softDeletePayment(paymentId).subscribe(result => console.log(result));
  softDeletePayment(paymentId: string): Observable<any> {
    const url = `${this.baseUrl}/payments/soft-delete/${paymentId}`;
    const headers = this.getHeaders();
    return this.http.put<any>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Apply filters to retrieve payments
  // Example: this.paymentService.applyFilters(filters).subscribe(payments => console.log(payments));
  applyFilters(filters: any): Observable<Payment[]> {
    const url = `${this.baseUrl}/payments/apply-filters`;
    const headers = this.getHeaders();
    return this.http.post<Payment[]>(url, filters, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Get payments by field
  // Example: this.paymentService.getPaymentsByField(field, value).subscribe(payments => console.log(payments));
  getPaymentsByField(field: string, value: string): Observable<Payment[]> {
    const url = `${this.baseUrl}/payments/byField/${field}/${value}`;
    const headers = this.getHeaders();
    return this.http.get<Payment[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}
