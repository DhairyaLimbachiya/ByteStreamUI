import { Component } from '@angular/core';
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
import { AccordionModule } from 'primeng/accordion';
@Component({
  selector: 'app-jobseeker-profile',
  templateUrl: './jobseeker-profile.component.html',
  styleUrls: ['./jobseeker-profile.component.css']
})
export class JobseekerProfileComponent {
  jobseeker: JobSeeker = {} as JobSeeker;
  flag: boolean = true;
  user?: User;
  file?: File;
  constructor(private jobSeekerService: JobseekerService, private router: Router, private route: ActivatedRoute, private authservice: AuthService, private toast: NgToastService) {
  }
  ngOnInit(): void {
    this.authservice.user().subscribe({
      next:(response)=>{
      this.user=response;
      }
    })
      this.jobSeekerService.getJobseeker().subscribe({
        next: (response) => {
          this.jobseeker = response;
          console.log(response);
        },
        error:()=>{
          this.flag=false;
        } 
      }); 
  }
  onFormSubmit(): void {
    if(this.file&&this.user?.id){
    this.jobSeekerService.uploadImage(this.file,this.user?.id).subscribe({
      next: (response) => {
        if(response.isSuccess){
          this.jobseeker.resumeURL = response.result;
    this.jobSeekerService.updateJobSeeker(this.jobseeker).subscribe({
next: (response) => {
this.jobseeker=response
      },
      complete:()=>{
        this.toast.success({detail:"",summary:'Profile Updated Successfully'});
      }
    });
  }
}
});
}
}
  DeleteProfile(id: string) {
    this.jobSeekerService.deleteJobSeeker(id).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/jobseeker');
        this.flag = true;
      }
    });
  }

  onFileUploadChange(event: Event) : void{
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }


}
