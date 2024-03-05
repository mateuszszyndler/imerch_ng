import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDesignsComponent } from './product-designs.component';

describe('ProductDesignsComponent', () => {
  let component: ProductDesignsComponent;
  let fixture: ComponentFixture<ProductDesignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDesignsComponent]
    });
    fixture = TestBed.createComponent(ProductDesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
