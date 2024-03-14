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
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user= new BehaviorSubject<User|undefined>(undefined);

  constructor(private http:HttpClient,private cookieService:CookieService) { }
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
JwtDecoder(token: string){
  const decodedToken: any = jwtDecode(token);
  this.$user.next({
    userType: decodedToken.role,
    fullName: decodedToken.name,
    email: decodedToken.email,
    token: token,
    id:decodedToken.sub,
  });
  
}

  user(){
    return this.$user.asObservable();
  }

  logout():void{
    console.log("user log out");
    localStorage.clear();
    this.cookieService.delete('Authorization','/');
    this.$user.next(undefined);
  }

  
}
