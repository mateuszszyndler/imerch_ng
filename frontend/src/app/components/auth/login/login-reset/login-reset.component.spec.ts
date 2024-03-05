import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginResetComponent } from './login-reset.component';

describe('LoginResetComponent', () => {
  let component: LoginResetComponent;
  let fixture: ComponentFixture<LoginResetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginResetComponent]
    });
    fixture = TestBed.createComponent(LoginResetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
