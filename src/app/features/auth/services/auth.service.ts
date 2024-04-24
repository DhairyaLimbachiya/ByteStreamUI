import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment.development';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from '../models/register-request.model';
import { RegisterResponse } from '../models/register-response';
import { SignalrHubService } from '../../Home/demo-services.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user= new BehaviorSubject<User|undefined>(undefined);


  constructor(private http:HttpClient,private cookieService:CookieService,    private demoservice:SignalrHubService,    private router: Router,

  ) { }
  login(request:LoginRequest):Observable<LoginResponse>{
  return  this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/login`,{
      userName:request.userName,
      password:request.password   
    });
  }
  register(request:RegisterRequest):Observable<RegisterResponse>{
    return  this.http.post<RegisterResponse>(`${environment.apiBaseUrl}/api/auth/register`,{
        email:request.email,
        password:request.password,
        phonenumber:request.phoneNumber,
        userType:request.userType,
        fullName:request.fullName
      });
    }
    forgotPassword(request:LoginRequest):Observable<LoginResponse>{
      return  this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/auth/forgotpassword`,{
        userName:request.userName,
        password:request.password
        
      });
    }
JwtDecoder(){
  const Token:any =this.cookieService.get('Authorization');
  if(Token){
  const actual:any = Token.replace('Bearer ',"")

  const decodedToken: any = jwtDecode(actual);
  
  this.$user.next({
    userType: decodedToken.role,
    fullName: decodedToken.name,
    email: decodedToken.email,
    token: actual,
    id:decodedToken.sub,
  });
  }
}

  user(){
    this.JwtDecoder();
    return this.$user.asObservable();
  }

  logout():void{
    this.router.navigateByUrl('/auth/login');
    localStorage.clear();
    this.cookieService.delete('Authorization','/');
    this.$user.next(undefined);
    this.demoservice.stopConnection();
  

  }

  
}
