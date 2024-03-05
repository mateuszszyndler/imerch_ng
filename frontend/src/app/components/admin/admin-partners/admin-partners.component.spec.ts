import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPartnersComponent } from './admin-partners.component';

describe('AdminPartnersComponent', () => {
  let component: AdminPartnersComponent;
  let fixture: ComponentFixture<AdminPartnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPartnersComponent]
    });
    fixture = TestBed.createComponent(AdminPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
