import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Usage: Get all products
  // Example: this.productService.getAllProducts().subscribe(products => console.log(products));
  getAllProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.baseUrl}/product`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get product by ID
  // Example: this.productService.getProductById('productId').subscribe(product => console.log(product));
  getProductById(product_Id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/product/${product_Id}`).pipe(
      tap((product) => console.log('Product: ', product)), // Log the product to check its structure
      catchError(this.handleError)
    );
  }

  // Usage: Create or update product
  // Example: this.productService.createOrUpdateProduct(productData).subscribe(product => console.log(product));
  createOrUpdateProduct(productData: any): Observable<Product> {
    return this.http
      .post<Product>(`${this.baseUrl}/product`, productData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Update product
  // Example: this.productService.updateProduct('productId', updatedData).subscribe(updatedProduct => console.log(updatedProduct));
  updateProduct(productId: string, updatedData: any): Observable<Product> {
    return this.http
      .put<Product>(`${this.baseUrl}/product/${productId}`, updatedData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Delete product
  // Example: this.productService.deleteProduct('productId').subscribe(() => console.log('Product deleted'));
  deleteProduct(productId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/product/${productId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Soft delete or restore product
  // Example: this.productService.softDeleteOrRestoreProduct('productId', true).subscribe(product => console.log(product));
  softDeleteOrRestoreProduct(
    productId: string,
    isDeleted: boolean
  ): Observable<Product> {
    const action = isDeleted ? 'soft-delete-restore' : 'soft-delete-restore';
    return this.http
      .patch<Product>(`${this.baseUrl}/product/${productId}/${action}`, {})
      .pipe(catchError(this.handleError));
  }

  getProductsByStoreId(storeId: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.baseUrl}/product/store/${storeId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get products by status
  // Example: this.productService.getProductsByStatus('active').subscribe(products => console.log(products));
  getProductsByStatus(status: string): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.baseUrl}/product/status/${status}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get count of products
  // Example: this.productService.countProducts().subscribe(count => console.log(count));
  countProducts(): Observable<{ count: number }> {
    return this.http
      .get<{ count: number }>(`${this.baseUrl}/product/count`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get best products
  // Example: this.productService.getBestProducts().subscribe(products => console.log(products));
  getBestProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.baseUrl}/product/best`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get latest products
  // Example: this.productService.getLatestProducts().subscribe(products => console.log(products));
  getLatestProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.baseUrl}/product/latest`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get reviews of a product by ID
  // Example: this.productService.getProductReviews('productId').subscribe(reviews => console.log(reviews));
  getProductReviews(productId: string): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.baseUrl}/product/${productId}/reviews`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Apply filters to products
  // Example: this.productService.applyFilters(filters).subscribe(filteredProducts => console.log(filteredProducts));
  applyFilters(filters: any): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.baseUrl}/product/apply-filters`, {
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
