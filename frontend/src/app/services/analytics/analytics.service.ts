import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { EventLog } from '../../interfaces/event-log';
import { ErrorLog } from '../../interfaces/error-log';
import { Log } from '../../interfaces/log';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUserIpAddress(): Observable<string> {
    return this.http
      .get<{ ip: string }>('https://api.ipify.org?format=json')
      .pipe(map((response) => response.ip));
  }

  // Log a new analytic event
  // Example: this.analyticsService.logEvent(newAnalytic).subscribe(analytic => console.log(analytic));
  logEvent(newAnalytic: EventLog): Observable<EventLog> {
    return this.http
      .post<EventLog>(`${this.baseUrl}/analytics/analytics`, newAnalytic)
      .pipe(catchError(this.handleError));
  }

  // Save or update an event log
  // Example: this.analyticsService.saveOrUpdateEventLog(eventLogData).subscribe(eventLog => console.log(eventLog));
  saveOrUpdateEventLog(eventLogData: {
    id?: string;
    data: EventLog;
  }): Observable<EventLog> {
    const { id, data } = eventLogData;
    if (id) {
      return this.http
        .put<EventLog>(`${this.baseUrl}/event-logs/${id}`, data)
        .pipe(catchError(this.handleError));
    } else {
      return this.http
        .post<EventLog>(`${this.baseUrl}/event-logs`, data)
        .pipe(catchError(this.handleError));
    }
  }

  // Delete an event log
  // Example: this.analyticsService.deleteEventLog(eventLogId).subscribe(() => console.log('Event log deleted'));
  deleteEventLog(eventLogId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/event-logs/${eventLogId}`)
      .pipe(catchError(this.handleError));
  }

  // Get event logs by status
  // Example: this.analyticsService.getEventLogsByStatus(status).subscribe(eventLogs => console.log(eventLogs));
  getEventLogsByStatus(status: string): Observable<EventLog[]> {
    return this.http
      .get<EventLog[]>(`${this.baseUrl}/event-logs/${status}`)
      .pipe(catchError(this.handleError));
  }

  // Count event logs
  // Example: this.analyticsService.countEventLogs().subscribe(count => console.log(count));
  countEventLogs(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/event-logs/count`)
      .pipe(catchError(this.handleError));
  }

  // Get event logs by user ID
  // Example: this.analyticsService.getUserEventLogs(userId).subscribe(eventLogs => console.log(eventLogs));
  getUserEventLogs(userId: string): Observable<EventLog[]> {
    return this.http
      .get<EventLog[]>(`${this.baseUrl}/event-logs/user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  // Apply filters to event logs
  // Example: this.analyticsService.applyFiltersToEventLogs(filters).subscribe(filteredEventLogs => console.log(filteredEventLogs));
  applyFiltersToEventLogs(filters: any): Observable<EventLog[]> {
    const params = new HttpParams({ fromObject: filters });
    return this.http
      .post<EventLog[]>(`${this.baseUrl}/event-logs/apply-filters`, null, {
        params,
      })
      .pipe(catchError(this.handleError));
  }

  // Save or update an error log
  // Example: this.analyticsService.saveOrUpdateErrorLog(errorLogData).subscribe(errorLog => console.log(errorLog));
  saveOrUpdateErrorLog(errorLogData: {
    id?: string;
    data: ErrorLog;
  }): Observable<ErrorLog> {
    const { id, data } = errorLogData;
    if (id) {
      return this.http
        .put<ErrorLog>(`${this.baseUrl}/error-logs/${id}`, data)
        .pipe(catchError(this.handleError));
    } else {
      return this.http
        .post<ErrorLog>(`${this.baseUrl}/error-logs`, data)
        .pipe(catchError(this.handleError));
    }
  }

  // Delete an error log
  // Example: this.analyticsService.deleteErrorLog(errorLogId).subscribe(() => console.log('Error log deleted'));
  deleteErrorLog(errorLogId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/error-logs/${errorLogId}`)
      .pipe(catchError(this.handleError));
  }

  // Get error logs by status
  // Example: this.analyticsService.getErrorLogsByStatus(status).subscribe(errorLogs => console.log(errorLogs));
  getErrorLogsByStatus(status: string): Observable<ErrorLog[]> {
    return this.http
      .get<ErrorLog[]>(`${this.baseUrl}/error-logs/${status}`)
      .pipe(catchError(this.handleError));
  }

  // Count error logs
  // Example: this.analyticsService.countErrorLogs().subscribe(count => console.log(count));
  countErrorLogs(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/error-logs/count`)
      .pipe(catchError(this.handleError));
  }

  // Get error logs by user ID
  // Example: this.analyticsService.getUserErrorLogs(userId).subscribe(errorLogs => console.log(errorLogs));
  getUserErrorLogs(userId: string): Observable<ErrorLog[]> {
    return this.http
      .get<ErrorLog[]>(`${this.baseUrl}/error-logs/user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  // Apply filters to error logs
  // Example: this.analyticsService.applyFiltersToErrorLogs(filters).subscribe(filteredErrorLogs => console.log(filteredErrorLogs));
  applyFiltersToErrorLogs(filters: any): Observable<ErrorLog[]> {
    const params = new HttpParams({ fromObject: filters });
    return this.http
      .post<ErrorLog[]>(`${this.baseUrl}/error-logs/apply-filters`, null, {
        params,
      })
      .pipe(catchError(this.handleError));
  }

  // Save or update a log
  // Example: this.analyticsService.saveOrUpdateLog(logData).subscribe(log => console.log(log));
  saveOrUpdateLog(logData: { id?: string; data: Log }): Observable<Log> {
    const { id, data } = logData;
    if (id) {
      return this.http
        .put<Log>(`${this.baseUrl}/logs/${id}`, data)
        .pipe(catchError(this.handleError));
    } else {
      return this.http
        .post<Log>(`${this.baseUrl}/logs`, data)
        .pipe(catchError(this.handleError));
    }
  }

  // Delete a log
  // Example: this.analyticsService.deleteLog(logId).subscribe(() => console.log('Log deleted'));
  deleteLog(logId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/logs/${logId}`)
      .pipe(catchError(this.handleError));
  }

  // Get logs by status
  // Example: this.analyticsService.getLogsByStatus(status).subscribe(logs => console.log(logs));
  getLogsByStatus(status: string): Observable<Log[]> {
    return this.http
      .get<Log[]>(`${this.baseUrl}/logs/${status}`)
      .pipe(catchError(this.handleError));
  }

  // Count logs
  // Example: this.analyticsService.countLogs().subscribe(count => console.log(count));
  countLogs(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/logs/count`)
      .pipe(catchError(this.handleError));
  }

  // Get logs by user ID
  // Example: this.analyticsService.getUserLogs(userId).subscribe(logs => console.log(logs));
  getUserLogs(userId: string): Observable<Log[]> {
    return this.http
      .get<Log[]>(`${this.baseUrl}/logs/user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  // Apply filters to logs
  // Example: this.analyticsService.applyFiltersToLogs(filters).subscribe(filteredLogs => console.log(filteredLogs));
  applyFiltersToLogs(filters: any): Observable<Log[]> {
    const params = new HttpParams({ fromObject: filters });
    return this.http
      .get<Log[]>(`${this.baseUrl}/logs/apply-filters`, { params })
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
