import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { EmployerDetailsComponent } from './features/Employer/employer-details/employer-details.component';
import { AddEmployerComponent } from './features/Employer/add-employer/add-employer.component';
import { VacancyDetailComponent } from './features/Employer/vacancy/vacancy-detail/vacancy-detail.component';
import { AddVacancyComponent } from './features/Employer/vacancy/add-vacancy/add-vacancy.component';
import { JobseekerProfileComponent } from './features/JobSeeker/jobseeker-profile/jobseeker-profile.component';
import { AddJobSeekerComponent } from './features/JobSeeker/add-job-seeker/add-job-seeker.component';
import { QualificationDetailComponent } from './features/JobSeeker/Qualification/Qualification-Detail/qualification-detail/qualification-detail.component';
import { AddQualificationComponent } from './features/JobSeeker/Qualification/Add-Qualification/add-qualification/add-qualification.component';
import { HomeComponent } from './features/Home/home/home.component';
import { ExperienceDetailComponent } from './features/JobSeeker/Experiences/Experiences/Experience-Detail/experience-detail/experience-detail.component';
import { AddExperienceComponent } from './features/JobSeeker/Experiences/Experiences/Add-Experience/add-experience/add-experience.component';
import { MyAppliedVacanciesComponent } from './features/JobSeeker/myAppliedVacancies/my-applied-vacancies/my-applied-vacancies.component';
import { ApplicationsComponent } from './features/Employer/vacancy/Applications/applications/applications.component';
import { ApplicantDetailsComponent } from './features/Employer/vacancy/Applications/applications/ApplicantDetails/applicant-details/applicant-details.component';
import { authGuard } from './features/auth/guard/auth.guard';

const routes: Routes = [
  {
path: 'home',component:HomeComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'employer',component:EmployerDetailsComponent, canActivate: [authGuard]
  },
  {
   path:'employer/add',component:AddEmployerComponent, canActivate: [authGuard]
  },
  {
    path:'vacancy',component:VacancyDetailComponent, canActivate: [authGuard]
  },
  {
    path:'vacancy/add',component:AddVacancyComponent, canActivate: [authGuard]
  },
  {
    path:'jobseeker',component:JobseekerProfileComponent ,canActivate: [authGuard]  
  },
  {
    path:'jobseeker/add',component:AddJobSeekerComponent, canActivate: [authGuard]
  },
  {
    path:'qualification',component:QualificationDetailComponent, canActivate: [authGuard]
  },
  {
   path:'qualification/add',component:AddQualificationComponent, canActivate: [authGuard]
  },
{
  path:'experience',component :ExperienceDetailComponent, canActivate: [authGuard]
},
{
  path:'experience/add',component:AddExperienceComponent, canActivate: [authGuard]
},
{
path:'appliedVacancy',component:MyAppliedVacanciesComponent, canActivate: [authGuard]
},
{
path:'appliedinVacancy/:id',component:ApplicationsComponent, canActivate: [authGuard]
},
{
  path:'applicantdetails/:id',component:ApplicantDetailsComponent, canActivate: [authGuard]
}
];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
