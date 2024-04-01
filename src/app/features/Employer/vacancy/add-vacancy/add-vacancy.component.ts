import { Component } from '@angular/core';
import { AddVacancy } from '../models/addvacancy.model';
import { VacancyService } from '../services/vacancy.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-vacancy',
  templateUrl: './add-vacancy.component.html',
  styleUrls: ['./add-vacancy.component.css']
})

export class AddVacancyComponent {
  addvacancy : AddVacancy ={}as AddVacancy 


constructor( private vacancyService :VacancyService ,private router :Router, private toast: NgToastService,private fb:FormBuilder) { 
}
addVacancyForm = this.fb.group({
  noOfVacancies: [0, Validators.min(1)],
  minimumQualification: ['', Validators.required],
  jobTitle: ['', Validators.required],
  jobDescription: ['', Validators.minLength(50)],
  experienceRequired: ['', Validators.required],
  minimumSalary: [0, Validators.min(1)],
  maximumSalary: [0, Validators.min(1)],
});
onFormSubmit():void{
  this.addvacancy = {
    jobTitle: this.addVacancyForm.get('jobTitle')?.value || '',
    noOfVacancies: this.addVacancyForm.get('noOfVacancies')?.value || 0,
    minimumQualification: this.addVacancyForm.get('minimumQualification')?.value || '',
    jobDescription: this.addVacancyForm.get('jobDescription')?.value || '',
    experienceRequired: this.addVacancyForm.get('experienceRequired')?.value || '',
    minSalary: this.addVacancyForm.get('minimumSalary')?.value || 1,
    maxSalary: this.addVacancyForm.get('maximumSalary')?.value || 1,
    publishedBy: this.addvacancy.publishedBy,
    lastDate: this.addvacancy.lastDate,  
  }
  this.vacancyService.createVacancy(this.addvacancy)
.subscribe({
  next:(response)=>{
  this.router.navigateByUrl('/Vacancy/vacancy');
  this.toast.success({detail:"",summary:'vacancy Created Successfully'});
  }, 

});
}
}
