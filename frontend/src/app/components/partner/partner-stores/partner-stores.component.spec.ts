import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerStoresComponent } from './partner-stores.component';

describe('PartnerStoresComponent', () => {
  let component: PartnerStoresComponent;
  let fixture: ComponentFixture<PartnerStoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerStoresComponent]
    });
    fixture = TestBed.createComponent(PartnerStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
