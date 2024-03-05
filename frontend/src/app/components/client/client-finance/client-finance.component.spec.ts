import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientFinanceComponent } from './client-finance.component';

describe('ClientFinanceComponent', () => {
  let component: ClientFinanceComponent;
  let fixture: ComponentFixture<ClientFinanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientFinanceComponent]
    });
    fixture = TestBed.createComponent(ClientFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
