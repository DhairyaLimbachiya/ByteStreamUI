import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobSeeker } from 'src/app/features/JobSeeker/model/JobSeeker.model';
import { JobseekerService } from 'src/app/features/JobSeeker/services/jobseeker.service';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  user?:User;
  jobseeker:JobSeeker={}as JobSeeker;

  constructor(private authService: AuthService,
    private router: Router) {
  }
  
  ngOnInit(): void {


    
    this.authService.user().subscribe({
      next:(response)=>{
      this.user=response;
      }
    })
  

  }
    onLogout(): void {
      this.authService.logout();
      this.router.navigateByUrl('/');
    }
  
  }