import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Faq } from '../../interfaces/faq';

@Injectable({
  providedIn: 'root',
})
export class FaqService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Usage: Get all FAQs
  // Example: this.faqService.getAllFaqs().subscribe(faqs => console.log(faqs));
  getAllFaqs(): Observable<Faq[]> {
    return this.http
      .get<Faq[]>(`${this.baseUrl}/faq`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get FAQ by ID
  // Example: this.faqService.getFaqById(faqId).subscribe(faq => console.log(faq));
  getFaqById(faqId: string): Observable<Faq> {
    return this.http
      .get<Faq>(`${this.baseUrl}/faqs/${faqId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Get FAQs by status
  // Example: this.faqService.getFaqsByStatus(status).subscribe(faqs => console.log(faqs));
  getFaqsByStatus(status: string): Observable<Faq[]> {
    return this.http
      .get<Faq[]>(`${this.baseUrl}/faqs/status/${status}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Create or update a FAQ
  // Example: this.faqService.createOrUpdateFaq(faqData).subscribe(faq => console.log(faq));
  createOrUpdateFaq(faqData: any): Observable<Faq> {
    return this.http
      .post<Faq>(`${this.baseUrl}/faqs`, faqData)
      .pipe(catchError(this.handleError));
  }

  // Usage: Delete a FAQ
  // Example: this.faqService.deleteFaq(faqId).subscribe(faq => console.log(faq));
  deleteFaq(faqId: string): Observable<Faq> {
    return this.http
      .delete<Faq>(`${this.baseUrl}/faqs/${faqId}`)
      .pipe(catchError(this.handleError));
  }

  // Usage: Soft delete or restore a FAQ
  // Example: this.faqService.softDeleteOrRestoreFaq(faqId).subscribe(faq => console.log(faq));
  softDeleteOrRestoreFaq(faqId: string): Observable<Faq> {
    return this.http
      .put<Faq>(`${this.baseUrl}/faqs/soft-delete-restore/${faqId}`, {})
      .pipe(catchError(this.handleError));
  }

  // Usage: Count the number of FAQs
  // Example: this.faqService.countFaqs().subscribe(count => console.log(count));
  countFaqs(): Observable<any> {
    return this.http
      .get<any>(`${this.baseUrl}/faqs/count`)
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
