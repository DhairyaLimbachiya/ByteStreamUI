import { Component } from '@angular/core';
import { RegisterRequest } from '../models/register-request.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model:RegisterRequest;
  roles = ['  JobSeeker', 'Employer']
  constructor(private authservice:AuthService,
    private cookieService:CookieService,private router:Router, private fb: FormBuilder){
    this.model={
      fullName:'',
      email:'',
      phoneNumber:'',
      password:'',
      userType:''
    };
  }
  registerForm = this.fb.group({
    fullName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneNumber: new FormControl('', [ Validators.minLength(10),Validators.maxLength(10), Validators.required ]),
    email: ['', Validators.required],
    password: new FormControl('', [ Validators.minLength(6), Validators.required ]),
    selectedRole: ['', Validators.required]
  })
  onFormSubmit():void{
    this.model = {
      fullName: this.registerForm.get('fullName')?.value || '',
      phoneNumber: this.registerForm.get('phoneNumber')?.value || '',
      email: this.registerForm.get('email')?.value || '',
      userType: this.registerForm.get('selectedRole')?.value || '',
      password: this.registerForm.get('password')?.value || '',
    };
    
    this.authservice.register(this.model).subscribe({
      next:(response)=>{
        console.log(response);
        this.router.navigateByUrl('/auth/login');
      },
      error:(error)=>{
        console.log(error);
      }
    
    });
  }
}
