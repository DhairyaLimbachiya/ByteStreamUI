import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../Services/employer.service';
import { AddEmployer } from '../model/add-Employer.model';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employer',
  templateUrl: './add-employer.component.html',
  styleUrls: ['./add-employer.component.css']
})
export class AddEmployerComponent {
/**
 *
 */
model:AddEmployer={} as AddEmployer;
constructor(private employerService:EmployerService,private router:Router,private toast:NgToastService,private fb:FormBuilder) {

}
addCompanyForm = this.fb.group({
  organization: ['', Validators.required],
  organizationType: ['', Validators.required],
  companyEmail: ['', Validators.required],
  companyPhone: ['', Validators.minLength(10)],
  noOfEmployees: [1, Validators.min(1)],
  startYear: new FormControl(2024, [Validators.min(1900), Validators.max(2024)]),
  about: ['', Validators.minLength(50)],
});
onFormSubmit(): void {
  this.model = {
    organization: this.addCompanyForm.get('organization')?.value || '',
    organizationType: this.addCompanyForm.get('organizationType')?.value || '',
    companyEmail: this.addCompanyForm.get('companyEmail')?.value || '',
    companyPhone: this.addCompanyForm.get('companyPhone')?.value || '',
    noOfEmployees: this.addCompanyForm.get('noOfEmployees')?.value || 1,
    startYear: this.addCompanyForm.get('startYear')?.value || 2024,
    about: this.addCompanyForm.get('about')?.value || '',
  }
  
    this.employerService.addEmployer(this.model).subscribe({
      next:(response)=>{
        this.router.navigateByUrl('/Employer/profile');
        this.toast.success({detail:"",summary:'Company Profile added Succesfully', position: 'topRight'}); 

      }
    });
  }

}
