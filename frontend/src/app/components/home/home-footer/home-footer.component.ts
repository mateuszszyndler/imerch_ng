// home-footer.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

interface Contact {
  subject: string;
  message: string;
  name: string;
  surname: string;
  phoneNumber: string;
  email: string;
}

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.scss']
})
export class HomeFooterComponent implements OnInit {

  contactForm!: FormGroup;
  baseUrl = 'http://localhost:3000'; // replace this with your actual API URL

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.contactForm = this.formBuilder.group({
      subject: ['', Validators.required],
      message: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.createOrUpdateContactForm(this.contactForm.value)
        .subscribe(
          response => console.log(response),
          error => console.log(error)
        );
    }
  }

  createOrUpdateContactForm(contactData: Contact): Observable<Contact> {
    return this.http
      .post<Contact>(`${this.baseUrl}/contact`, contactData)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Some error occurred', error);
    return throwError(error);
  }
}
