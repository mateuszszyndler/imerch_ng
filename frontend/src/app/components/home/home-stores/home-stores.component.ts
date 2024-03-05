import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '../../../interfaces/store';
import { StoreService } from '../../../services/store/store.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-home-stores',
  templateUrl: './home-stores.component.html',
  styleUrls: ['./home-stores.component.scss']
})
export class HomeStoresComponent implements OnInit, OnDestroy {
  private storesSubject: BehaviorSubject<Store[]> = new BehaviorSubject<Store[]>([]);
  topStores$ = this.storesSubject.asObservable();
  private subscriptions: Subscription[] = [];

  constructor(private storeService: StoreService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getTopStores();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  getTopStores(): void {
    const storeSubscription = this.storeService.getTopStores().pipe(
      map(stores => {
        if (stores) {
          // Sanitize avatar URLs
          stores.forEach(store => {
            if (store.avatar) {
              store.avatar = this.sanitizeImageUrl(store.avatar);
            }
          });
          return stores;
        } else {
          return this.generateMockStores();
        }
      })
    ).subscribe({
      next: stores => {
        this.storesSubject.next(stores);
      },
      error: error => {
        console.error('Error occurred while fetching top stores: ', error);
        this.storesSubject.next(this.generateMockStores());
      }
    });

    this.subscriptions.push(storeSubscription);
  }


  sanitizeImageUrl(url: string): string {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url) as string;
  }

  trackByStoreId(index: number, store: Store): string {
    return store._id;
  }


  generateMockStores(): Store[] {
    let mockStores: Store[] = [];
    for (let i = 0; i < 10; i++) {
      mockStores.push({
        _id: `store_${i}`,
        name: `Store ${i}`,
        avatar: this.sanitizeImageUrl(`assets/images/landing/polaroid.svg`),
        user_id: 'admin',
        is_active: true,
        version: 1,
      });
    }
    return mockStores;
  }
}
