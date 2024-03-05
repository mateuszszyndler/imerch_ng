import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerOrdersComponent } from './partner-orders.component';

describe('PartnerOrdersComponent', () => {
  let component: PartnerOrdersComponent;
  let fixture: ComponentFixture<PartnerOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerOrdersComponent]
    });
    fixture = TestBed.createComponent(PartnerOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
