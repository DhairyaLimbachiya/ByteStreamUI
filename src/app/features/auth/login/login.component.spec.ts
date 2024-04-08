import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { JobseekerService } from '../../JobSeeker/services/jobseeker.service';
import { EmployerService } from '../../Employer/Services/employer.service';
import { of, throwError } from 'rxjs';
import { User } from '../models/user.model';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastSpy: jasmine.SpyObj<NgToastService>;
  let jobseekerServiceSpy: jasmine.SpyObj<JobseekerService>;
  let employerServiceSpy: jasmine.SpyObj<EmployerService>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['user', 'login', 'forgotPassword', 'logout', 'JwtDecoder']);
    cookieServiceSpy = jasmine.createSpyObj('CookieService', ['set', 'deleteAll']);
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    toastSpy = jasmine.createSpyObj('NgToastService', ['error', 'success']);
    jobseekerServiceSpy = jasmine.createSpyObj('JobseekerService', ['']);
    employerServiceSpy = jasmine.createSpyObj('EmployerService', ['']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: CookieService, useValue: cookieServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: NgToastService, useValue: toastSpy },
        { provide: JobseekerService, useValue: jobseekerServiceSpy },
        { provide: EmployerService, useValue: employerServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should login successfully', () => {
    const response = { token: 'sampleToken' };
    authServiceSpy.login.and.returnValue(of(response));
    authServiceSpy.JwtDecoder.and.returnValue();

    component.loginForm.setValue({ userName: 'testUser', password: 'testPassword' });
    component.onFormSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith(component.model);
   
  
    expect(authServiceSpy.JwtDecoder).toHaveBeenCalledWith(response.token);
  });

  it('should handle login error', () => {
    const errorResponse = { error: { text: 'Login failed' } };
    authServiceSpy.login.and.returnValue(throwError(errorResponse));

    component.loginForm.setValue({ userName: 'testUser', password: 'testPassword' });
    component.onFormSubmit();

    expect(authServiceSpy.login).toHaveBeenCalledWith(component.model);
    expect(cookieServiceSpy.set).not.toHaveBeenCalled();
    expect(authServiceSpy.JwtDecoder).not.toHaveBeenCalled();
    expect(toastSpy.error).toHaveBeenCalledWith({
      detail: 'Error',
      summary: errorResponse.error.text,
      position: 'topRight',
    });
  });

});