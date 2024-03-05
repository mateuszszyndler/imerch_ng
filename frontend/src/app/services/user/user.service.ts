import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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

  getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.baseUrl}/user`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get all users
  // Example: this.userService.getAllUsers().subscribe(users => console.log(users));

  getUserById(id: string): Observable<User> {
    return this.http
      .get<User>(`${this.baseUrl}/user/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get user by ID
  // Example: this.userService.getUserById('123').subscribe(user => console.log(user));

  createUserOrUpdateUser(user: User): Observable<User> {
    if (user._id) {
      return this.http
        .put<User>(`${this.baseUrl}/user/${user._id}`, user)
        .pipe(catchError(this.handleError));
    } else {
      return this.http
        .post<User>(`${this.baseUrl}/user`, user)
        .pipe(catchError(this.handleError));
    }
  }

  // Usage: Create or update user
  // Example: this.userService.createUserOrUpdateUser({ firstname: 'John', lastname: 'Doe', email: 'john@example.com', password: 'password' }).subscribe(user => console.log(user));

  deleteUser(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/user/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Delete user
  // Example: this.userService.deleteUser('123').subscribe(() => console.log('User deleted'));

  activateUser(id: string): Observable<User> {
    return this.http
      .patch<User>(`${this.baseUrl}/user/activate/${id}`, {})
      .pipe(catchError(this.handleError));
  }

  // Usage: Activate user
  // Example: this.userService.activateUser('123').subscribe(user => console.log(user));

  deactivateUser(id: string): Observable<User> {
    return this.http
      .patch<User>(`${this.baseUrl}/user/deactivate/${id}`, {})
      .pipe(catchError(this.handleError));
  }

  // Usage: Deactivate user
  // Example: this.userService.deactivateUser('123').subscribe(user => console.log(user));

  restoreUser(id: string): Observable<User> {
    return this.http
      .patch<User>(`${this.baseUrl}/user/restore/${id}`, {})
      .pipe(catchError(this.handleError));
  }

  // Usage: Restore user
  // Example: this.userService.restoreUser('123').subscribe(user => console.log(user));

  calculateUserRating(id: string): Observable<User> {
    return this.http
      .patch<User>(`${this.baseUrl}/user/calculate-rating/${id}`, {})
      .pipe(catchError(this.handleError));
  }

  // Usage: Calculate user rating
  // Example: this.userService.calculateUserRating('123').subscribe(user => console.log(user));
  getPendingOrders(id: string): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.baseUrl}/user/pending-orders/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get pending orders for user
  // Example: this.userService.getPendingOrders('123').subscribe(orders => console.log(orders));

  countUsers(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/user/count`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Count users
  // Example: this.userService.countUsers().subscribe(count => console.log(count));

  applyFilters(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.baseUrl}/user/apply-filters`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Apply filters to users
  // Example: this.userService.applyFilters().subscribe(users => console.log(users));

  getUserByField(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.baseUrl}/user/by-field`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get users by field
  // Example: this.userService.getUserByField().subscribe(users => console.log(users));

  saveOrUpdateUser(id: string): Observable<User> {
    return this.http
      .patch<User>(`${this.baseUrl}/user/save-or-update/${id}`, {})
      .pipe(catchError(this.handleError));
  }

  // Usage: Save or update user
  // Example: this.userService.saveOrUpdateUser('123').subscribe(user => console.log(user));

  softDeleteOrRestore(id: string): Observable<User> {
    return this.http
      .patch<User>(`${this.baseUrl}/user/soft-delete-or-restore/${id}`, {})
      .pipe(catchError(this.handleError));
  }

  // Usage: Soft delete or restore user
  // Example: this.userService.softDeleteOrRestore('123').subscribe(user => console.log(user));
}
