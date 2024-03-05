import { Component, OnInit } from '@angular/core';
import { Observable, of, timer, Subscription } from 'rxjs';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../interfaces/product';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home-gallery',
  templateUrl: './home-gallery.component.html',
  styleUrls: ['./home-gallery.component.scss']
})
export class HomeGalleryComponent implements OnInit {
  products$: Observable<Product[]> | undefined;
  currentSlide: number = 0;
  slideSubscription: Subscription | undefined;
  sanitizedImages: SafeResourceUrl[] = [];
  mockupProducts: Product[] = [
    {
      _id: '1',
      name: 'Mock Product 1',
      description: 'Mock Description 1',
      design_id: '1',
      category: '1',
      store_id: '1',
      predefined_id: '1',
      rating: 5,
      comments: [],
      sizes: [],
      colors: [],
      quantity: 1,
      images: ['mock_image1_url'],
      type: 'tshirt',
      tax: 5,
      price: 25,
      availability: true,
      preview_images: ['assets/images/mockup/tshirt.png'],
      deletedAt: undefined,
      isActive: true,
      version: 1,
      timestamps: true,
      best: true,
    },
    {
      _id: '2',
      name: 'Mock Product 2',
      description: 'Mock Description 2',
      design_id: '2',
      category: '2',
      store_id: '2',
      predefined_id: '2',
      rating: 5,
      comments: [],
      sizes: [],
      colors: [],
      quantity: 1,
      images: ['mock_image2_url'],
      type: 'mug',
      tax: 5,
      price: 25,
      availability: true,
      preview_images: ['assets/images/mockup/mug.png'],
      deletedAt: undefined,
      isActive: true,
      version: 1,
      timestamps: true,
      best: true,
    },
    {
      _id: '3',
      name: 'Mock Product 3',
      description: 'Mock Description 3',
      design_id: '3',
      category: '3',
      store_id: '3',
      predefined_id: '3',
      rating: 5,
      comments: [],
      sizes: [],
      colors: [],
      quantity: 1,
      images: ['mock_image3_url'],
      type: 'tshirt',
      tax: 5,
      price: 25,
      availability: true,
      preview_images: ['assets/images/mockup/tshirt.png'],
      deletedAt: undefined,
      isActive: true,
      version: 1,
      timestamps: true,
      best: true,
    },
    {
      _id: '4',
      name: 'Mock Product 4',
      description: 'Mock Description 4',
      design_id: '4',
      category: '4',
      store_id: '4',
      predefined_id: '4',
      rating: 5,
      comments: [],
      sizes: [],
      colors: [],
      quantity: 1,
      images: ['mock_image4_url'],
      type: 'mug',
      tax: 5,
      price: 25,
      availability: true,
      preview_images: ['assets/images/mockup/mug.png'],
      deletedAt: undefined,
      isActive: true,
      version: 1,
      timestamps: true,
      best: true,
    },
    {
      _id: '5',
      name: 'Mock Product 5',
      description: 'Mock Description 5',
      design_id: '5',
      category: '5',
      store_id: '5',
      predefined_id: '5',
      rating: 5,
      comments: [],
      sizes: [],
      colors: [],
      quantity: 1,
      images: ['mock_image5_url'],
      type: 'tshirt',
      tax: 5,
      price: 25,
      availability: true,
      preview_images: ['assets/images/mockup/tshirt.png'],
      deletedAt: undefined,
      isActive: true,
      version: 1,
      timestamps: true,
      best: true,
    },
    {
      _id: '6',
      name: 'Mock Product 6',
      description: 'Mock Description 6',
      design_id: '6',
      category: '6',
      store_id: '6',
      predefined_id: '6',
      rating: 5,
      comments: [],
      sizes: [],
      colors: [],
      quantity: 1,
      images: ['mock_image6_url'],
      type: 'mug',
      tax: 5,
      price: 25,
      availability: true,
      preview_images: ['assets/images/mockup/mug.png'],
      deletedAt: undefined,
      isActive: true,
      version: 1,
      timestamps: true,
      best: true,
    },
    {
      _id: '7',
      name: 'Mock Product 7',
      description: 'Mock Description 7',
      design_id: '7',
      category: '7',
      store_id: '7',
      predefined_id: '7',
      rating: 5,
      comments: [],
      sizes: [],
      colors: [],
      quantity: 1,
      images: ['mock_image7_url'],
      type: 'tshirt',
      tax: 5,
      price: 25,
      availability: true,
      preview_images: ['assets/images/mockup/tshirt.png'],
      deletedAt: undefined,
         isActive: true,
      version: 1,
      timestamps: true,
      best: true,
    },
    {
      _id: '8',
      name: 'Mock Product 8',
      description: 'Mock Description 8',
      design_id: '8',
      category: '8',
      store_id: '8',
      predefined_id: '8',
      rating: 5,
      comments: [],
      sizes: [],
      colors: [],
      quantity: 1,
      images: ['mock_image8_url'],
      type: 'mug',
      tax: 5,
      price: 25,
      availability: true,
      preview_images: ['assets/images/mockup/mug.png'],
      deletedAt: undefined,
      isActive: true,
      version: 1,
      timestamps: true,
      best: true,
    },
    {
      _id: '9',
      name: 'Mock Product 9',
      description: 'Mock Description 9',
      design_id: '9',
      category: '9',
      store_id: '9',
      predefined_id: '9',
      rating: 5,
      comments: [],
      sizes: [],
      colors: [],
      quantity: 1,
      images: ['mock_image9_url'],
      type: 'mug',
      tax: 5,
      price: 25,
      availability: true,
      preview_images: ['assets/images/mockup/mug.png'],
      deletedAt: undefined,
      isActive: true,
      version: 1,
      timestamps: true,
      best: true,
    }
  ];

  mockupProductsWithSanitizedImages: { product: Product, sanitizedPreviewImages: SafeResourceUrl[] }[] = [];

  constructor(private productService: ProductService, private router: Router, private sanitizer: DomSanitizer) {
    this.mockupProductsWithSanitizedImages = this.mockupProducts.map(product => ({
      product,
      sanitizedPreviewImages: product.preview_images.map(image => this.sanitizer.bypassSecurityTrustResourceUrl(image))
    }));
  }

  ngOnInit(): void {
    this.products$ = this.productService.getBestProducts().pipe(
      catchError(err => {
        console.error(err);
        return of(this.mockupProducts);
      })
    );
    this.products$.subscribe(products => {
      //console.log('Products:', products);
    });

    this.slideSubscription = timer(0, 3000).subscribe(_ => this.nextSlide());
  }

  ngOnDestroy(): void {
    if (this.slideSubscription) {
      this.slideSubscription.unsubscribe();
    }
  }

  navigateToProductDetails(productId: string) {
    this.router.navigate(['/product', 'details', productId]);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.mockupProducts.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.mockupProducts.length) % this.mockupProducts.length;
  }
}
