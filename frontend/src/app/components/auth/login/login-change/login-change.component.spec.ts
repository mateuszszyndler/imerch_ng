import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginChangeComponent } from './login-change.component';

describe('LoginChangeComponent', () => {
  let component: LoginChangeComponent;
  let fixture: ComponentFixture<LoginChangeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginChangeComponent]
    });
    fixture = TestBed.createComponent(LoginChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
