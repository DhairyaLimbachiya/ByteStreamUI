import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgToastService } from 'ng-angular-popup';
import { of } from 'rxjs';
import { EmployerService } from '../Services/employer.service';
import { EmployerDetailsComponent } from './employer-details.component';

describe('EmployerDetailsComponent', () => {
  let component: EmployerDetailsComponent;
  let fixture: ComponentFixture<EmployerDetailsComponent>;
  let employerServiceSpy: jasmine.SpyObj<EmployerService>;
  let toastServiceSpy: jasmine.SpyObj<NgToastService>;

  const mockEmployer = {
    id: '1',
    organization: 'Test Organization',
    organizationType: 'Test Type',
    companyEmail: 'test@example.com',
    companyPhone: '1234567890',
    noOfEmployees: 10,
    startYear: 2020,
    about: 'Test about',
    profileImageUrl: 'test-image-url',
  };
  const updatedEmployer = {
    id: '1',
    organization: 'Updated Organization',
    organizationType: 'Updated Type',
    companyEmail: 'updated@example.com',
    companyPhone: '9876543210',
    noOfEmployees: 20,
    startYear: 2021,
    about: 'Updated about',
    profileImageUrl: 'updated-image-url',
  };
  beforeEach(waitForAsync(() => {
    const employerServiceSpyObj = jasmine.createSpyObj('EmployerService', [
      'getEmployer',
      'uploadImage',
      'updateEmployer',
    ]);
    const toastServiceSpyObj = jasmine.createSpyObj('NgToastService', ['success']);

    TestBed.configureTestingModule({
      declarations: [EmployerDetailsComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: EmployerService, useValue: employerServiceSpyObj },
        { provide: NgToastService, useValue: toastServiceSpyObj },
      ],
    }).compileComponents();

    employerServiceSpy = TestBed.inject(EmployerService) as jasmine.SpyObj<EmployerService>;
    toastServiceSpy = TestBed.inject(NgToastService) as jasmine.SpyObj<NgToastService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch employer details on init', () => {
 
    employerServiceSpy.getEmployer.and.returnValue(of(mockEmployer));
    component.ngOnInit();
    expect(employerServiceSpy.getEmployer).toHaveBeenCalled();
    expect(component.employer).toEqual(mockEmployer);
  });

  it('should update employer details on form submit', () => {
   
    component.employer = updatedEmployer;
    component.file = new File([''], 'test.jpg');
    spyOn(component, 'updateProfile').and.stub();
    component.onFormSubmit();
    expect(component.updateProfile).toHaveBeenCalled();
    expect(employerServiceSpy.uploadImage).toHaveBeenCalledWith(component.file, updatedEmployer.id);
  });

  it('should update employer profile', () => {

    employerServiceSpy.updateEmployer.and.returnValue(of(updatedEmployer));
    component.employer = updatedEmployer;
    component.updateProfile();
    expect(employerServiceSpy.updateEmployer).toHaveBeenCalledWith(updatedEmployer);
    expect(component.employer).toEqual(updatedEmployer);
    expect(toastServiceSpy.success).toHaveBeenCalled();
  });

  it('should handle file upload change', () => {
    const testFile = new File([''], 'test.jpg');
    const event = {
      currentTarget: {
        files: [testFile],
      },
    } as unknown as Event;
    component.onFileUploadChange(event);
    expect(component.file).toEqual(testFile);
  });
});