
import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-home-benefits',
  templateUrl: './home-benefits.component.html',
  styleUrls: ['./home-benefits.component.scss']
})
export class HomeBenefitsComponent implements OnInit {
  title = "Jak możemy pomóc Twojej twórczości i biznesowi?";
  subtitle = "Odkryj korzyści z naszej platformy skierowanej do twórców. Wzrost Twojej firmy to nasz priorytet.";
  benefits = [
    {image: this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/landing/performance.svg'), title: 'Zwiększ swoją widoczność', desc: 'Wykorzystaj naszą platformę do promocji swoich produktów i zwiększenia zasięgu.'},
    {image: this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/landing/support.svg'), title: 'Bezproblemowa obsługa', desc: 'Nasza platforma jest prosta w obsłudze, a proces zamówienia jest szybki i łatwy.'},
    {image: this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/landing/payment.svg'), title: 'Zarabiaj więcej', desc: 'Zarabiaj więcej na swojej kreatywności sprzedając produkty przez naszą platformę.'},
    {image: this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/landing/building.svg'), title: 'Zaspokój swoją kreatywność', desc: 'Zrealizuj swoje kreatywne pomysły z pomocą naszych narzędzi do tworzenia produktów.'},
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}
}


