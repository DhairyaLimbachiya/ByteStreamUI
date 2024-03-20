import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Route, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { FormBuilder, Validators } from '@angular/forms';
import { Toast } from 'primeng/toast';
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
  jobseeker?: JobSeeker;
  employer?: Employer;
  profileMade?: boolean=true;
  model: LoginRequest = {
    userName: '',
    password: '',
  };
  loginForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  forgotPasswordForm = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private authservice: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private fb: FormBuilder,
    private toast: NgToastService,
    private jobseekerService: JobseekerService,
    private employerService: EmployerService
  ) { }
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
        //set AuthCookieresponse
        this.cookieService.set(
          'Authorization',
          `Bearer ${response.token}`,
          undefined,
          '/',
          undefined,
          true,
          'Strict'
        );

        this.authservice.JwtDecoder(response.token);

        if (this.user?.id &&this.user.userType.includes("JobSeeker")) {
          this.jobseekerService.getJobSeeker(this.user?.id).subscribe({
            next:(response)=>{
              this.profileMade=true
             this.router.navigateByUrl('/home');

            },
            error:(error)=>{
              this.profileMade=false;
              if(!this.profileMade){
                this.router.navigateByUrl('/Jobseeker/jobseeker/add');
          
              }
           
              }
          
          });
        }
        if (this.user?.id &&this.user.userType.includes("Employer")) {
          this.employerService.getEmployer().subscribe({
            next:(response)=>{
              this.profileMade=true
             this.router.navigateByUrl('/home');

            },
            error:(error)=>{
              this.profileMade=false;
              if(!this.profileMade){
                this.router.navigateByUrl('/Employer/employer/add');
              console.log(this.user);
              }
           
              }
          
          });
        
         
        }

      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  onForgotPasswordSubmit(): void {
    this.model = {
      userName: this.forgotPasswordForm.get('userName')?.value || '',
      password: this.forgotPasswordForm.get('password')?.value || '',
    };
    this.authservice.forgotPassword(this.model).subscribe({
      next: (response) => { },
      complete: () => {
        this.toast.success({
          detail: '',
          summary: 'Password Updated Succesfully',
          position: 'topRight',
        });
      },
    });
  }

  onLogout(): void {
    this.authservice.logout();
    localStorage.clear;
    this.cookieService.deleteAll;
    this.router.navigateByUrl('/');
  }
}
