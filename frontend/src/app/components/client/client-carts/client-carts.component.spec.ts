import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCartsComponent } from './client-carts.component';

describe('ClientCartsComponent', () => {
  let component: ClientCartsComponent;
  let fixture: ComponentFixture<ClientCartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientCartsComponent]
    });
    fixture = TestBed.createComponent(ClientCartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
