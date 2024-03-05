import { Component, OnInit } from '@angular/core';
import { SubscriptionService } from '../../../services/subscription/subscription.service';
import { Subscription } from '../../../interfaces/subscription';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-home-plans',
  templateUrl: './home-plans.component.html',
  styleUrls: ['./home-plans.component.scss'],
})
export class HomePlansComponent implements OnInit {
  subscriptions$: Observable<Subscription[]> | undefined;

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit() {
    this.subscriptions$ = this.subscriptionService.getAllSubscriptions().pipe(
      map((subscriptions) => {
        if (subscriptions && subscriptions.length < 0) {
          return subscriptions.filter(
            (subscription) =>
              subscription.type !== 'client' && subscription.is_active !== true
          );
        } else {
          return this.generateMockSubscriptions();
        }
      }),
      catchError((error) => {
        console.error(error);
        return of(this.generateMockSubscriptions());
      })
    );
  }

  calculateAnnualPrice(monthlyPrice: number, discount: number): number {
    return monthlyPrice * 12 * (1 - discount / 100);
  }

  generateMockSubscriptions(): Subscription[] {
    return [
      {
        _id: '1',
        name: 'Basic',
        description: 'Basic subscription description',
        type: 'basic',
        price: 9.99,
        discount: 10,
        configuration: [],
        features: ['feature 1', 'feature 2'],
        benefits: ['benefit 1', 'benefit 2'],
        is_active: true,
        version: 1,
      },
      {
        _id: '2',
        name: 'Pro',
        description: 'Pro subscription description',
        type: 'pro',
        price: 19.99,
        discount: 20,
        configuration: [],
        features: ['feature 1', 'feature 2', 'feature 3'],
        benefits: ['benefit 1', 'benefit 2', 'benefit 3'],
        is_active: true,
        version: 1,
      },
      {
        _id: '3',
        name: 'VIP',
        description: 'VIP subscription description',
        type: 'vip',
        price: 29.99,
        discount: 30,
        configuration: [],
        features: ['feature 1', 'feature 2', 'feature 3', 'feature 4'],
        benefits: ['benefit 1', 'benefit 2', 'benefit 3', 'benefit 4'],
        is_active: true,
        version: 1,
      },
    ];
  }
}
