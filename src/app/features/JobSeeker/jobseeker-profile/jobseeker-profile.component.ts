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
 // jobseekerId?: string | null = null;
  flag: boolean = true;
  qualifications?: Qualification[];
  experiences?: Experience[]
  user?: User;
  constructor(private jobSeekerService: JobseekerService, private router: Router, private qualificationservice: QualificationService, private route: ActivatedRoute, private experienceService: ExperienceService, private authservice: AuthService, private toast: NgToastService) {
  }
  ngOnInit(): void {
    this.authservice.user().subscribe({
      next: (response) => {
        this.user = response;
        console.log(this.user);
      }
    });
      this.jobSeekerService.getJobseeker().subscribe({
        next: (response) => {
          this.jobseeker = response;
        },
        error:()=>{
          this.flag=false;
        }
      });

      this.qualificationservice.getQualification().subscribe({
        next: (response) => {
          this.qualifications = response
        }
      });

      this.experienceService.getExperience().subscribe({
        next: (response) => {
          this.experiences = response
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
