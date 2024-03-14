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
  constructor(private jobSeekerService: JobseekerService, private router: Router, private route: ActivatedRoute, private authservice: AuthService, private toast: NgToastService) {
  }
  ngOnInit(): void {
 
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
    this.jobSeekerService.updateJobSeeker(this.jobseeker).subscribe({
next: (response) => {
this.jobseeker=response
      },
      complete:()=>{
        this.toast.success({detail:"",summary:'Profile Updated Successfully'});
      }
    });
  }
  DeleteProfile(id: string) {
    this.jobSeekerService.deleteJobSeeker(id).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/jobseeker');
        this.flag = true;
      }
    });
  }



}
