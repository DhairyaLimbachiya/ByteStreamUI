import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExperienceService } from 'src/app/features/JobSeeker/Experiences/Services/experience.service';
import { Experience } from 'src/app/features/JobSeeker/Experiences/models/experiences.model';
import { QualificationService } from 'src/app/features/JobSeeker/Qualification/Services/qualification.service';
import { Qualification } from 'src/app/features/JobSeeker/Qualification/models/qualification.model';
import { JobSeeker } from 'src/app/features/JobSeeker/model/JobSeeker.model';
import { JobseekerService } from 'src/app/features/JobSeeker/services/jobseeker.service';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.css']
})

export class ApplicantDetailsComponent implements OnInit {
  constructor(private route: ActivatedRoute, private qualificationservice: QualificationService, private experienceService: ExperienceService,private jobSeekerService:JobseekerService){}
  jobseekerId: string | null = null;
  qualifications?: Qualification[];
  experiences?: Experience[];
  jobseeker: JobSeeker = {} as JobSeeker;

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
        this.jobseekerId = response.get('id');
      }
    });
if(this.jobseekerId){
    this.jobSeekerService.getJobSeeker(this.jobseekerId).subscribe({
      next: (response) => {
        this.jobseeker = response;
      },
    });

    this.qualificationservice.getAllQualification(this.jobseekerId).subscribe({
      next: (response) => {
        this.qualifications = response
      }
    });

    this.experienceService.getAllExperience(this.jobseekerId).subscribe({
      next: (response) => {
        this.experiences = response
      }
    });
}

  }

  



}
