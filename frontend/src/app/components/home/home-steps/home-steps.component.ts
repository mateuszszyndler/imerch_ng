import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home-steps',
  templateUrl: './home-steps.component.html',
  styleUrls: ['./home-steps.component.scss'],
})
export class HomeStepsComponent implements OnInit {
  steps = [
    {
      title: 'Zarejestruj się',
      description: 'Rozpocznij swoją przygodę z iMerch. Załóż konto, to jest szybkie i proste.',
      image: this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/landing/account.svg'),
    },
    {
      title: 'Dodaj swoją grafikę na wybrane produkty',
      description: 'Za pomocą naszego kreatora produktów dodaj swoją unikalną grafikę do wybranych produktów.',
      image: this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/landing/drag.svg'),
    },
    {
      title: 'Udostępnij swój sklep',
      description: 'Podziel się swoim sklepem ze swoją społecznością. Sprzedawaj swoje produkty i zdobywaj nowych klientów.',
      image: this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/landing/share.svg'),
    },
    {
      title: 'Zgarniaj kasę za merch',
      description: 'Zarabiaj pieniądze za każdy sprzedany produkt. Monitoruj swoje wyniki i optymalizuj swoją strategię.',
      image: this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/landing/money.svg'),
    },
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}
}
