import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDesignerComponent } from './product-designer.component';

describe('ProductDesignerComponent', () => {
  let component: ProductDesignerComponent;
  let fixture: ComponentFixture<ProductDesignerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDesignerComponent]
    });
    fixture = TestBed.createComponent(ProductDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
