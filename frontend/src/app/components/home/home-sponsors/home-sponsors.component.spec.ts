import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSponsorsComponent } from './home-sponsors.component';

describe('HomeSponsorsComponent', () => {
  let component: HomeSponsorsComponent;
  let fixture: ComponentFixture<HomeSponsorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeSponsorsComponent]
    });
    fixture = TestBed.createComponent(HomeSponsorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
