import { Component } from '@angular/core';
import { Vacancy } from '../../Employer/vacancy/models/vacancy.model';
import { VacancyService } from '../../Employer/vacancy/services/vacancy.service';
import { EmployerService } from '../../Employer/Services/employer.service';
import { Employer } from '../../Employer/model/Employer.model';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';
import { HomeService } from '../service/home.service';
import { ApplyRequest } from './models/application-request.model';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  vacancies?:Vacancy[];
  vacancyDetail :Vacancy={} as Vacancy;
  //test:Vacancy={} as Vacancy;
  employer:Employer={}as Employer;
  user?:User;
  applyRequest:ApplyRequest={} as ApplyRequest;
constructor(private vacancyService:VacancyService,private employerService:EmployerService,private authService:AuthService,private homeservice:HomeService ,private router:Router,private toast:NgToastService){}
ngOnInit(): void {
  this.vacancyService.getAllVacancy().subscribe({
    next: (response) => {
      this.vacancies = response
    }
  });

  this.authService.user().subscribe({
    next:(response)=>{
    this.user=response;
    }
  })

}

OnModelOpen(name:string,id:string){
  this.employerService.getcomapnyByName(name).subscribe({
    next:(response)=>{
      this.employer=response;
    }
  }),
  this.vacancyService.getvacancyById(id).subscribe({
    next:(data)=>{
      this.vacancyDetail = this.vacancies?.find((x) => x.id == id) || {} as Vacancy;
    //  this.test = this.vacancies?.find((x) => x.id == id) || {} as Vacancy;
   this.vacancyDetail.alreadyApplied=data.alreadyApplied
    //console.log(this.vacancy)
   // console.log(this.test);
    }
  });

    
}

ApplyVacancy(){
this.applyRequest.vacancyId=this.vacancyDetail.id;
if(this.user?.id){
 this.applyRequest.userId= this.user.id;
}
  this.applyRequest.appliedDate=new Date();
  this.homeservice.apply(this.applyRequest).subscribe({
next:(ApplyRequest)=>{

  this.toast.success({detail:"Success",summary:'Applied Successfully'})
},
error:(error)=>{
  console.log(this.applyRequest);
}
  });
}

}

