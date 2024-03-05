import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../../services/comment/comment.service';
import { ProductService } from '../../../services/product/product.service';
import { UserService } from '../../../services/user/user.service';
import { Comment } from '../../../interfaces/comment';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs'; // Import this
import { Product } from '../../../interfaces/product'; // Import these
import { User } from '../../../interfaces/user'; // interfaces
import { DomSanitizer } from '@angular/platform-browser';

export interface CombinedData {
  comment: Comment;
  product: Product;
  user: User;
}

@Component({
  selector: 'app-home-comments',
  templateUrl: './home-comments.component.html',
  styleUrls: ['./home-comments.component.scss'],
})
export class HomeCommentsComponent implements OnInit {
  comments: Observable<CombinedData[]> = of([]);

  constructor(
    private commentService: CommentService,
    private productService: ProductService,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  range(value: number): number[] {
    return Array.from({ length: value }, (v, k) => k + 1);
  }



  ngOnInit(): void {
    this.comments = this.commentService.getTopRatedComments().pipe(
      map((comments) => comments.slice(0, 4)), // take only top 4 comments
      switchMap((comments) => {
        return from(
          Promise.all(
            comments.map(async (comment) => {
              const product = await lastValueFrom(this.productService.getProductById(comment.product_id));
              const user = await lastValueFrom(this.userService.getUserById(comment.user_id));
              console.log(comment.createdAt); // add this line to log the date
              const combinedData = { comment, product, user };
              return combinedData;
            })
          )
        );
      }),
      catchError(() => {
        return of([
          {
            comment: {
              _id: '1',
              productId: '1',
              userId: '1',
              text: 'Dummy comment 1',
              rating: 5,
              likes: 10,
              shares: 0,
              status: 'active',
              history: [],
              deletedAt: null,
              isActive: true,
              version: 1,
              created_at: new Date(),
            },
            product: {
              _id: '1',
              name: 'Dummy Product 1',
              description: '',
              designId: '',
              categoryId: '',
              partnerId: '',
              sizes: [],
              colors: [],
              quantity: 0,
              images: [],
              type: '',
              tax: 0,
              price: 0,
              availability: true,
              previewImages: [],
              deletedAt: undefined,
              isActive: true,
              version: 1,
              timestamps: true,
              best: false,
              reviews: [],
            },
            user: {
              firstname: 'Dummy',
              lastname: 'User',
              avatar: this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/landing/avatar.svg'),
              token: 'dummy_token',
            },
          },
          {
            comment: {
              _id: '2',
              productId: '2',
              userId: '2',
              text: 'Dummy comment 2',
              rating: 4,
              likes: 15,
              shares: 2,
              status: 'active',
              history: [],
              deletedAt: null,
              isActive: true,
              version: 2,
              created_at: new Date(),
            },
            product: {
              _id: '2',
              name: 'Dummy Product 2',
              description: 'A second dummy product',
              designId: 'design2',
              categoryId: 'category2',
              partnerId: 'partner2',
              sizes: ['M', 'L'],
              colors: ['red', 'blue'],
              quantity: 50,
              images: ['dummy_image_url_2'],
              type: 'type2',
              tax: 10,
              price: 100,
              availability: true,
              previewImages: ['preview_image_url_2'],
              deletedAt: undefined,
              isActive: true,
              version: 2,
              timestamps: true,
              best: true,
              reviews: [],
            },
            user: {
              firstname: 'Dummy2',
              lastname: 'User2',
              avatar: this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/landing/avatar.svg'),
              token: 'dummy_token_2',
            },
          },
          {
            comment: {
              _id: '3',
              productId: '3',
              userId: '3',
              text: 'Dummy comment 3',
              rating: 3,
              likes: 20,
              shares: 3,
              status: 'active',
              history: [],
              deletedAt: null,
              isActive: true,
              version: 3,
              created_at: new Date(),
            },
            product: {
              _id: '3',
              name: 'Dummy Product 3',
              description: 'A third dummy product',
              designId: 'design3',
              categoryId: 'category3',
              partnerId: 'partner3',
              sizes: ['S', 'M', 'L'],
              colors: ['green', 'blue'],
              quantity: 30,
              images: ['dummy_image_url_3'],
              type: 'type3',
              tax: 15,
              price: 150,
              availability: true,
              previewImages: ['preview_image_url_3'],
              deletedAt: undefined,
              isActive: true,
              version: 3,
              timestamps: true,
              best: false,
              reviews: [],
            },
            user: {
              firstname: 'Dummy3',
              lastname: 'User3',
              avatar: this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/landing/avatar.svg'),
              token: 'dummy_token_3',
            },
          },
          {
            comment: {
              _id: '3',
              productId: '3',
              userId: '3',
              text: 'Dummy comment 3',
              rating: 3,
              likes: 20,
              shares: 3,
              status: 'active',
              history: [],
              deletedAt: null,
              isActive: true,
              version: 3,
              created_at: new Date(),
            },
            product: {
              _id: '3',
              name: 'Dummy Product 3',
              description: 'A third dummy product',
              designId: 'design3',
              categoryId: 'category3',
              partnerId: 'partner3',
              sizes: ['S', 'M', 'L'],
              colors: ['green', 'blue'],
              quantity: 30,
              images: ['dummy_image_url_3'],
              type: 'type3',
              tax: 15,
              price: 150,
              availability: true,
              previewImages: ['preview_image_url_3'],
              deletedAt: undefined,
              isActive: true,
              version: 3,
              timestamps: true,
              best: false,
              reviews: [],
            },
            user: {
              firstname: 'Dummy3',
              lastname: 'User3',
              avatar: this.sanitizer.bypassSecurityTrustResourceUrl('assets/images/landing/avatar.svg'),
              token: 'dummy_token_3',
            },
          },
          // additional dummy data...
        ]) as unknown as Observable<CombinedData[]>;
      })
    );
  }
}
