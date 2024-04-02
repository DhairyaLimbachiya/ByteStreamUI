import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { LoginRequest } from '../models/login-request.model';
import { LoginResponse } from '../models/login-response';
import { User } from '../models/user.model';
import { RegisterRequest } from '../models/register-request.model';
import { RegisterResponse } from '../models/register-response';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/enviroments/enviroment.development';

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, CookieService]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send login request', () => {
    const mockRequest: LoginRequest = { userName: 'testuser', password: 'testpassword' };
    const mockResponse: LoginResponse = { token: 'mockToken' };

    service.login(mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should send register request', () => {
    const mockRequest: RegisterRequest = { email: 'test@example.com', password: 'testpassword', phoneNumber: '1234567890', userType: 'user', fullName: 'Test User' };
    const mockResponse: RegisterResponse = { Result: {}, IsSuccess: true, Message: 'User registered successfully' };
    service.register(mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/auth/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should send forgot password request', () => {
    const mockRequest: LoginRequest = { userName: 'testuser', password: 'testpassword' };
    const mockResponse: LoginResponse = { token: 'mockToken' };

    service.forgotPassword(mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.apiBaseUrl}/api/auth/forgotpassword`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should set user observable', () => {
    const mockUser: User = {
      userType: ['user'],
      fullName: 'Test User',
      email: 'test@example.com',
      token: 'mockToken',
      id: '1'
    };

    service.$user.next(mockUser);

    service.user().subscribe(user => {
      expect(user).toEqual(mockUser);
    });
  });

  it('should clear user data on logout', () => {
    const mockUser: User = {
      userType: ['user'],
      fullName: 'Test User',
      email: 'test@example.com',
      token: 'mockToken',
      id: '1'
    };

    service.$user.next(mockUser);

    service.logout();

    expect(service.$user.getValue()).toBeUndefined();
  });

});