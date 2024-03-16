import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../../../Services/employer.service';
import { ActivatedRoute, Route } from '@angular/router';
import { Vacancy } from '../../models/vacancy.model';
import { VacancyService } from '../../services/vacancy.service';
import { ApplicationResponse } from 'src/app/features/Home/home/models/application-response.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})

export class ApplicationsComponent implements OnInit  {
  vacancyId: string | null = null;
  jobapplications?:ApplicationResponse[];

  constructor(private employerService: EmployerService,private router:ActivatedRoute){ }
  ngOnInit(): void {
    this.router.paramMap.subscribe({
      next: (response) => {
        this.vacancyId = response.get('id');
      }
    });

    if(this.vacancyId){
      this.employerService.getApplicationsByVacancyId(this.vacancyId).subscribe({
       next:(response)=>{
        this.jobapplications=response.response;
        console.log(response);
       }
       
      });
    }
  }
}

//  this.authService.user().subscribe({
//       next:(response)=>{
//       this.user=response;
//       }
//     });
//     if(this.user?.id){
//     this.jobseekerService.getApplicationsByUserId(this.user.id).subscribe({
//       next: (response) => {
//        this.applicationResponses=response;
//       },
//       error: (error) => {
//         console.log(error);
//       }
//     });

//     }
//   }