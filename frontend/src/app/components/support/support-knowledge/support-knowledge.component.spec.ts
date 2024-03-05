import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportKnowledgeComponent } from './support-knowledge.component';

describe('SupportKnowledgeComponent', () => {
  let component: SupportKnowledgeComponent;
  let fixture: ComponentFixture<SupportKnowledgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportKnowledgeComponent]
    });
    fixture = TestBed.createComponent(SupportKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
