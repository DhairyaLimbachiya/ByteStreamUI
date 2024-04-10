import { ChangeDetectorRef, Component } from '@angular/core';
import { JobSeeker } from '../model/JobSeeker.model';
import { JobseekerService } from '../services/jobseeker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { QualificationService } from '../Qualification/Services/qualification.service';
import { Qualification } from '../Qualification/models/qualification.model';
import { Experience } from '../Experiences/models/experiences.model';
import { ExperienceService } from '../Experiences/Services/experience.service';
import { User } from '../../auth/models/user.model';
import { AuthService } from '../../auth/services/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-jobseeker-profile',
  templateUrl: './jobseeker-profile.component.html',
  styleUrls: ['./jobseeker-profile.component.css']
})
export class JobseekerProfileComponent {
  jobseeker: JobSeeker = {} as JobSeeker;
  flag: boolean = true;
  user?: User;
  resumefile?: File;
  profileImgFile?:File;
  constructor(private jobSeekerService: JobseekerService, private router: Router, private route: ActivatedRoute, private authservice: AuthService, private toast: NgToastService, private fb: FormBuilder, private changeDetector: ChangeDetectorRef) {
  }
  editProfileForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phone: new FormControl('', [Validators.minLength(10), Validators.required]),
    address: ['', Validators.required],
    expectedSalary: [0, Validators.required],
    totalExperience: [0, Validators.required],
  });
  ngOnInit(): void {
    this.authservice.user().subscribe({
      next:(response)=>{
      this.user=response;
      }
    })
      this.jobSeekerService.getJobseeker().subscribe({
        next: (response) => {
          this.jobseeker = response;
          this.editProfileForm.setValue({
            firstName: this.jobseeker.firstName,
            lastName: this.jobseeker.lastName,
            phone: this.jobseeker.phone,
            address: this.jobseeker.address,
            expectedSalary: this.jobseeker.expectedSalary,
            totalExperience: this.jobseeker.totalExperience
          
          });
          console.log(response);
        },
        error:()=>{
          this.flag=false;
        } 
      }); 
  }
  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
  onFormSubmit() {
    this.jobseeker = {
      id: this.jobseeker.id,
      firstName: this.editProfileForm.get('firstName')?.value || this.jobseeker.firstName,
      lastName: this.editProfileForm.get('lastName')?.value || this.jobseeker.lastName,
      phone: this.editProfileForm.get('phone')?.value || this.jobseeker.phone,
      address: this.editProfileForm.get('address')?.value || this.jobseeker.address,
      email: this.jobseeker.email,
      expectedSalary: this.editProfileForm.get('expectedSalary')?.value || this.jobseeker.expectedSalary,
      totalExperience: this.editProfileForm.get('totalExperience')?.value || this.jobseeker.totalExperience,
      dob: this.jobseeker.dob,
      resumeURL: this.jobseeker.resumeURL,
      profileImgURL: this.jobseeker.profileImgURL,
      qualification:this.jobseeker.qualification,
      experience:this.jobseeker.experience
    }
    this.uploadResume();
  }

  uploadResume(): void{
    if(this.resumefile){
      this.jobSeekerService.uploadResume(this.resumefile, this.jobseeker.id).subscribe({
        next: (response) => {
          if (response.isSuccess) {
            this.jobseeker.resumeURL = response.result;
          }
          
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
    this.uploadImage();
  }

  uploadImage(): void{
    if (this.profileImgFile) {
      this.jobSeekerService.uploadImage(this.profileImgFile, this.jobseeker.id).subscribe({
        next: (response) => {
            this.jobseeker.profileImgURL = response.result;
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
    this.jobSeekerService.updateJobSeeker(this.jobseeker).subscribe({
      next: (response) => {
        this.toast.success({
          detail: 'Success',
          summary: 'Profile Updated Successfully',
          
        });
        window.location.reload();

      },
      error: (error) => {
        console.error(error);
      }
      
    });
  }

  onFileUploadChange(event: Event) : void{
    const element = event.currentTarget as HTMLInputElement;
    this.resumefile = element.files?.[0];
  }

  onImageFileUploadChange(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    this.profileImgFile = element.files?.[0];
  }
}
