import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDesignsComponent } from './admin-designs.component';

describe('AdminDesignsComponent', () => {
  let component: AdminDesignsComponent;
  let fixture: ComponentFixture<AdminDesignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDesignsComponent]
    });
    fixture = TestBed.createComponent(AdminDesignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
