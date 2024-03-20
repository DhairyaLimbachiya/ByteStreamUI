import { Component, OnInit, mergeApplicationConfig } from '@angular/core';
import { Vacancy } from '../models/vacancy.model';
import { VacancyService } from '../services/vacancy.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { EmployerService } from '../../Services/employer.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-vacancy-detail',
  templateUrl: './vacancy-detail.component.html',
  styleUrls: ['./vacancy-detail.component.css']
})

export class VacancyDetailComponent implements OnInit {
  vacancy: Vacancy  = {} as Vacancy ;
profileMade?:boolean;

  vacancies?: Vacancy[];
  constructor(private vacancyService: VacancyService, private router: Router, private toast: NgToastService,private employerService:EmployerService, private fb: FormBuilder) {
  }
  editVacancyForm = this.fb.group({
    noOfVacancies: [0, Validators.min(1)],
    minimumQualification: ['', Validators.required],
    jobTitle: ['', Validators.required],
    jobDescription: new FormControl('', [Validators.minLength(50), Validators.required]),
    experienceRequired: ['', Validators.required],
    minSalary: [new FormControl(0, [Validators.min(1), Validators.required])],
    maxSalary: [new FormControl(0, [Validators.min(1), Validators.required])],
  });

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
  next:()=>{
    this.router.navigateByUrl('/Vacancy/vacancy/add');
  },
  error:(error)=>{
    this.profileMade=false;
    if(!this.profileMade){
 this.toast.warning({detail:"warning",summary:'Kindly create your profile adding any Vacancy'})
 this.router.navigateByUrl('/Employer/employer/add');
    }

  } 
}); 

}
  onEditInitHandler(id: string) {

    this.vacancyService.getvacancyById(id).subscribe({
      next: (data) => {
        this.vacancy = this.vacancies?.find((x) => x.id == id) || {} as Vacancy;
        this.editVacancyForm.setValue({
          noOfVacancies: this.vacancy.noOfVacancies,
          minimumQualification: this.vacancy.minimumQualification,
          jobTitle: this.vacancy.jobTitle,
          jobDescription: this.vacancy.jobDescription,
          experienceRequired: this.vacancy.experienceRequired,
          minSalary: this.vacancy.minSalary,
          maxSalary: this.vacancy.maxSalary
        })
      }
    });
  }
  UpdateVacancy() {
    this.vacancy = {
      id:this.vacancy.id,
      jobTitle: this.editVacancyForm.get('jobTitle')?.value || this.vacancy.jobTitle,
      noOfVacancies: this.editVacancyForm.get('noOfVacancies')?.value || this.vacancy.noOfVacancies,
      minimumQualification: this.editVacancyForm.get('minimumQualification')?.value || this.vacancy.minimumQualification,
      jobDescription: this.editVacancyForm.get('jobDescription')?.value || this.vacancy.jobDescription,
      experienceRequired: this.editVacancyForm.get('experienceRequired')?.value || this.vacancy.experienceRequired,
      minSalary: this.editVacancyForm.get('minSalary')?.value || this.vacancy.minSalary,
      maxSalary: this.editVacancyForm.get('maxSalary')?.value || this.vacancy.maxSalary,
      publishedBy: this.vacancy.publishedBy,
      lastDate: this.vacancy.lastDate,
    
    }
    this.vacancyService.updateVacancy(this.vacancy).subscribe({

      next: (response) => {
      
        this.vacancies = this.vacancies?.filter((x) => x.id !== this.vacancy.id) || [];
        this.vacancies?.push(this.vacancy);
        
      },
      complete: () => {
        this.toast.success({ detail: "", summary: 'Vacancy Edited Succesfully', position: 'topRight' });
        this.router.navigateByUrl('/Vacancy/vacancy');

      }
    });


  }
}
