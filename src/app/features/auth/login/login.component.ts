import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { JobseekerService } from '../../JobSeeker/services/jobseeker.service';
import { EmployerService } from '../../Employer/Services/employer.service';
import { User } from '../models/user.model';
import { JobSeeker } from '../../JobSeeker/model/JobSeeker.model';
import { Employer } from '../../Employer/model/Employer.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user?: User;
  profileMade: boolean = false;
  model: LoginRequest = {
    userName: '',
    password: '',
  };
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;

  constructor(
    private authservice: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService,
    private jobseekerService: JobseekerService,
    private employerService: EmployerService
  ) {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.forgotPasswordForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authservice.user().subscribe({
      next: (response) => {
        this.user = response;
      },
    });
  }

  onFormSubmit(): void {
    this.model = {
      userName: this.loginForm.get('userName')?.value || '',
      password: this.loginForm.get('password')?.value || '',
    };

    this.authservice.login(this.model).subscribe({
      next: (response) => {
        console.log(response)

        this.handleLoginResponse(response.token);
      },
      error: (error) => {
        this.toast.error({
          detail: 'Error',
          summary: error.error,
          position: 'topRight',
        });
      },
    });
  }

  handleLoginResponse(token: string): void {
    this.cookieService.set('Authorization', `Bearer ${token}`, undefined, '/', undefined, true, 'Strict');
    // this.authservice.JwtDecoder(token);
    this.authservice.user().subscribe((data)=> this.user=data);

   console.log(this.user)
    if (this.user?.id && this.user.userType.includes('JobSeeker')) {
      this.checkJobSeekerProfile();
    }

    if (this.user?.id && this.user.userType.includes('Employer')) {
      this.checkEmployerProfile();
    }
  }

  checkJobSeekerProfile(): void {
    if(this.user?.id){
    this.jobseekerService.getJobSeeker(this.user?.id).subscribe({
      next: (response) => {
        if(response){
        
        this.navigateToHome();
        }
        else{
          this.router.navigateByUrl('/Jobseeker/jobseeker/add');

        }
      },
    
    
    });
  }
  }

  checkEmployerProfile(): void {
    this.employerService.getEmployer().subscribe({
      next: (response) => {
        if (response){
        this.navigateToHome();
        }
        else{
          this.router.navigateByUrl('/Employer/employer/add');
        }
      },
     
      
    });
  }

  navigateToHome(): void {
    this.router.navigateByUrl('/home');
  }

  onForgotPasswordSubmit(): void {
    this.model = {
      userName: this.forgotPasswordForm.get('userName')?.value || '',
      password: this.forgotPasswordForm.get('password')?.value || '',
    };
    this.authservice.forgotPassword(this.model).subscribe({
      next: (response) => {},
      complete: () => {
        this.toast.success({
          detail: '',
          summary: 'Password Updated Successfully',
          position: 'topRight',
        });
      },
      error: (error) => {
        this.toast.error({
          detail: 'Error',
          summary: error.error,
          position: 'topRight',
        });
      },
    });
  }

  onLogout(): void {
    this.authservice.logout();
    localStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigateByUrl('/');
  }
}
