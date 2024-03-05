import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportHistoryComponent } from './support-history.component';

describe('SupportHistoryComponent', () => {
  let component: SupportHistoryComponent;
  let fixture: ComponentFixture<SupportHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportHistoryComponent]
    });
    fixture = TestBed.createComponent(SupportHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
