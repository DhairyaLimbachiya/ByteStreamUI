import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Toast } from 'primeng/toast';
import { EmployerService } from 'src/app/features/Employer/Services/employer.service';
import { SendEmail } from 'src/app/features/Employer/model/SendEmail.model';
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
    private employerService: EmployerService,
    private toast: NgToastService,
    private router: Router
  ) {}
  jobseekeremail: string = '';
  companyname?: string;
  jobTitle?: string;
  jobseekerId: string | null = null;
  jobapplicationId?: string | null = null;
  jobseeker: JobSeeker = {} as JobSeeker;
  applicationStatus?: string | null = null;
  jobapplication?: ApplicationResponse;
  sendemail?: SendEmail;
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (response) => {
        this.jobseekerId = response.get('id');
        this.jobapplicationId = response.get('Id');
      },
    });
    if (this.jobseekerId && this.jobapplicationId) {
      this.jobSeekerService.getJobSeeker(this.jobseekerId).subscribe({
        next: (response) => {
          this.jobseeker = response;
          this.jobseekeremail = response.email;
        },
      });

      this.employerService
        .getDetailsbyApplication(this.jobapplicationId)
        .subscribe({
          next: (response) => {
            this.jobapplication = response;
          },
        });
    }
  }

  AcceptReject(status: string) {
    if (this.jobapplicationId) {
      this.employerService
        .processApplication(status, this.jobapplicationId)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.companyname = response.result.vacancy.publishedBy;
            this.jobTitle = response.result.vacancy.jobTitle;

            if (response.isSuccess && this.jobapplication) {
              this.jobapplication.applicationStatus = status;
              if (status == 'Accepted') {
                this.toast.success({
                  detail: 'Success',
                  summary: 'Application Selected',
                });
              } else {
                this.toast.warning({
                  detail: 'Rejected',
                  summary: 'Application Rejected',
                });
              }

              this.router.navigateByUrl(
                `/Vacancy/appliedinVacancy/${this.jobapplication.vacancyId}`
              );
            }
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => {
            this.sendemail = {
              fromEmail: 'byteStream@gmail.com',
              toEmail: this.jobseekeremail,
              subject: 'You have an update For your Job application',
              body: `<h3>Hello ${this.jobseeker.firstName}</h3>
<h3>Your Job application for the position of ${this.jobTitle} at ${this.companyname} has been ${this.jobapplication?.applicationStatus}</h3>
<h3>You can check your other application status at <a href='http://localhost:4200/Jobseeker/appliedVacancy'>http://localhost:4200/Jobseeker/appliedVacancy</a></h3>
<br>
<h3>Regards<br>ByteStream</h3>`,
            };
            this.employerService.SendEmail(this.sendemail).subscribe({
              next: () => {},
            });
          },
        });
    }
  }
}
