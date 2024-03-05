import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStoresComponent } from './home-stores.component';

describe('HomeStoresComponent', () => {
  let component: HomeStoresComponent;
  let fixture: ComponentFixture<HomeStoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeStoresComponent]
    });
    fixture = TestBed.createComponent(HomeStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
