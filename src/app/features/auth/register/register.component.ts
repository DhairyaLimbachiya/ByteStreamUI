import { Component } from '@angular/core';
import { RegisterRequest } from '../models/register-request.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model:RegisterRequest;
  constructor(private authservice:AuthService,
    private cookieService:CookieService,private router:Router){
    this.model={
      fullName:'',
      email:'',
      phoneNumber:'',
      password:'',
      userType:''
    };
  }
  onFormSubmit():void{
    this.authservice.register(this.model).subscribe({
      next:(response)=>{
        console.log(response);
        this.router.navigateByUrl('/login');
      },
      error:(error)=>{
        console.log(error);
      }
    
    });
  }
}
