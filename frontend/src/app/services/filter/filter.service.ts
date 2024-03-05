
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
  import { throwError, Observable } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  import { environment } from '../../../environments/environment.development';
  import { Product } from '../../interfaces/product';

  @Injectable({
    providedIn: 'root',
  })
  export class FilterService {
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
        'Content-Type': 'application/json',
      });
    }

    filterProducts(filters: Record<string, any>): Observable<Product[]> {
      const url = `${this.baseUrl}/filter/filter`;
      const headers = this.getHeaders();
      return this.http
        .post<Product[]>(url, filters, { headers })
        .pipe(catchError(this.handleError));
    }

    filterByName(name: string): Observable<Product[]> {
      return this.filterProducts({ name });
    }

    filterByDescription(description: string): Observable<Product[]> {
      return this.filterProducts({ description });
    }

    filterByDesignId(designId: string): Observable<Product[]> {
      return this.filterProducts({ designId });
    }

    filterByPredefinedId(predefinedId: string): Observable<Product[]> {
      return this.filterProducts({ predefinedId });
    }

    filterByComments(commentId: string): Observable<Product[]> {
      return this.filterProducts({ comments: commentId });
    }

    filterByQuantity(min: number, max: number): Observable<Product[]> {
      return this.filterProducts({ quantity: { min, max } });
    }

    filterByTax(min: number, max: number): Observable<Product[]> {
      return this.filterProducts({ tax: { min, max } });
    }

    filterByDeletedAt(deletedAt: Date): Observable<Product[]> {
      return this.filterProducts({ deletedAt });
    }

    filterByIsActive(isActive: boolean): Observable<Product[]> {
      return this.filterProducts({ isActive });
    }

    filterByVersion(version: number): Observable<Product[]> {
      return this.filterProducts({ version });
    }

    filterByPreviewImages(image: string): Observable<Product[]> {
      return this.filterProducts({ previewImages: image });
    }

    filterByBrand(storeId: string): Observable<Product[]> {
      return this.filterProducts({ brand: storeId });
    }

    filterBySize(sizes: string[]): Observable<Product[]> {
      return this.filterProducts({ sizes });
    }

    filterByCategory(categories: string[]): Observable<Product[]> {
      return this.filterProducts({ categories });
    }

    filterByType(types: string[]): Observable<Product[]> {
      return this.filterProducts({ types });
    }

    filterByColor(colors: string[]): Observable<Product[]> {
      return this.filterProducts({ colors });
    }

    filterByPrice(min: number, max: number): Observable<Product[]> {
      return this.filterProducts({ price: { min, max } });
    }

    filterByAvailability(availability: string): Observable<Product[]> {
      return this.filterProducts({ availability });
    }

    filterByBestProducts(limit: number): Observable<Product[]> {
      return this.filterProducts({ bestProducts: limit });
    }

    filterByLatestProducts(limit: number): Observable<Product[]> {
      return this.filterProducts({ latestProducts: limit });
    }

    filterByReviewRating(
      productId: string,
      minRating: number,
      maxRating: number
    ): Observable<Product[]> {
      return this.filterProducts({ reviewRating: { productId, minRating, maxRating } });
    }
  }
