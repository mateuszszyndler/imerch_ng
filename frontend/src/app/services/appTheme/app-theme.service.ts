import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AppThemeService {
  private darkTheme = new BehaviorSubject<boolean>(this.getDarkThemeStatus());
  isDarkTheme = this.darkTheme.asObservable();

  constructor(private cookieService: CookieService) {}

  private getDarkThemeStatus(): boolean {
    const cookieValue = this.cookieService.get('darkTheme');
    return cookieValue === 'true' ? true : false;
  }

  setDarkTheme(isDarkTheme: boolean) {
    this.cookieService.set('darkTheme', isDarkTheme.toString());
    this.darkTheme.next(isDarkTheme);
    console.log('Updated theme:', isDarkTheme); // Add this line
  }
}
