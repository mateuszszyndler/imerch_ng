// store.component.ts

import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store/store.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, pluck, tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  storeId: string | null = null;
  storeName: string | null = null;
  themeId: string | null = null;

  constructor(private storeService: StoreService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(
      map((params: Params) => params['storeName']),
      switchMap(storeName => {
        this.storeName = storeName;
        return this.storeService.getStoresByField('alias', storeName);
      }),
      tap(stores => {
        if (stores.length > 0) {
          this.storeId = stores[0]._id; // Assume the first one is the one we want
          this.themeId = stores[0].theme_id ?? null; // If theme_id is undefined, it will assign null.
          console.log('Store ID: ', this.storeId);
          // Rest of your logic...
        } else {
          // Handle the case when the store is not found...
        }
      })
    ).subscribe();
  }

}
