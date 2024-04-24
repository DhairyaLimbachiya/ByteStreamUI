import { Component } from '@angular/core';
import { Vacancy } from '../../Employer/vacancy/models/vacancy.model';
import { VacancyService } from '../../Employer/vacancy/services/vacancy.service';
import { EmployerService } from '../../Employer/Services/employer.service';
import { Employer } from '../../Employer/model/Employer.model';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';
import { HomeService } from '../service/home.service';
import { ApplyRequest } from './models/application-request.model';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { JobseekerService } from '../../JobSeeker/services/jobseeker.service';
import { JobSeeker } from '../../JobSeeker/model/JobSeeker.model';
import { HttpClient } from '@angular/common/http';
import { SignalrHubService } from '../demo-services.service';
interface PageEvent {
  first?: number;
  rows?: number;
  page?: number;
  pageCount?: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  vacancies?: Vacancy[];
  vacancyDetail: Vacancy = {} as Vacancy;
  employer: Employer = {} as Employer;
  jobseeker: JobSeeker = {} as JobSeeker;
  user?: User;
  applyRequest: ApplyRequest = {} as ApplyRequest;
  profileMade?: boolean = true;
  allvacancies?: Vacancy[];
  first: number = 0;
  rows: number = 3;
  searchText: string = '';
  totalRecords: number = 0;
  constructor(
    private vacancyService: VacancyService,
    private employerService: EmployerService,
    private authService: AuthService,
    private homeservice: HomeService,
    private router: Router,
    private toast: NgToastService,
    private jobseekerService: JobseekerService,
    private signalRService:SignalrHubService
  ) {}

  ngOnInit(): void {
    this.vacancyService.getAllVacancy().subscribe({
      next: (response) => {
        this.allvacancies = response;
        this.vacancies = this.allvacancies?.slice(this.first, this.first+this.rows);
        this.totalRecords = this.allvacancies?.length || 0;
      },
    });
   
      this.authService.user().subscribe({
        next:(response)=>{
        this.user=response;  
        }
      })
      this.signalRService.startConnection().subscribe({
        next:()=>{
          this.signalRService.receiveMessageFromSender().subscribe({
            next:(updatedEmployer)=>{
              if(this.employer.id==updatedEmployer.id){
              this.employer=updatedEmployer;
              }
            }
          })
        }
      })
  }

  OnModelOpen(name: string, id: string) {
    this.employerService.getcomapnyByName(name).subscribe({
      next: (response) => {
        this.employer = response;
      },
    }),
      this.vacancyService.getvacancyById(id).subscribe({
        next: (data) => {
          this.vacancyDetail =
            this.vacancies?.find((x) => x.id == id) || ({} as Vacancy);
          this.vacancyDetail.alreadyApplied = data.alreadyApplied;
        },
      });

  }

  ApplyVacancy() {
    this.applyRequest.vacancyId = this.vacancyDetail.id;
    if (this.user?.id) {
      this.applyRequest.userId = this.user.id;

      this.applyRequest.appliedDate = new Date();
      this.jobseekerService.getJobSeeker(this.applyRequest.userId).subscribe({
        next: (response) => {
          if(response){
          this.homeservice.apply(this.applyRequest).subscribe({
            next: () => {
              this.toast.success({
                detail: 'Success',
                summary: 'Applied Successfully',
              });
            },
          
          });
        
      }
      else{
        this.toast.warning({
          detail: 'Warning',
          summary: "Kindly Complete your profile before applying to any vacancy",
          position: 'topRight',
        });
        this.router.navigateByUrl('/Jobseeker/jobseeker/add');
      }

    
        }
      });
      
    }
  }
 
  filterResults(text: string) {
    this.vacancies = this.allvacancies;
    if (!text || text == '') {
      this.searchText = '';
      this.vacancies = this.vacancies?.slice(this.first, this.first+this.rows);
      this.totalRecords = this.allvacancies?.length || 0;
      return;
    }
    this.searchText = text;
    this.vacancies = this.vacancies?.filter(vacancy =>
      vacancy.jobTitle.toLowerCase().includes(text.trim().toLowerCase()) ||
      vacancy.publishedBy.toLowerCase().includes(text.trim().toLowerCase())
    );
    this.totalRecords = this.vacancies?.length || 0;
    this.vacancies = this.vacancies?.slice(this.first, this.first+this.rows);
  }


  
  getImageUrl(publishedBy: string): string {
    return `https://localhost:7003/Images/${publishedBy}.png`;
  }

  handleImageError(event: any,publishedBy:string) {
    const alternativeImageUrl = `https://localhost:7003/Images/${publishedBy}.jpg`;

    event.target.src = alternativeImageUrl;
  }
  onPageChange(event: PageEvent) {
    this.first = event.first || 0;
    this.rows = event.rows || 3;
    this.vacancies = this.allvacancies?.slice(this.first, this.first+this.rows).filter(vacancy =>
      vacancy.jobTitle.toLowerCase().includes(this.searchText.trim().toLowerCase()) ||
      vacancy.publishedBy.toLowerCase().includes(this.searchText.trim().toLowerCase())
    );;
  }

  
}
