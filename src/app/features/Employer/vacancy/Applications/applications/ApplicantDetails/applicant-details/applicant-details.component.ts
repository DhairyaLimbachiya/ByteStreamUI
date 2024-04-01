import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Toast } from 'primeng/toast';
import { EmployerService } from 'src/app/features/Employer/Services/employer.service';
import { ApplicationResponse } from 'src/app/features/Home/home/models/application-response.model';
import { ExperienceService } from 'src/app/features/JobSeeker/Experiences/Services/experience.service';
import { Experience } from 'src/app/features/JobSeeker/Experiences/models/experiences.model';
import { QualificationService } from 'src/app/features/JobSeeker/Qualification/Services/qualification.service';
import { Qualification } from 'src/app/features/JobSeeker/Qualification/models/qualification.model';
import { JobSeeker } from 'src/app/features/JobSeeker/model/JobSeeker.model';
import { JobseekerService } from 'src/app/features/JobSeeker/services/jobseeker.service';

@Component({
  selector: 'app-applicant-details',
  templateUrl: './applicant-details.component.html',
  styleUrls: ['./applicant-details.component.css'],
})
export class ApplicantDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private qualificationservice: QualificationService,
    private experienceService: ExperienceService,
    private jobSeekerService: JobseekerService,
    private employerService:EmployerService,
    private toast:NgToastService,
    private router:Router
  ) {}
  jobseekerId: string | null = null;
jobapplicationId?:string|null=null;
  jobseeker: JobSeeker = {} as JobSeeker;
applicationStatus?:string|null=null;
jobapplication?:ApplicationResponse
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
        this.jobseekerId = response.get('id');
        this.jobapplicationId=response.get('Id')
       
      },
    });
    if (this.jobseekerId&&this.jobapplicationId) {
      this.jobSeekerService.getJobSeeker(this.jobseekerId).subscribe({
        next: (response) => {
          this.jobseeker = response;
          
        },
      });
   
    this.employerService.getDetailsbyApplication(this.jobapplicationId).subscribe({
      next:(response)=>{
        this.jobapplication=response;
      },
    })
  }
  }

  AcceptReject(status: string){
    if(this.jobapplicationId){
    this.employerService.processApplication(status, this.jobapplicationId).subscribe({
      
      next: (response) => {
        if(response.isSuccess&&this.jobapplication){
          this.jobapplication.applicationStatus = status
          if(status == "Accepted"){
            this.toast.success({detail:"Success",summary:'Application Selected'})
          }
          else{
            this.toast.warning({detail:"Rejected",summary:'Application Rejected'})
          }
          
        this.router.navigateByUrl(`/Vacancy/appliedinVacancy/${this.jobapplication.vacancyId}`);
        }
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
}
