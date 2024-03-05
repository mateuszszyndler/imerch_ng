import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductProductsComponent } from './product-products.component';

describe('ProductProductsComponent', () => {
  let component: ProductProductsComponent;
  let fixture: ComponentFixture<ProductProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductProductsComponent]
    });
    fixture = TestBed.createComponent(ProductProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
