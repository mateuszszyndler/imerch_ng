import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  map,
  of,
  take,
} from 'rxjs';
import { Product } from './../../../interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [
    trigger('simpleFadeAnimation', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(600)]),
      transition(':leave', animate(600, style({ opacity: 0 }))),
    ]),
    trigger('cardHover', [
      state('initial', style({ transform: 'scale(1)' })),
      state('hovering', style({ transform: 'scale(1)' })),
      transition('* => hovering', animate('300ms ease-in')),
      transition('hovering => *', animate('300ms ease-out')),
    ]),
    trigger('imageHover', [
      state('initial', style({
        transform: 'scaleX(1) scaleY(1)',
        transformOrigin: 'top left',
        filter: 'grayscale(0.5)'
      })),
      state('hovered', style({
        transform: 'scaleX(1.1) scaleY(1.1)',
        transformOrigin: 'top left',
        filter: 'grayscale(0)'
      })),
      transition('initial <=> hovered', animate('300ms ease-in-out'))
    ]),



  ],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Output() cardClick = new EventEmitter<string>();
  @Output() share = new EventEmitter<string>();
  @Output() addToWishlist = new EventEmitter<string>();
  @Output() selectColor = new EventEmitter<string>();
  @Output() selectSize = new EventEmitter<string>();
  @Output() showDetails = new EventEmitter<string>();
  @Output() addToCart = new EventEmitter<string>();

  selectedColor$: BehaviorSubject<string> = new BehaviorSubject('');

  selectedSize$: Subject<string> = new Subject();

  isWishlist: boolean = false;

  cardState = 'initial';

  currentImageIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  currentImage$!: Observable<string>;

  constructor(private router: Router) {}
  ngOnInit() {
    console.log(this.product);
    this.currentImage$ = combineLatest([
      this.currentImageIndex$,
      of(this.product?.preview_images || []),
    ]).pipe(
      map(([currentIndex, preview_images]) => preview_images[currentIndex])
    );
  }

  public isImageHovered: boolean = false;



  onShare() {
    this.share.emit(this.product._id);
  }

  onAddToWishlist() {
    this.isWishlist = !this.isWishlist;
    this.addToWishlist.emit(this.product._id);
  }

  onSelectColor(color: string) {
    if (this.selectedColor$.value === color) {
      this.selectedColor$.next(''); // deselect if the color is already selected
    } else {
      this.selectedColor$.next(color); // select the color if it's not already selected
    }
    this.selectColor.emit(color);
  }

  onSelectSize(event: Event) {
    const element = event.target as HTMLSelectElement;
    this.selectedSize$.next(element.value);
    this.selectSize.emit(element.value);
  }

  onCardClick() {
    this.cardClick.emit(this.product._id);
  }
  onAddToCart() {
    this.addToCart.emit(this.product._id);
  }

  onNextImage() {
    console.log('Next button clicked');
    this.currentImageIndex$
      .pipe(
        take(1),
        map((currentIndex) => {
          const nextIndex = currentIndex + 1;
          return nextIndex < (this.product?.preview_images?.length || 0)
            ? nextIndex
            : 0;
        })
      )
      .subscribe((nextIndex) => this.currentImageIndex$.next(nextIndex));
  }

  onPreviousImage() {
    console.log('Previous button clicked');
    this.currentImageIndex$
      .pipe(
        take(1),
        map((currentIndex) => {
          const previousIndex = currentIndex - 1;
          return previousIndex >= 0
            ? previousIndex
            : (this.product?.preview_images?.length || 0) - 1;
        })
      )
      .subscribe((prevIndex) => this.currentImageIndex$.next(prevIndex));
  }
}

