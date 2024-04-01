import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddJobSeekerComponent } from './add-job-seeker.component';
import { FormBuilder } from '@angular/forms';
import { JobseekerService } from '../services/jobseeker.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../auth/services/auth.service';
import { of } from 'rxjs';

describe('AddJobSeekerComponent', () => {
  let component: AddJobSeekerComponent;
  let fixture: ComponentFixture<AddJobSeekerComponent>;
  let jobseekerService: jasmine.SpyObj<JobseekerService>;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const jobseekerServiceSpy = jasmine.createSpyObj('JobseekerService', ['uploadResume', 'uploadImage', 'addJobSeeker']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['user']);

    await TestBed.configureTestingModule({
      declarations: [ AddJobSeekerComponent ],
      providers: [
        { provide: JobseekerService, useValue: jobseekerServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
        FormBuilder,
        NgToastService
      ]
    }).compileComponents();

    jobseekerService = TestBed.inject(JobseekerService) as jasmine.SpyObj<JobseekerService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set this.file when onFileUploadChange is called', () => {
    // Arrange
    const testFile = new File(['file content'], 'filename.txt');
    const event = { currentTarget: { files: [testFile] } } as unknown as Event;

    // Act
    component.onFileUploadChange(event);

    // Assert
    expect(component.file).toBeDefined();
    expect(component.file).toBe(testFile);
  });

  // Add more test cases as needed...
});