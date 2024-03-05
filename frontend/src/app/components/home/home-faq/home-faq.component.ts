// home-faq.component.ts

import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { FaqService } from '../../../services/faq/faq.service';
import { Faq } from '../../../interfaces/faq';

@Component({
  selector: 'app-home-faq',
  templateUrl: './home-faq.component.html',
  styleUrls: ['./home-faq.component.scss'],
})
export class HomeFaqComponent implements OnInit {
  faqs!: Observable<Faq[]>;
  expandedIndex = 0;

  constructor(private faqService: FaqService) {}

  ngOnInit(): void {
    this.faqs = this.faqService.getAllFaqs().pipe(
      switchMap((faqs) => {
        if (faqs.length === 0) {
          return this.getDefaultFaqs();
        } else {
          return of(faqs);
        }
      }),
      catchError((error) => {
        console.error(error);
        return this.getDefaultFaqs();
      })
    );
  }

  getDefaultFaqs(): Observable<Faq[]> {
    const defaultFaqs: Faq[] = [
      {
        _id: null,
        question: 'Jak mogę założyć konto na iMerch?',
        answer:
          'Kliknij przycisk "Zarejestruj się" na naszej stronie głównej, a następnie postępuj zgodnie z instrukcjami. Będziesz musiał podać podstawowe informacje, takie jak imię, nazwisko, adres e-mail i hasło.',
        deletedAt: null,
        isActive: true,
        version: 1,
      },
      {
        _id: null,
        question: 'Czy mogę sprzedawać swoje produkty na iMerch?',
        answer:
          'Tak, iMerch jest platformą, która umożliwia artystom sprzedaż swoich produktów. Możesz dodać swoją unikalną grafikę do wybranych produktów i sprzedawać je w swoim sklepie.',
        deletedAt: null,
        isActive: true,
        version: 1,
      },
      {
        _id: null,
        question: 'Jak mogę dodać nowy produkt do mojego sklepu?',
        answer:
          'Po zalogowaniu się do swojego konta, przejdź do sekcji "Moje produkty" i kliknij przycisk "Dodaj nowy produkt". Następnie postępuj zgodnie z instrukcjami, aby dodać swoją grafikę i opis produktu.',
        deletedAt: null,
        isActive: true,
        version: 1,
      },
      {
        _id: null,
        question: 'Czy mogę zarabiać na sprzedaży swoich produktów na iMerch?',
        answer:
          'Tak, zarabiasz pieniądze za każdy sprzedany produkt w swoim sklepie iMerch. Monitoruj swoje wyniki i optymalizuj swoją strategię, aby zwiększyć swoje przychody.',
        deletedAt: null,
        isActive: true,
        version: 1,
      },
      {
        _id: null,
        question: 'Jak mogę promować swój sklep iMerch?',
        answer:
          'Podziel się linkiem do swojego sklepu iMerch ze swoją społecznością na mediach społecznościowych, na swojej stronie internetowej, blogu, czy w e-mailach. Im więcej osób odwiedzi twój sklep, tym więcej szans na sprzedaż swoich produktów.',
        deletedAt: null,
        isActive: true,
        version: 1,
      },
      {
        _id: null,
        question: 'Czy mogę śledzić sprzedaż moich produktów na iMerch?',
        answer:
          'Tak, w panelu użytkownika masz dostęp do szczegółowych informacji o sprzedaży, takich jak liczba sprzedanych produktów, przychody i wiele więcej.',
        deletedAt: null,
        isActive: true,
        version: 1,
      },
      {
        _id: null,
        question: 'Jak mogę skontaktować się z obsługą klienta iMerch?',
        answer:
          'Jeśli masz jakiekolwiek pytania lub problemy, możesz skontaktować się z nami za pośrednictwem formularza kontaktowego na naszej stronie, lub wysłać e-mail na adres pomoc@imerch.pl. Jesteśmy tu, aby pomóc!',
        deletedAt: null,
        isActive: true,
        version: 1,
      },
    ];

    return of(defaultFaqs);
  }
}
