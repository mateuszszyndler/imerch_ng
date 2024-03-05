import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerThemesComponent } from './partner-themes.component';

describe('PartnerThemesComponent', () => {
  let component: PartnerThemesComponent;
  let fixture: ComponentFixture<PartnerThemesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerThemesComponent]
    });
    fixture = TestBed.createComponent(PartnerThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
