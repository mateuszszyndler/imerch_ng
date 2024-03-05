import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Comment } from '../../interfaces/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
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

  // Usage: Get all comments
  // Example: this.commentService.getAllComments().subscribe(comments => console.log(comments));
  getAllComments(): Observable<Comment[]> {
    const url = `${this.baseUrl}/comment`;
    const headers = this.getHeaders();
    return this.http.get<Comment[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Get top-rated comments
  // Example: this.commentService.getTopRatedComments().subscribe(comments => console.log(comments));
  getTopRatedComments(): Observable<Comment[]> {
    const url = `${this.baseUrl}/comment/top`;
    const headers = this.getHeaders();
    return this.http.get<Comment[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Get comment by ID
  // Example: this.commentService.getCommentById(commentId).subscribe(comment => console.log(comment));
  getCommentById(commentId: string): Observable<Comment> {
    const url = `${this.baseUrl}/comment/${commentId}`;
    const headers = this.getHeaders();
    return this.http.get<Comment>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Apply filters to comments
  // Example: this.commentService.applyFilters(filters).subscribe(filteredComments => console.log(filteredComments));
  applyFilters(filters: any): Observable<Comment[]> {
    const url = `${this.baseUrl}/comment/apply-filters`;
    const headers = this.getHeaders();
    return this.http.get<Comment[]>(url, { headers, params: filters }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Create or update a comment
  // Example: this.commentService.createOrUpdateComment(commentData).subscribe(comment => console.log(comment));
  createOrUpdateComment(commentData: Comment): Observable<Comment> {
    const url = `${this.baseUrl}/comment`;
    const headers = this.getHeaders();
    if (commentData._id) {
      return this.http.put<Comment>(`${url}/${commentData._id}`, commentData, { headers }).pipe(
        catchError(this.handleError)
      );
    } else {
      return this.http.post<Comment>(url, commentData, { headers }).pipe(
        catchError(this.handleError)
      );
    }
  }

  // Usage: Delete a comment
  // Example: this.commentService.deleteComment(commentId).subscribe(() => console.log('Comment deleted successfully'));
  deleteComment(commentId: string): Observable<void> {
    const url = `${this.baseUrl}/comment/${commentId}`;
    const headers = this.getHeaders();
    return this.http.delete<void>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Restore a comment
  // Example: this.commentService.restoreComment(commentId).subscribe(() => console.log('Comment restored successfully'));
  restoreComment(commentId: string): Observable<void> {
    const url = `${this.baseUrl}/comment/restore/${commentId}`;
    const headers = this.getHeaders();
    return this.http.post<void>(url, null, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Get user's comments
  // Example: this.commentService.getUserComments(userId).subscribe(comments => console.log(comments));
  getUserComments(userId: string): Observable<Comment[]> {
    const url = `${this.baseUrl}/comment/user/${userId}`;
    const headers = this.getHeaders();
    return this.http.get<Comment[]>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Add a like to a comment
  // Example: this.commentService.addLikeToComment(commentId).subscribe(comment => console.log(comment));
  addLikeToComment(commentId: string): Observable<Comment> {
    const url = `${this.baseUrl}/comment/${commentId}/like`;
    const headers = this.getHeaders();
    return this.http.post<Comment>(url, null, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Remove a like from a comment
  // Example: this.commentService.removeLikeFromComment(commentId).subscribe(comment => console.log(comment));
  removeLikeFromComment(commentId: string): Observable<Comment> {
    const url = `${this.baseUrl}/comment/${commentId}/like`;
    const headers = this.getHeaders();
    return this.http.delete<Comment>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Add a share to a comment
  // Example: this.commentService.addShareToComment(commentId).subscribe(comment => console.log(comment));
  addShareToComment(commentId: string): Observable<Comment> {
    const url = `${this.baseUrl}/comment/${commentId}/share`;
    const headers = this.getHeaders();
    return this.http.post<Comment>(url, null, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Remove a share from a comment
  // Example: this.commentService.removeShareFromComment(commentId).subscribe(comment => console.log(comment));
  removeShareFromComment(commentId: string): Observable<Comment> {
    const url = `${this.baseUrl}/comment/${commentId}/share`;
    const headers = this.getHeaders();
    return this.http.delete<Comment>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Add a history entry to a comment
  // Example: this.commentService.addHistoryToComment(commentId, historyData).subscribe(comment => console.log(comment));
  addHistoryToComment(commentId: string, historyData: any): Observable<Comment> {
    const url = `${this.baseUrl}/comment/${commentId}/history`;
    const headers = this.getHeaders();
    return this.http.post<Comment>(url, historyData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Usage: Get the history of a comment
  // Example: this.commentService.getCommentHistory(commentId).subscribe(history => console.log(history));
  getCommentHistory(commentId: string): Observable<any> {
    const url = `${this.baseUrl}/comment/${commentId}/history`;
    const headers = this.getHeaders();
    return this.http.get<any>(url, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}
