import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerReportsComponent } from './partner-reports.component';

describe('PartnerReportsComponent', () => {
  let component: PartnerReportsComponent;
  let fixture: ComponentFixture<PartnerReportsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerReportsComponent]
    });
    fixture = TestBed.createComponent(PartnerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
