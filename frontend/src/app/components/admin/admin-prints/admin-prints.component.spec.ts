import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPrintsComponent } from './admin-prints.component';

describe('AdminPrintsComponent', () => {
  let component: AdminPrintsComponent;
  let fixture: ComponentFixture<AdminPrintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPrintsComponent]
    });
    fixture = TestBed.createComponent(AdminPrintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
