import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerDesignsComponent } from './partner-designs.component';

describe('PartnerDesignsComponent', () => {
  let component: PartnerDesignsComponent;
  let fixture: ComponentFixture<PartnerDesignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerDesignsComponent]
    });
    fixture = TestBed.createComponent(PartnerDesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
