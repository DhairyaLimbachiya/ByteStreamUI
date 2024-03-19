import { Component, OnInit, mergeApplicationConfig } from '@angular/core';
import { Vacancy } from '../models/vacancy.model';
import { VacancyService } from '../services/vacancy.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EmployerService } from '../../Services/employer.service';

@Component({
  selector: 'app-vacancy-detail',
  templateUrl: './vacancy-detail.component.html',
  styleUrls: ['./vacancy-detail.component.css']
})

export class VacancyDetailComponent implements OnInit {
  vacancy: Vacancy = {} as Vacancy;
profileMade?:boolean;

  vacancies?: Vacancy[];
  constructor(private vacancyService: VacancyService, private router: Router, private toast: NgToastService,private employerService:EmployerService) {

  }
  ngOnInit(): void {
    this.vacancyService.getAllCompanyVacancy().subscribe({
      next: (response) => {
        this.vacancies = response
      }
    });
  }
  VacancyDelete(id: string) {
    this.vacancyService.deletevacancy(id).subscribe({
      next: (response) => {
        this.vacancies = this.vacancies?.filter((vac) => vac.id != id);
        console.log(response);
        this.toast.warning({ detail: "", summary: 'Vacancy Deleted Succesfully', position: 'topRight' });
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

checkProfile(){


 this.employerService.getEmployer().subscribe({
  error:(error)=>{
    this.profileMade=false;
    if(!this.profileMade){
 this.toast.warning({detail:"warning",summary:'Kindly create your profile adding any Vacancy'})
 this.router.navigateByUrl('/Employer/employer/add');
    }
    else{
      this.router.navigateByUrl('/Vacancy/vacancy/add');
    }
  } 
}); 

}
  onEditInitHandler(id: string) {

    this.vacancyService.getvacancyById(id).subscribe({
      next: (data) => {
        this.vacancy = this.vacancies?.find((x) => x.id == id) || {} as Vacancy;
      }
    });
  }
  UpdateVacancy() {
    this.vacancyService.updateVacancy(this.vacancy).subscribe({

      next: (response) => {
        console.log(response);
      },
      complete: () => {
        this.toast.success({ detail: "", summary: 'Vacancy Edited Succesfully', position: 'topRight' });

      }
    });


  }
}
