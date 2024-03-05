import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPredefinedComponent } from './product-predefined.component';

describe('ProductPredefinedComponent', () => {
  let component: ProductPredefinedComponent;
  let fixture: ComponentFixture<ProductPredefinedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductPredefinedComponent]
    });
    fixture = TestBed.createComponent(ProductPredefinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
