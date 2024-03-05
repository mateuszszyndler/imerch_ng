import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../interfaces/product';
import { Observable, BehaviorSubject, combineLatest, of } from 'rxjs';
import {
  catchError,
  map,
  startWith,
  switchMap,
  tap,
  shareReplay,
} from 'rxjs/operators';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-store-products',
  templateUrl: './store-products.component.html',
  styleUrls: ['./store-products.component.scss'],
  animations: [
    trigger('expandFilters', [
      state('collapsed', style({ height: '0', opacity: '0' })),
      state('expanded', style({ height: '*', opacity: '1' })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})
export class StoreProductsComponent implements OnInit {
  products$!: Observable<Product[]>;
  filteredProducts$!: Observable<Product[]>;
  filterForm!: FormGroup;

  @Input() storeId: string | null = null;

  categories: string[] = [];
  types: string[] = [];
  sizes: string[] = [];
  colors: string[] = [];

  initialMinPrice!: number;
  initialMaxPrice!: number;

  uniqueCategories: string[] = [];
  uniqueTypes: string[] = [];
  uniqueSizes: string[] = [];
  uniqueColors: string[] = [];

  showAllFilters: { [key: string]: boolean } = {
    categories: false,
    types: false,
    sizes: false,
    colors: false,
  };

  selectedProductId: string | null = null;

  public filterNamesMapping: { [key: string]: string } = {
    categories: 'Kategorie',
    types: 'Typy',
    sizes: 'Rozmiary',
    colors: 'Kolory',
  };

  filterChips: any[] = [];

  uniqueMap: { [key: string]: string[] } = {
    categories: this.uniqueCategories,
    types: this.uniqueTypes,
    sizes: this.uniqueSizes,
    colors: this.uniqueColors,
  };

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      search: '',
      categories: this.fb.array([]),
      types: this.fb.array([]),
      sizes: this.fb.array([]),
      colors: this.fb.array([]),
      minPrice: [null],
      maxPrice: [null],
    });




    if (this.storeId) {
      console.log('storeId StoreProductsComponent:', this.storeId);
      this.loadProductsByStoreId();
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['storeId'] && !changes['storeId'].firstChange) {
      this.loadProductsByStoreId();
    }
  }

  private loadProductsByStoreId(): void {
    if (this.storeId) {  // This will ensure storeId is not null
        console.log('StoreProductsComponent storeId:', this.storeId);
        this.productService.getProductsByStoreId(this.storeId).subscribe((products) => {
            console.log('Returned products:', products);
        });
    } else {
        console.warn('Store ID is null');
    }


    this.products$ = (
      this.storeId ? this.productService.getProductsByStoreId(this.storeId) : of([])
    ).pipe(
      catchError((err) => {
        console.error(err);
        return of([]); // Return an empty array on error
      }),
      shareReplay(1)
    );

    this.products$.subscribe((products) => {
      this.uniqueCategories = Array.from(
        new Set(products.map((p) => p.category))
      );
      this.uniqueTypes = Array.from(new Set(products.map((p) => p.type)));
      this.uniqueSizes = Array.from(new Set(products.flatMap((p) => p.sizes)));
      this.uniqueColors = Array.from(
        new Set(products.flatMap((p) => p.colors))
      );

      this.addCheckboxControls(this.uniqueCategories, 'categories');
      this.addCheckboxControls(this.uniqueTypes, 'types');
      this.addCheckboxControls(this.uniqueSizes, 'sizes');
      this.addCheckboxControls(this.uniqueColors, 'colors');
      this.initialMinPrice = Math.min(...products.map((p) => p.price));
      this.initialMaxPrice = Math.max(...products.map((p) => p.price));

      this.filterForm.get('minPrice')?.setValue(this.initialMinPrice);
      this.filterForm.get('maxPrice')?.setValue(this.initialMaxPrice);

      // Update uniqueMap with the updated values
      this.uniqueMap = {
        categories: this.uniqueCategories,
        types: this.uniqueTypes,
        sizes: this.uniqueSizes,
        colors: this.uniqueColors,
      };
    });

    this.filteredProducts$ = combineLatest([
      this.products$,
      this.filterForm.valueChanges.pipe(startWith(this.filterForm.value)),
    ]).pipe(
      map(([products, filterValues]) =>
        this.applyFilters(products, filterValues)
      )
    );
}


  getFormArray(name: string): FormArray {
    return this.filterForm.get(name) as FormArray;
  }

  toggleShowMore(filter: string): void {
    this.showAllFilters[filter] = !this.showAllFilters[filter];
  }

  clearAllFilters(): void {
    this.filterForm.reset({
      search: '',
      categories: this.getFormArray('categories').value.map(() => false),
      types: this.getFormArray('types').value.map(() => false),
      sizes: this.getFormArray('sizes').value.map(() => false),
      colors: this.getFormArray('colors').value.map(() => false),
      minPrice: this.initialMinPrice,
      maxPrice: this.initialMaxPrice,
    });
    this.filterChips = [];
  }

  showProductDetails(productId: string): void {
    this.selectedProductId = productId;
    console.log('productId:', this.selectedProductId);
  }


  clearFilter(key: string, index: number): void {
    (this.filterForm.get(key) as FormArray).controls[index].setValue(false);
    this.filterChips = this.filterChips.filter(
      (chip) => !(chip.key === key && chip.index === index)
    );
  }

  private addCheckboxControls(values: string[], name: string): void {
    const formArray = this.getFormArray(name);
    values.forEach(() => formArray.push(new FormControl(false)));
  }

  private applyFilters(products: Product[], filterValues: any): Product[] {
    this.filterChips = []; // Reset every time filters are applied

    if (this.areAllFiltersCleared(filterValues)) {
      return products;
    }
    const { search, categories, types, sizes, colors, minPrice, maxPrice } =
      filterValues;
    const arraysToCheck = [categories, types, sizes, colors];
    const keysToCheck = ['categories', 'types', 'sizes', 'colors'];

    for (let i = 0; i < arraysToCheck.length; i++) {
      arraysToCheck[i].forEach((value: boolean, index: number) => {
        if (value) {
          this.filterChips.push({
            label: this.uniqueMap[keysToCheck[i]][index],
            key: keysToCheck[i],
            index: index,
          });
        }
      });
    }

    return products.filter((product) => {
      if (
        search &&
        !(
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
        )
      ) {
        return false;
      }

      if (
        !this.checkFilter(product.category, categories, this.uniqueCategories)
      ) {
        return false;
      }

      if (!this.checkFilter(product.type, types, this.uniqueTypes)) {
        return false;
      }

      if (
        !this.checkMultiSelectFilter(product.sizes, sizes, this.uniqueSizes)
      ) {
        return false;
      }

      if (
        !this.checkMultiSelectFilter(product.colors, colors, this.uniqueColors)
      ) {
        return false;
      }

      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }

      return true;
    });
  }

  private areAllFiltersCleared(filterValues: any): boolean {
    const { search, categories, types, sizes, colors, minPrice, maxPrice } =
      filterValues;

    const hasAnyFilterApplied =
      search ||
      categories.some((f: boolean) => f) ||
      types.some((f: boolean) => f) ||
      sizes.some((f: boolean) => f) ||
      colors.some((f: boolean) => f) ||
      minPrice !== this.initialMinPrice ||
      maxPrice !== this.initialMaxPrice;

    return !hasAnyFilterApplied;
  }

  private checkFilter(
    value: string,
    filterArray: boolean[],
    valueArray: string[]
  ): boolean {
    return (
      filterArray.every((filter) => !filter) ||
      filterArray.some((filter, index) => filter && value === valueArray[index])
    );
  }

  private checkMultiSelectFilter(
    values: string[],
    filterArray: boolean[],
    valueArray: string[]
  ): boolean {
    return (
      filterArray.every((filter) => !filter) ||
      filterArray.some(
        (filter, index) => filter && values.includes(valueArray[index])
      )
    );
  }
}

