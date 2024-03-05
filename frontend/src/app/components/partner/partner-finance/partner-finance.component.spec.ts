import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerFinanceComponent } from './partner-finance.component';

describe('PartnerFinanceComponent', () => {
  let component: PartnerFinanceComponent;
  let fixture: ComponentFixture<PartnerFinanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerFinanceComponent]
    });
    fixture = TestBed.createComponent(PartnerFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
