import { RouterModule, Routes } from "@angular/router";
import { MyAppliedVacanciesComponent } from "./myAppliedVacancies/my-applied-vacancies/my-applied-vacancies.component";
import { JobseekerProfileComponent } from "./jobseeker-profile/jobseeker-profile.component";
import { AddJobSeekerComponent } from "./add-job-seeker/add-job-seeker.component";
import { authGuard } from "../auth/guard/auth.guard";
import { NgModule } from "@angular/core";
import { AddQualificationComponent } from "./Qualification/Add-Qualification/add-qualification/add-qualification.component";
import { QualificationDetailComponent } from "./Qualification/Qualification-Detail/qualification-detail/qualification-detail.component";
import { ExperienceDetailComponent } from "./Experiences/experience-detail/experience-detail.component";
import { AddExperienceComponent } from "./Experiences/add-experience/add-experience.component";

 const routes:Routes=[
    {
    path:'appliedVacancy',component:MyAppliedVacanciesComponent, canActivate: [authGuard]
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
    
    ];

    
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class JobseekerRoutingModule { }