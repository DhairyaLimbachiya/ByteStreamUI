import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EmployerService } from '../Services/employer.service';
import { Employer } from '../model/Employer.model';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddEmployer } from '../model/add-Employer.model';
import { Observable } from 'rxjs';
import { Response } from '../../JobSeeker/model/response-model';

@Component({
  selector: 'app-employer-details',
  templateUrl: './employer-details.component.html',
  styleUrls: ['./employer-details.component.css']
})
export class EmployerDetailsComponent implements OnInit {
/**
 *
 */
employer$?:Observable<Employer> ;
employer:Employer={} as Employer;
flag:boolean=false;
file?:File;
response$?:Observable<Response>;
constructor(private employerService:EmployerService, private toast: NgToastService, private fb: FormBuilder, private changeDetector: ChangeDetectorRef) {
 
} 

editCompanyForm = this.fb.group({
  organization: ['', Validators.required],
  organizationType: ['', Validators.required],
  companyEmail: ['', Validators.required],
  companyPhone: ['', Validators.minLength(10)],
  noOfEmployees: [1, Validators.min(1)],
  startYear: new FormControl(2024, [Validators.min(1800), Validators.max(2024), Validators.required]),
  about: ['', Validators.minLength(50)],
});

  ngOnInit(): void {

       this.employerService.getEmployer().subscribe({
        next:(response)=>{
          this.employer=response;
          this.editCompanyForm.setValue({
            organization: this.employer.organization,
            organizationType: this.employer.organizationType,
            companyPhone: this.employer.companyPhone,
            companyEmail: this.employer.companyEmail,
            noOfEmployees: this.employer.noOfEmployees,
            startYear: this.employer.startYear,
            about: this.employer.about,
          })
        },
        error:()=>{
        this.flag=true;
        }
      })
  
}
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  onFormSubmit(): void {
    this.employer = {
      id:this.employer.id,
      organization: this.editCompanyForm.get('organization')?.value || this.employer.organization,
      organizationType: this.editCompanyForm.get('organizationType')?.value || this.employer.organizationType,
      companyEmail: this.editCompanyForm.get('companyEmail')?.value || this.employer.companyEmail,
      companyPhone: this.editCompanyForm.get('companyPhone')?.value || this.employer.companyPhone,
      noOfEmployees: this.editCompanyForm.get('noOfEmployees')?.value || this.employer.noOfEmployees,
      startYear: this.editCompanyForm.get('startYear')?.value || this.employer.startYear,
      about: this.editCompanyForm.get('about')?.value || this.employer.about,
      profileImageUrl:this.employer.profileImageUrl
    }
    if (this.file) {
     this.employerService.uploadImage(this.file, this.employer.organization).subscribe({
        next: (response) => {
            this.employer.profileImageUrl = response.result;
        },
        complete:()=>{
          this.updateProfile();
        }
      });
  }
  else{
    this.updateProfile();
  }
}

updateProfile(): void{
  this.employerService.updateEmployer(this.employer).subscribe({
    next: (response) => {
    this.employer=response
          },
          complete:()=>{
            this.toast.success({detail:"",summary:'Profile Updated Successfully'});
            window.location.reload();

          }
        }); 
}


  
onFileUploadChange(event: Event): void {
  const element = event.currentTarget as HTMLInputElement;
  this.file = element.files?.[0];
}

}
