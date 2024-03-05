import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Transaction } from '../../interfaces/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
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

  getAllTransactions(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(`${this.baseUrl}/transactions`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get all transactions
  // Example: this.transactionService.getAllTransactions().subscribe(transactions => console.log(transactions));

  getTransactionById(id: string): Observable<Transaction> {
    return this.http
      .get<Transaction>(`${this.baseUrl}/transactions/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get transaction by ID
  // Example: this.transactionService.getTransactionById('123').subscribe(transaction => console.log(transaction));

  createOrUpdateTransaction(transaction: Transaction): Observable<Transaction> {
    if (transaction._id) {
      return this.http
        .put<Transaction>(
          `${this.baseUrl}/transactions/${transaction._id}`,
          transaction
        )
        .pipe(catchError(this.handleError));
    } else {
      return this.http
        .post<Transaction>(`${this.baseUrl}/transactions`, transaction)
        .pipe(catchError(this.handleError));
    }
  }

  // Usage: Create or update transaction
  // Example: this.transactionService.createOrUpdateTransaction({ _id: '123', user_id: '456', transaction_amount: 100, transaction_currency: 'USD', transaction_status: 'paid', transaction_type: 'merch', payment_method: 'paypal', payment_provider: 'PayPal', provider_transaction_id: '789' }).subscribe(transaction => console.log(transaction));

  softDeleteOrRestoreTransaction(id: string): Observable<Transaction> {
    return this.http
      .delete<Transaction>(`${this.baseUrl}/transactions/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Soft delete or restore transaction
  // Example: this.transactionService.softDeleteOrRestoreTransaction('123').subscribe(transaction => console.log(transaction));

  getTransactionsByField(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(`${this.baseUrl}/transactions/by-field`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get transactions by field
  // Example: this.transactionService.getTransactionsByField().subscribe(transactions => console.log(transactions));

  getTransactionsByStatus(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(`${this.baseUrl}/transactions/by-status`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get transactions by status
  // Example: this.transactionService.getTransactionsByStatus().subscribe(transactions => console.log(transactions));

  countTransactions(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/transactions/count`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Count transactions
  // Example: this.transactionService.countTransactions().subscribe(count => console.log(count));

  generateReceipt(): Observable<void> {
    return this.http
      .get<void>(`${this.baseUrl}/transactions/receipt`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Generate receipt
  // Example: this.transactionService.generateReceipt().subscribe(() => console.log('Receipt generated'));

  applyFilters(): Observable<Transaction[]> {
    return this.http
      .get<Transaction[]>(`${this.baseUrl}/transactions/apply-filters`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Apply filters to transactions
  // Example: this.transactionService.applyFilters().subscribe(transactions => console.log(transactions));
}
