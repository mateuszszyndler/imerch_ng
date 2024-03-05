import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBenefitsComponent } from './home-benefits.component';

describe('HomeBenefitsComponent', () => {
  let component: HomeBenefitsComponent;
  let fixture: ComponentFixture<HomeBenefitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeBenefitsComponent]
    });
    fixture = TestBed.createComponent(HomeBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
