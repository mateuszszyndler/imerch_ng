import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerFooterComponent } from './partner-footer.component';

describe('PartnerFooterComponent', () => {
  let component: PartnerFooterComponent;
  let fixture: ComponentFixture<PartnerFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerFooterComponent]
    });
    fixture = TestBed.createComponent(PartnerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
