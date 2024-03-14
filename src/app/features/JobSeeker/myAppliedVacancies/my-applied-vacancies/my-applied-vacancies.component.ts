import { Component, OnInit } from '@angular/core';
import { ApplicationResponse } from 'src/app/features/Home/home/models/application-response.model';
import { JobseekerService } from '../../services/jobseeker.service';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { EmployerService } from 'src/app/features/Employer/Services/employer.service';
import { VacancyService } from 'src/app/features/Employer/vacancy/services/vacancy.service';
import { Vacancy } from 'src/app/features/Employer/vacancy/models/vacancy.model';
import { Employer } from 'src/app/features/Employer/model/Employer.model';

@Component({
  selector: 'app-my-applied-vacancies',
  templateUrl: './my-applied-vacancies.component.html',
  styleUrls: ['./my-applied-vacancies.component.css']
})
export class MyAppliedVacanciesComponent implements OnInit{
  user?:User;
  applicationResponse:ApplicationResponse={}as ApplicationResponse;
  applicationResponses?: ApplicationResponse[];
  vacancies?:Vacancy[];
  vacancy :Vacancy={} as Vacancy;

  employer:Employer={}as Employer;
  constructor(private jobseekerService: JobseekerService,private authService:AuthService,private vacancyService:VacancyService){
    
  }

  ngOnInit(): void {
 
    this.authService.user().subscribe({
      next:(response)=>{
      this.user=response;
      }
    });
    if(this.user?.id){
    this.jobseekerService.getApplicationsByUserId(this.user.id).subscribe({
      next: (response) => {
       this.applicationResponses=response;
      },
      error: (error) => {
        console.log(error);
      }
    });

    }
  }

  OnModelOpen(name:string,id:string){
    
    this.vacancyService.getvacancyById(id).subscribe({
      next:(data)=>{
        this.vacancy = this.vacancies?.find((x) => x.id == id) || {} as Vacancy;
        console.log(data);
      }
  
    });
      
  }
  

}
