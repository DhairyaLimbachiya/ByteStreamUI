import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualificationDetailComponent } from './qualification-detail.component';

describe('QualificationDetailComponent', () => {
  let component: QualificationDetailComponent;
  let fixture: ComponentFixture<QualificationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QualificationDetailComponent]
    });
    fixture = TestBed.createComponent(QualificationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
