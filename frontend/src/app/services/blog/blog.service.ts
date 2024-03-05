import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Blog } from '../../interfaces/blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Create or update a blog
  // Example: this.blogService.saveOrUpdateBlog(blogData).subscribe(blog => console.log(blog));
  saveOrUpdateBlog(blogData: { id?: string; data: Blog }): Observable<Blog> {
    const { id, data } = blogData;
    if (id) {
      return this.http
        .put<Blog>(`${this.baseUrl}/blogs/${id}`, data)
        .pipe(catchError(this.handleError));
    } else {
      return this.http
        .post<Blog>(`${this.baseUrl}/blogs`, data)
        .pipe(catchError(this.handleError));
    }
  }

  // Delete a blog
  // Example: this.blogService.deleteBlog(blogId).subscribe(() => console.log('Blog deleted'));
  deleteBlog(blogId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/blogs/${blogId}`)
      .pipe(catchError(this.handleError));
  }

  // Get blogs by status
  // Example: this.blogService.getBlogsByStatus(status).subscribe(blogs => console.log(blogs));
  getBlogsByStatus(status: string): Observable<Blog[]> {
    const params = new HttpParams().set('status', status);
    return this.http
      .get<Blog[]>(`${this.baseUrl}/blogs`, { params })
      .pipe(catchError(this.handleError));
  }

  // Get blog by ID
  // Example: this.blogService.getBlogById(blogId).subscribe(blog => console.log(blog));
  getBlogById(blogId: string): Observable<Blog> {
    return this.http
      .get<Blog>(`${this.baseUrl}/blogs/${blogId}`)
      .pipe(catchError(this.handleError));
  }

  // Get blogs by field and value
  // Example: this.blogService.getBlogsByField('author', 'John Doe').subscribe(blogs => console.log(blogs));
  getBlogsByField(field: string, value: string): Observable<Blog[]> {
    const params = new HttpParams().set('field', field).set('value', value);
    return this.http
      .get<Blog[]>(`${this.baseUrl}/blogs/search`, { params })
      .pipe(catchError(this.handleError));
  }

  // Count blogs
  // Example: this.blogService.countBlogs().subscribe(count => console.log(count));
  countBlogs(): Observable<number> {
    return this.http
      .get<number>(`${this.baseUrl}/blogs/count`)
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
