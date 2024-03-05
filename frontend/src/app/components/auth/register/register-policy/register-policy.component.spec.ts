import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPolicyComponent } from './register-policy.component';

describe('RegisterPolicyComponent', () => {
  let component: RegisterPolicyComponent;
  let fixture: ComponentFixture<RegisterPolicyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPolicyComponent]
    });
    fixture = TestBed.createComponent(RegisterPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
