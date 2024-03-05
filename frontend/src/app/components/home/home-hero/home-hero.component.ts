import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.scss'],
})
export class HomeHeroComponent implements OnInit {
  smallTitle$!: Observable<string>;
  largeTitle$!: Observable<string>;
  subtitle$!: Observable<string>;
  buttonText1$!: Observable<string>;
  buttonText2$!: Observable<string>;

  ngOnInit() {
    this.smallTitle$ = of('Sztuka. Muzyka. Profity.');
    this.largeTitle$ = of('Kreatywność w Twoich rękach - Print on Demand dla Twojego indywidualnego stylu!');
    this.subtitle$ = of(
      'iMerch to platforma do monetyzacji marki dla twórców, artystów, sportowców i NGO, poprzez sprzedaż odzieży, gadżetów i akcesoriów.'
    );
    this.buttonText1$ = of('Dowiedz się więcej');
    this.buttonText2$ = of('Sprawdź nasze plany');
  }
}
