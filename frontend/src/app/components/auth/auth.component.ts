import {
  animate,
  sequence,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-3%)' }),
        sequence([
          animate(
            '0.5s ease',
            style({ opacity: 1, transform: 'translateY(0%)' })
          ),
        ]),
      ]),
      transition(':leave', [
        sequence([
          animate(
            '0.5s ease',
            style({ opacity: 0, transform: 'translateY(3%)' })
          ),
        ]),
      ]),
    ]),
    trigger('textAnimation', [
      state('in', style({ opacity: 1, transform: 'translateY(0)' })),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-10%)' }),
        animate('0.9s ease-out'),
      ]),
      transition(':leave', [
        animate(
          '0.9s ease-out',
          style({ opacity: 0, transform: 'translateY(10%)' })
        ),
      ]),
    ]),
  ],
})
export class AuthComponent implements OnInit {
  showLoginComponent: boolean = true;
  showRegisterComponent: boolean = false;
  subtitleLeft: string = 'Zaloguj się do swojego konta';
  subtitleRight: string =
    'Bądź Artystą, Bądź Marką: iMerch to platforma do tworzenia i sprzedaży Twoich własnych projektów. Cała koncepcja aplikacji jest bardzo prosta i wystarczy, że założysz profil dla swojej marki i udostępnisz produkty w swoim dedykowanym sklepie. '; // replace with your desired subtitle
  buttonText: string = 'Przejdź do strony głównej';

  imgURL: any;

  constructor(private sanitizer: DomSanitizer, private router: Router) {
    this.imgURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      'assets/images/landing/account.svg'
    );
  }

  ngOnInit(): void {}

  routeToHome() {
    this.router.navigate(['/home']);
  }

  switchComponent(componentName: string) {
    this.showLoginComponent = false;
    this.showRegisterComponent = false;

    setTimeout(() => {
      if (componentName === 'login') {
        this.showLoginComponent = true;
        this.subtitleLeft = 'Zaloguj się do swojego konta';
      } else if (componentName === 'register') {
        this.showRegisterComponent = true;
        this.subtitleLeft = 'Stwórz konto na platformie!';
      }
    }, 600); // this should match the longest duration of your animation
  }
}
