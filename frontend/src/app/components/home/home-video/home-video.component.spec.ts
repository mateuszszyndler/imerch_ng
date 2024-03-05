import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeVideoComponent } from './home-video.component';

describe('HomeVideoComponent', () => {
  let component: HomeVideoComponent;
  let fixture: ComponentFixture<HomeVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeVideoComponent]
    });
    fixture = TestBed.createComponent(HomeVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
