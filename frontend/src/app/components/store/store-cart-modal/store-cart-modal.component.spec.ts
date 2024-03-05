import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCartModalComponent } from './store-cart-modal.component';

describe('StoreCartModalComponent', () => {
  let component: StoreCartModalComponent;
  let fixture: ComponentFixture<StoreCartModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreCartModalComponent]
    });
    fixture = TestBed.createComponent(StoreCartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
