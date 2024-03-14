import { Component, OnInit } from '@angular/core';
import { AddJobSeeker } from '../model/add-JobSeeker.model';
import { JobseekerService } from '../services/jobseeker.service';
import { Router } from '@angular/router';
import { JobSeeker } from '../model/JobSeeker.model';
import { Subscription } from 'rxjs';
import { Toast } from 'primeng/toast';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-job-seeker',
  templateUrl: './add-job-seeker.component.html',
  styleUrls: ['./add-job-seeker.component.css']
})
export class AddJobSeekerComponent implements OnInit {
  user?:User;
  model:JobSeeker={} as JobSeeker;
  file?:File;
  addProfileSubscription$?: Subscription;
  constructor(private jobseekerService:JobseekerService,private router:Router,private toast:NgToastService,private authService:AuthService,private fb:FormBuilder) {
  }
  addProfileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: ['', Validators.minLength(10)],
    address: ['', Validators.required],
    expectedSalary: [0, Validators.required],
    totalExperience: [0, Validators.required],
  }); 
  ngOnInit(): void {
    this.authService.user().subscribe({
      next:(response)=>{
      this.user=response;  
      }
    })
  }
 
  onFormSubmit(): void {
    this.model = {
      id: this.model.id,
      firstName: this.addProfileForm.get('firstName')?.value || '',
      lastName: this.addProfileForm.get('lastName')?.value || '',
      phone: this.addProfileForm.get('phone')?.value || '',
      address: this.addProfileForm.get('address')?.value || '',
      email: this.model.email,
      expectedSalary: this.addProfileForm.get('expectedSalary')?.value || 0,
      totalExperience: this.addProfileForm.get('totalExperience')?.value || 0,
      dob: this.model.dob,
      resumeURL: this.model.resumeURL,
    }
    if(this.file && this.user?.id){
      this.jobseekerService.uploadImage(this.file, this.user.id).subscribe({
        next: (response) => {
          if(response.isSuccess){
            this.model.resumeURL = response.result;
            this.addProfileSubscription$ = this.jobseekerService.addJobSeeker(this.model).subscribe({
              next: (response) =>{
                this.router.navigateByUrl('/jobseeker');
                this.toast.success({detail:"",summary:'Profile added Succesfully', position: 'topRight'}); 

              },
              error: (error) => {
                console.error(error);
              }
            });
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
ngOnDestroy(): void {
  this.addProfileSubscription$?.unsubscribe();
}
  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }
  }