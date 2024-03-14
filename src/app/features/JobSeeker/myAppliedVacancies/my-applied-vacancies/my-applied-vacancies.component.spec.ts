import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppliedVacanciesComponent } from './my-applied-vacancies.component';

describe('MyAppliedVacanciesComponent', () => {
  let component: MyAppliedVacanciesComponent;
  let fixture: ComponentFixture<MyAppliedVacanciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyAppliedVacanciesComponent]
    });
    fixture = TestBed.createComponent(MyAppliedVacanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
