import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCommentsComponent } from './home-comments.component';

describe('HomeCommentsComponent', () => {
  let component: HomeCommentsComponent;
  let fixture: ComponentFixture<HomeCommentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeCommentsComponent]
    });
    fixture = TestBed.createComponent(HomeCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
