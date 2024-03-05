// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment.development';
import { User } from '../../interfaces/user';
import {
  SocialAuthService,
  SocialUser,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { CookieService } from 'ngx-cookie-service';

export interface UserResponse {
  user: User;
  token: string;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private localStorageKey = 'currentUser';
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    public cookieService: CookieService,
    private socialAuthService: SocialAuthService
  ) {
    const storedUser = localStorage.getItem(this.localStorageKey);
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? (JSON.parse(storedUser) as User) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  registerUser(user: User): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}/auth/register`, user).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  loginUser(username: string, password: string): Observable<UserResponse> {
    return this.http
      .post<UserResponse>(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        map((response) => {
          if (response.user && response.token) {
            // add token to user object
            response.user.token = response.token;
            // update localStorage and currentUserSubject
            localStorage.setItem(this.localStorageKey, JSON.stringify(response.user));
            this.currentUserSubject.next(response.user);
          }
          return response;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }




  logoutUser(): Observable<any> {
    localStorage.removeItem(this.localStorageKey);
    this.currentUserSubject.next(null);
    return this.http.post<any>(`${this.baseUrl}/auth/logout`, {}).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  changePassword(current: string, newpass: string): Observable<any> {
    this.cookieService.delete('currentUser');
    this.currentUserSubject.next(null);
    return this.http.post<any>(`${this.baseUrl}/auth/logout`, {}).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  socialLogin(service: string): void {
    let provider = '';

    switch (service) {
      case 'google':
        provider = GoogleLoginProvider.PROVIDER_ID;
        break;
      case 'facebook':
        provider = FacebookLoginProvider.PROVIDER_ID;
        break;
      default:
        // Handle other social login providers if needed
        break;
    }

    this.socialAuthService.signIn(provider).then((socialUser: SocialUser) => {
      const { email, idToken } = socialUser;
      const socialLoginData = {
        email,
        idToken,
        service, // Pass the service name to the backend
      };
      this.http
        .post<UserResponse>(`${this.baseUrl}/login/social`, socialLoginData)
        .subscribe(
          (response) => {
            if (response.user && response.token) {
              response.user.token = response.token;
              localStorage.setItem(this.localStorageKey, JSON.stringify(response.user));
              this.currentUserSubject.next(response.user);
            }
          },
          (error) => {
            throw error;
          }
        );
    });
  }


  refreshToken(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/token/refresh`, {}).pipe(
      catchError((err) => {
        throw err;
      })
    );
  }

  getUserId(): string | null {
    const currentUser = localStorage.getItem(this.localStorageKey);
    if (currentUser) {
      const user = JSON.parse(currentUser) as User;
      return user._id;
    }
    return null;
  }

  resetPassword(email: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/password/reset`, { email })
      .pipe(
        catchError((err) => {
          throw err;
        })
      );
  }

  handleSocialLoginCallback(service: string, code: string): Observable<User> {
    return this.http
      .post<User>(`${this.baseUrl}/${service}/callback`, { code })
      .pipe(
        map((user) => {
          if (user && user.token) {
            this.cookieService.set('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        }),
        catchError((err) => {
          throw err;
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.localStorageKey);
  }
}
