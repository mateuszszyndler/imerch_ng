import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product/product.service';
import { Product } from '../../../interfaces/product';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  @Input() productId: string | null = null;
  @Input() storeId: string | null = null;
  product: Product | undefined;
  currentImageIndex: number = 0;
  activeTab: string = 'description';
  selectedColor: string = '';
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    console.log('ProductDetailsComponent destroyed');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['productId'] &&
      typeof changes['productId'].currentValue === 'string'
    ) {
      this.productId = changes['productId'].currentValue;
      console.log('ProductId changed:', this.productId);
      this.getProduct(this.productId);
    }
  }

  getProduct(productId: string): void {
    console.log('Fetching product:', productId);
    this.productService.getProductById(productId).subscribe({
      next: (product: Product) => {
        this.product = product;
        console.log('Fetched product:', product);

        // Extracting and assigning the storeId from the product
        this.storeId = product.store_id; // or however you access the storeId from the Product object

        this.selectedColor = product.colors[0]; // Set the initial selected color
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }


  previousImage(): void {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
    console.log(this.currentImageIndex);
  }

  nextImage(): void {
    if (
      this.currentImageIndex <
      (this.product?.preview_images?.length ?? 0) - 1
    ) {
      this.currentImageIndex++;
    }
    console.log(this.currentImageIndex);
  }

/*   goBack(): void {
    console.log('Go back', this.productId);
    console.log('Go back', this.storeId);

    if (this.storeId) {
      this.router.navigate(['store', this.storeId]); // navigate to store route
    } else {
      console.error('storeId is null!');
    }
  } */

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  getTotalPrice(): number {
    return this.product ? this.product.price * this.quantity : 0;
  }

  addToWishlist(): void {
    // Implement the API call to add the product to the wishlist
    // using the User Schema
  }

  addToCart(): void {
    // Implement the functionality to add the product to the cart
    // similar to the implementation in the ProductCartComponent
  }
}
