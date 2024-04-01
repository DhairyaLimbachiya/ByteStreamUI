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
  model:AddJobSeeker={} as AddJobSeeker;
  file?:File;
  image?:File;
  resumeFlag: boolean = false;
  profileImgFlag:boolean=false;
  addProfileSubscription$?: Subscription;
  dateFlag: boolean = false;
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
  onFormSubmit() {
    this.model = {
     
      firstName: this.addProfileForm.get('firstName')?.value || '',
      lastName: this.addProfileForm.get('lastName')?.value || '',
      phone: this.addProfileForm.get('phone')?.value || '',
      address: this.addProfileForm.get('address')?.value || '',
      email: this.model.email,
      expectedSalary: this.addProfileForm.get('expectedSalary')?.value || 0,
      totalExperience: this.addProfileForm.get('totalExperience')?.value || 0,
      dob: new Date(),
      resumeURL: this.model.resumeURL,
      profileImgURL: this.model.profileImgURL,
    }

    if (this.model.dob.getTime() == new Date().getTime()) {
      this.dateFlag = true;
    }
    this.uploadResume();
  }

  uploadResume(): void{
    if(this.file&&this.user?.id){
      this.resumeFlag = false;
      this.jobseekerService.uploadResume(this.file, this.user?.id).subscribe({
        next: (response) => {
     
            this.model.resumeURL = response.result;
            this.uploadImage();
        
        },
   
      });
    }
    else{
      this.resumeFlag = true;
    }
  }

  uploadImage(): void{
    if (this.image&&this.user?.id) {
      this.profileImgFlag = false;
      this.jobseekerService.uploadImage(this.image, this.user.id).subscribe({
        next: (response) => {
          
            this.model.profileImgURL = response.result;
            this.addProfile();
          
        
        },
     
      });
    }
    else{
      this.profileImgFlag = true;
    }
  }

  addProfile(): void{
    console.log(this.model);
    this.addProfileSubscription$ = this.jobseekerService.addJobSeeker(this.model).subscribe({
      next: (response) => {
        console.log(response);

          this.router.navigateByUrl('/Jobseeker/jobseeker');
      
      },
     
    });
  }

  onFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }
  onImageFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.image = element.files?.[0];
  }
  }