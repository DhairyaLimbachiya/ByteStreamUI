import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../Services/employer.service';
import { Employer } from '../model/Employer.model';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-employer-details',
  templateUrl: './employer-details.component.html',
  styleUrls: ['./employer-details.component.css']
})
export class EmployerDetailsComponent implements OnInit {
/**
 *
 */
employer:Employer={}as Employer;
flag:boolean=false;
constructor(private employerService:EmployerService,private router:Router, private toast: NgToastService) {
  
}
  ngOnInit(): void {
    
    
      this.employerService.getEmployer().subscribe({
        next:(response)=>{
          this.employer=response;
        },
        error:()=>{
        this.flag=true;
        }
        
      })
  }
  onFormSubmit(): void {
     console.log(this.employer);
   
      this.employerService.updateEmployer(this.employer).subscribe({
      
        next:(response)=>{
          console.log(response);
          this.router.navigateByUrl('/employer');
        },
        complete:()=>{
          
            this.toast.success({detail:"",summary:'Profile Updated Successfully'});
          
        }
      });
    }

}
