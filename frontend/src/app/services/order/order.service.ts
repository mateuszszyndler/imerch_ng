import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Order } from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
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

  // Usage: Get all orders
  // Example: this.ordersService.getAllOrders().subscribe(orders => console.log(orders));
  getAllOrders(): Observable<Order[]> {
    const url = `${this.baseUrl}/orders`;
    const headers = this.getHeaders();
    return this.http.get<Order[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Get order by ID
  // Example: this.ordersService.getOrderById(orderId).subscribe(order => console.log(order));
  getOrderById(orderId: string): Observable<Order> {
    const url = `${this.baseUrl}/orders/${orderId}`;
    const headers = this.getHeaders();
    return this.http.get<Order>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Create or update an order
  // Example: this.ordersService.createOrUpdateOrder(order).subscribe(result => console.log(result));
  createOrUpdateOrder(order: Order): Observable<any> {
    const url = `${this.baseUrl}/orders`;
    const headers = this.getHeaders();
    return this.http.post<any>(url, order, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Delete an order
  // Example: this.ordersService.deleteOrder(orderId).subscribe(result => console.log(result));
  deleteOrder(orderId: string): Observable<any> {
    const url = `${this.baseUrl}/orders/${orderId}`;
    const headers = this.getHeaders();
    return this.http.delete<any>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Restore or soft delete an order
  // Example: this.ordersService.softDeleteOrRestoreOrder(orderId).subscribe(result => console.log(result));
  softDeleteOrRestoreOrder(orderId: string): Observable<any> {
    const url = `${this.baseUrl}/orders/restore/${orderId}`;
    const headers = this.getHeaders();
    return this.http.put<any>(url, {}, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Find orders by status
  // Example: this.ordersService.findOrdersByStatus(status).subscribe(orders => console.log(orders));
  findOrdersByStatus(status: string): Observable<Order[]> {
    const url = `${this.baseUrl}/orders/status/${status}`;
    const headers = this.getHeaders();
    return this.http.get<Order[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Count the number of orders
  // Example: this.ordersService.countOrders().subscribe(count => console.log(count));
  countOrders(): Observable<number> {
    const url = `${this.baseUrl}/orders/count`;
    const headers = this.getHeaders();
    return this.http.get<number>(url, { headers }).pipe(
     catchError(this.handleError)
    );
  }

  // Usage: Get user details for an order
  // Example: this.ordersService.getUser(orderId).subscribe(user => console.log(user));
  getUser(orderId: string): Observable<any> {
    const url = `${this.baseUrl}/orders/user/${orderId}`;
    const headers = this.getHeaders();
    return this.http.get<any>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Apply filters to retrieve orders
  // Example: this.ordersService.applyFilters(filters).subscribe(orders => console.log(orders));
  applyFilters(filters: any): Observable<Order[]> {
    const url = `${this.baseUrl}/orders/apply-filters`;
    const headers = this.getHeaders();
    return this.http.post<Order[]>(url, filters, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Get orders by field
  // Example: this.ordersService.getOrdersByField(field, value).subscribe(orders => console.log(orders));
  getOrdersByField(field: string, value: string): Observable<Order[]> {
    const url = `${this.baseUrl}/orders/field?${field}=${value}`;
    const headers = this.getHeaders();
    return this.http.get<Order[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Generate invoice document for an order
  // Example: this.ordersService.generateInvoiceDocument(orderId).subscribe(document => console.log(document));
  generateInvoiceDocument(orderId: string): Observable<any> {
    const url = `${this.baseUrl}/orders/document/${orderId}`;
    const headers = this.getHeaders();
    return this.http.get<any>(url, { headers, responseType: 'arraybuffer' as 'json' }).pipe(
      catchError(this.handleError)
    );
  }
}
