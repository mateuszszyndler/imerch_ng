import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { Design } from '../../interfaces/design';

@Injectable({
  providedIn: 'root',
})
export class DesignService {
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

  // Usage: Get all designs
  // Example: this.designService.getAllDesigns().subscribe(designs => console.log(designs));
  getAllDesigns(): Observable<Design[]> {
    const url = `${this.baseUrl}/design`;
    const headers = this.getHeaders();
    return this.http
      .get<Design[]>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  // Usage: Get design by ID
  // Example: this.designService.getDesignById(designId).subscribe(design => console.log(design));
  getDesignById(designId: string): Observable<Design> {
    const url = `${this.baseUrl}/design/${designId}`;
    const headers = this.getHeaders();
    return this.http
      .get<Design>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  // Usage: Get designs by field
  // Example: this.designService.getDesignsByField(field, value).subscribe(designs => console.log(designs));
  getDesignsByField(field: string, value: string): Observable<Design[]> {
    const url = `${this.baseUrl}/design/field/${field}/${value}`;
    const headers = this.getHeaders();
    return this.http
      .get<Design[]>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  // Usage: Find designs by status
  // Example: this.designService.findDesignByStatus(status).subscribe(designs => console.log(designs));
  findDesignByStatus(status: string): Observable<Design[]> {
    const url = `${this.baseUrl}/design/status/${status}`;
    const headers = this.getHeaders();
    return this.http
      .get<Design[]>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  // Usage: Get partner for a design
  // Example: this.designService.getPartnerForDesign(designId).subscribe(partner => console.log(partner));
  getPartnerForDesign(designId: string): Observable<any> {
    const url = `${this.baseUrl}/design/partner/${designId}`;
    const headers = this.getHeaders();
    return this.http
      .get<any>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  // Usage: Get product for a design
  // Example: this.designService.getProductForDesign(designId).subscribe(product => console.log(product));
  getProductForDesign(designId: string): Observable<any> {
    const url = `${this.baseUrl}/design/product/${designId}`;
    const headers = this.getHeaders();
    return this.http
      .get<any>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  // Usage: Get predefined product for a design
  // Example: this.designService.getPredefinedProductForDesign(designId).subscribe(predefinedProduct => console.log(predefinedProduct));
  getPredefinedProductForDesign(designId: string): Observable<any> {
    const url = `${this.baseUrl}/design/predefined-product/${designId}`;
    const headers = this.getHeaders();
    return this.http
      .get<any>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  // Usage: Get print area for a design
  // Example: this.designService.getPrintAreaForDesign(designId).subscribe(printArea => console.log(printArea));
  getPrintAreaForDesign(designId: string): Observable<any> {
    const url = `${this.baseUrl}/design/print-area/${designId}`;
    const headers = this.getHeaders();
    return this.http
      .get<any>(url, { headers })
      .pipe(catchError(this.handleError));
  }

  // Usage: Create or update a design
  // Example: this.designService.createOrUpdateDesign(designData).subscribe(design => console.log(design));
  createOrUpdateDesign(designData: Design): Observable<Design> {
    const url = `${this.baseUrl}/design`;
    const headers = this.getHeaders();
    if (designData._id) {
      return this.http
        .put<Design>(`${url}/${designData._id}`, designData, { headers })
        .pipe(catchError(this.handleError));
    } else {
      return this.http
        .post<Design>(url, designData, { headers })
        .pipe(catchError(this.handleError));
    }
  }

  // Usage: Apply filters to designs
  // Example: this.designService.applyFilters(filters).subscribe(filteredDesigns => console.log(filteredDesigns));
  applyFilters(filters: any): Observable<Design[]> {
    const url = `${this.baseUrl}/design/apply-filters`;
    const headers = this.getHeaders();
    return this.http
      .get<Design[]>(url, { headers, params: filters })
      .pipe(catchError(this.handleError));
  }

  // Usage: Count designs
  // Example: this.designService.countDesigns(countData).subscribe(count => console.log(count));
  countDesigns(countData: any): Observable<any> {
    const url = `${this.baseUrl}/design/count`;
    const headers = this.getHeaders();
    return this.http
      .post<any>(url, countData, { headers })
      .pipe(catchError(this.handleError));
  }

  // Usage: Save a design
  // Example: this.designService.saveDesign(designData).subscribe(savedDesign => console.log(savedDesign));
  saveDesign(designData: Design): Observable<Design> {
    const url = `${this.baseUrl}/design/save`;
    const headers = this.getHeaders();
    return this.http
      .post<Design>(url, designData, { headers })
      .pipe(catchError(this.handleError));
  }

  // Usage: Soft delete a design
  // Example: this.designService.softDeleteDesign(designId).subscribe(() => console.log('Design soft deleted successfully'));
  softDeleteDesign(designId: string): Observable<void> {
    const url = `${this.baseUrl}/design/soft-delete/${designId}`;
    const headers = this.getHeaders();
    return this.http
      .put<void>(url, null, { headers })
      .pipe(catchError(this.handleError));
  }

  // Usage: Restore a design
  // Example: this.designService.restoreDesign(designId).subscribe(() => console.log('Design restored successfully'));
  restoreDesign(designId: string): Observable<void> {
    const url = `${this.baseUrl}/design/restore/${designId}`;
    const headers = this.getHeaders();
    return this.http
      .put<void>(url, null, { headers })
      .pipe(catchError(this.handleError));
  }

  // Usage: Activate a design
  // Example: this.designService.activateDesign(designId).subscribe(() => console.log('Design activated successfully'));
  activateDesign(designId: string): Observable<void> {
    const url = `${this.baseUrl}/design/activate/${designId}`;
    const headers = this.getHeaders();
    return this.http
      .put<void>(url, null, { headers })
      .pipe(catchError(this.handleError));
  }

  // Usage: Deactivate a design
  // Example: this.designService.deactivateDesign(designId).subscribe(() => console.log('Design deactivated successfully'));
  deactivateDesign(designId: string): Observable<void> {
    const url = `${this.baseUrl}/design/deactivate/${designId}`;
    const headers = this.getHeaders();
    return this.http
      .put<void>(url, null, { headers })
      .pipe(catchError(this.handleError));
  }

  // Usage: Delete a design
  // Example: this.designService.deleteDesign(designId).subscribe(() => console.log('Design deleted successfully'));
  deleteDesign(designId: string): Observable<void> {
    const url = `${this.baseUrl}/design/${designId}`;
    const headers = this.getHeaders();
    return this.http
      .delete<void>(url, { headers })
      .pipe(catchError(this.handleError));
  }
}
