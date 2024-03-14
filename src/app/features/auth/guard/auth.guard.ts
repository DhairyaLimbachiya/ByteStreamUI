import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

import { AuthService } from '../services/auth.service';
import { NgToastModule, NgToastService } from 'ng-angular-popup';

export const authGuard: CanActivateFn = (route, state) => {

  const cookieService = inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
 const toast=inject(NgToastService)
 // const user = authService.getUser();

  let token = cookieService.get('Authorization');
  if(token ){
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwtDecode(token);
    const userRoles: string[] = decodedToken.role;
    const expDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();
 
    if(expDate < currentTime){
      authService.logout();
      toast.error({detail:"Error",summary:'unAuthorized access', position: 'topRight'})
      return router.createUrlTree(['/login'], { queryParams: {returnUrl: state.url} });
    }
    else{
      if(userRoles.includes("Employer") || userRoles.includes("JobSeeker")){
        return true;
      }
     
      cookieService.deleteAll;
      authService.logout();
      toast.error({detail:"Error",summary:'unAuthorized access', position: 'topRight'})
      return false;
    }
  }
  else{
    toast.error({detail:"Error",summary:'unAuthorized access', position: 'topRight'})
    //alert("UnAuthorized");
    
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: {returnUrl: state.url} });
  }
};