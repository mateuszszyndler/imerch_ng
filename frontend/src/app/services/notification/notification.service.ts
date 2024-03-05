import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Notification } from '../../interfaces/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Usage: Find notifications by status
  // Example: this.notificationService.findNotificationsByStatus('active').subscribe(notifications => console.log(notifications));
  findNotificationsByStatus(status: string): Observable<Notification[]> {
    return this.http
      .get<Notification[]>(`${this.baseUrl}/notification`, {
        params: { status },
      })
      .pipe(catchError(this.handleError));
  }

  // Usage: Create or update notification
  // Example: this.notificationService.createOrUpdateNotification(notificationData).subscribe(notification => console.log(notification));
  createOrUpdateNotification(notificationData: any): Observable<Notification> {
    return this.http
      .post<Notification>(`${this.baseUrl}/notification`, notificationData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Delete notification
  // Example: this.notificationService.deleteNotification('123').subscribe(() => console.log('Notification deleted'));
  deleteNotification(notificationId: string): Observable<Notification> {
    return this.http
      .delete<Notification>(`${this.baseUrl}/notification/${notificationId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get count of notifications
  // Example: this.notificationService.countNotifications().subscribe(count => console.log(count));
  countNotifications(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/notification/count`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get user notifications
  // Example: this.notificationService.getUserNotifications('userId').subscribe(notifications => console.log(notifications));
  getUserNotifications(userId: string): Observable<Notification[]> {
    return this.http
      .get<Notification[]>(`${this.baseUrl}/notification/user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Apply filters to notifications
  // Example: this.notificationService.applyFilters({ type: 'alert' }).subscribe(filteredNotifications => console.log(filteredNotifications));
  applyFilters(filters: any): Observable<Notification[]> {
    return this.http
      .get<Notification[]>(`${this.baseUrl}/notification/apply-filters`, {
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
