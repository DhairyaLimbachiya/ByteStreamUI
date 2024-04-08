import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../Services/employer.service';
import { AddEmployer } from '../model/add-Employer.model';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';
import { Observable } from 'rxjs';
import { Response } from '../../JobSeeker/model/response-model';

@Component({
  selector: 'app-add-employer',
  templateUrl: './add-employer.component.html',
  styleUrls: ['./add-employer.component.css']
})
export class AddEmployerComponent {
/**
 *
 */
model$?:Observable<AddEmployer>
model:AddEmployer={} as AddEmployer;
file?: File;
profileimageFlag: boolean = false;
user?:User
user$?:Observable<User>
response$?:Observable<Response>
constructor(private employerService:EmployerService,private router:Router,private toast:NgToastService,private fb:FormBuilder,private authService:AuthService) {
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
    profileImageUrl:this.model.profileImageUrl
  }
  this.uploadImage();
}


  uploadImage(): void{
    if (this.file && this.response$ ) {
      this.profileimageFlag = false;
      
     this.response$= this.employerService.uploadImage(this.file, this.model.organization);
   this.response$.subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.model.profileImageUrl = response.result;
            this.addProfile();
          }
        },
     
      });
    }
    else{
      this.profileimageFlag = true;
    }
  }

  addProfile(): void{
if(this.model$){
  this.model$=  this.employerService.addEmployer(this.model);
  this.model$.subscribe({
      next: (response) => {
          this.router.navigateByUrl('/Employer/profile');
      
      },
     
    });
  }
  }
  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }
  }