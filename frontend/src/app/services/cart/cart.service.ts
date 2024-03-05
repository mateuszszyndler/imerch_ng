import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Cart, CartItem, CartStatus, DeliveryStatus, DiscountApplied, DeliveryAddress, Delivery, BillingAddress } from '../../interfaces/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
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

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  // Usage: Create or update a cart
  // Example: this.cartService.createOrUpdateCart(cartData).subscribe(cart => console.log(cart));
  createOrUpdateCart(cartData: Cart): Observable<Cart> {
    const url = `${this.baseUrl}/cart`;
    const headers = this.getHeaders();
    return this.http.post<Cart>(url, cartData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Delete a cart
  // Example: this.cartService.deleteCart(cartId).subscribe(() => console.log('Cart deleted successfully'));
  deleteCart(cartId: string): Observable<void> {
    const url = `${this.baseUrl}/cart/${cartId}`;
    const headers = this.getHeaders();
    return this.http.delete<void>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Get carts by status
  // Example: this.cartService.findCartByStatus(status).subscribe(carts => console.log(carts));
  findCartByStatus(status: CartStatus): Observable<Cart[]> {
    const url = `${this.baseUrl}/cart/status?status=${status}`;
    const headers = this.getHeaders();
    return this.http.get<Cart[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Count all carts
  // Example: this.cartService.countCarts().subscribe(count => console.log(count));
  countCarts(): Observable<number> {
    const url = `${this.baseUrl}/cart/count`;
    const headers = this.getHeaders();
    return this.http.get<{ count: number }>(url, { headers }).pipe(
      map(response => response.count),
      catchError(this.handleError)
    );
  }

  // Usage: Save or update a cart
  // Example: this.cartService.saveOrUpdate(cartData).subscribe(cart => console.log(cart));
  saveOrUpdate(cartData: Cart): Observable<Cart> {
    const url = `${this.baseUrl}/cart/saveOrUpdate`;
    const headers = this.getHeaders();
    return this.http.post<Cart>(url, cartData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Soft delete or restore a cart
  // Example: this.cartService.softDeleteOrRestore(cartId).subscribe(cart => console.log(cart));
  softDeleteOrRestore(cartId: string): Observable<Cart> {
    const url = `${this.baseUrl}/cart/softDeleteOrRestore/${cartId}`;
    const headers = this.getHeaders();
    return this.http.post<Cart>(url, null, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Get user's carts
  // Example: this.cartService.getUser(userId).subscribe(carts => console.log(carts));
  getUser(userId: string): Observable<Cart[]> {
    const url = `${this.baseUrl}/cart/user/${userId}`;
    const headers = this.getHeaders();
    return this.http.get<Cart[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Apply filters to carts
  // Example: this.cartService.applyFilters(filters).subscribe(filteredCarts => console.log(filteredCarts));
  applyFilters(filters: any): Observable<Cart[]> {
    const url = `${this.baseUrl}/cart/apply-filters`;
    const headers = this.getHeaders();
    return this.http.get<Cart[]>(url, { headers, params: filters }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Get cart by ID
  // Example: this.cartService.getById(cartId).subscribe(cart => console.log(cart));
  getById(cartId: string): Observable<Cart> {
    const url = `${this.baseUrl}/cart/${cartId}`;
    const headers = this.getHeaders();
    return this.http.get<Cart>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Get all carts
  // Example: this.cartService.getAll().subscribe(carts => console.log(carts));
  getAll(): Observable<Cart[]> {
    const url = `${this.baseUrl}/cart`;
    const headers = this.getHeaders();
    return this.http.get<Cart[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Get carts by field
  // Example: this.cartService.getByField(field, value).subscribe(carts => console.log(carts));
  getByField(field: string, value: string): Observable<Cart[]> {
    const url = `${this.baseUrl}/cart/getByField`;
    const headers = this.getHeaders();
    const params = { field, value };
    return this.http.get<Cart[]>(url, { headers, params }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Add an item to a cart
  // Example: this.cartService.addItem(cartId, itemData).subscribe(cart => console.log(cart));
  addItem(cartId: string, itemData: CartItem): Observable<Cart> {
    const url = `${this.baseUrl}/cart/addItem/${cartId}`;
    const headers = this.getHeaders();
    return this.http.post<Cart>(url, itemData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Remove an item from a cart
  // Example: this.cartService.removeItem(cartId, itemId).subscribe(cart => console.log(cart));
  removeItem(cartId: string, itemId: string): Observable<Cart> {
    const url = `${this.baseUrl}/cart/removeItem/${cartId}/${itemId}`;
    const headers = this.getHeaders();
    return this.http.delete<Cart>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Update an item in a cart
  // Example: this.cartService.updateItem(cartId, itemId, updatedItemData).subscribe(cart => console.log(cart));
  updateItem(cartId: string, itemId: string, updatedItemData: CartItem): Observable<Cart> {
    const url = `${this.baseUrl}/cart/updateItem/${cartId}/${itemId}`;
    const headers = this.getHeaders();
    return this.http.put<Cart>(url, updatedItemData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Apply a discount to a cart
  // Example: this.cartService.applyDiscount(cartId, discountData).subscribe(cart => console.log(cart));
  applyDiscount(cartId: string, discountData: DiscountApplied): Observable<Cart> {
    const url = `${this.baseUrl}/cart/applyDiscount/${cartId}`;
    const headers = this.getHeaders();
    return this.http.post<Cart>(url, discountData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Remove a discount from a cart
  // Example: this.cartService.removeDiscount(cartId, discountId).subscribe(cart => console.log(cart));
  removeDiscount(cartId: string, discountId: string): Observable<Cart> {
    const url = `${this.baseUrl}/cart/removeDiscount/${cartId}/${discountId}`;
    const headers = this.getHeaders();
    return this.http.delete<Cart>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Calculate the total for a cart
  // Example: this.cartService.calculateTotal(cartId).subscribe(cart => console.log(cart));
  calculateTotal(cartId: string): Observable<Cart> {
    const url = `${this.baseUrl}/cart/calculateTotal/${cartId}`;
    const headers = this.getHeaders();
    return this.http.post<Cart>(url, null, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Mark a cart as empty
  // Example: this.cartService.markAsEmpty(cartId).subscribe(cart => console.log(cart));
  markAsEmpty(cartId: string): Observable<Cart> {
    const url = `${this.baseUrl}/cart/markAsEmpty/${cartId}`;
    const headers = this.getHeaders();
    return this.http.post<Cart>(url, null, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Set the shipping address for a cart
  // Example: this.cartService.setShippingAddress(cartId, addressData).subscribe(cart => console.log(cart));
  setShippingAddress(cartId: string, addressData: DeliveryAddress): Observable<Cart> {
    const url = `${this.baseUrl}/cart/setShippingAddress/${cartId}`;
    const headers = this.getHeaders();
    return this.http.post<Cart>(url, addressData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Set the billing address for a cart
  // Example: this.cartService.setBillingAddress(cartId, addressData).subscribe(cart => console.log(cart));
  setBillingAddress(cartId: string, addressData: BillingAddress): Observable<Cart> {
    const url = `${this.baseUrl}/cart/setBillingAddress/${cartId}`;
    const headers = this.getHeaders();
    return this.http.post<Cart>(url, addressData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Set the billing address same as shipping address for a cart
  // Example: this.cartService.setBillingSameAsShipping(cartId, isSame).subscribe(cart => console.log(cart));
  setBillingSameAsShipping(cartId: string, isSame: boolean): Observable<Cart> {
    const url = `${this.baseUrl}/cart/setBillingSameAsShipping/${cartId}`;
    const headers = this.getHeaders();
    const body = { isSame };
    return this.http.post<Cart>(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Set the payment method for a cart
  // Example: this.cartService.setPaymentMethod(cartId, paymentMethod).subscribe(cart => console.log(cart));
  setPaymentMethod(cartId: string, paymentMethod: string): Observable<Cart> {
    const url = `${this.baseUrl}/cart/setPaymentMethod/${cartId}`;
    const headers = this.getHeaders();
    const body = { paymentMethod };
    return this.http.post<Cart>(url, body, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}
