import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPredefinedComponent } from './admin-predefined.component';

describe('AdminPredefinedComponent', () => {
  let component: AdminPredefinedComponent;
  let fixture: ComponentFixture<AdminPredefinedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPredefinedComponent]
    });
    fixture = TestBed.createComponent(AdminPredefinedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
