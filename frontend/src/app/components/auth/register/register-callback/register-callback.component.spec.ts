import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCallbackComponent } from './register-callback.component';

describe('RegisterCallbackComponent', () => {
  let component: RegisterCallbackComponent;
  let fixture: ComponentFixture<RegisterCallbackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterCallbackComponent]
    });
    fixture = TestBed.createComponent(RegisterCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
