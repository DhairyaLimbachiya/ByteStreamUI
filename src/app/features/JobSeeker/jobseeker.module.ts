import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Calendar, CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { JobseekerProfileComponent } from './jobseeker-profile/jobseeker-profile.component';
import { AddJobSeekerComponent } from './add-job-seeker/add-job-seeker.component';
import { MyAppliedVacanciesComponent } from './myAppliedVacancies/my-applied-vacancies/my-applied-vacancies.component';
import { JobseekerRoutingModule } from './jobseeker-routing.module';
import { QualificationDetailComponent } from './Qualification/Qualification-Detail/qualification-detail/qualification-detail.component';
import { AddQualificationComponent } from './Qualification/Add-Qualification/add-qualification/add-qualification.component';
import { ExperienceDetailComponent } from './Experiences/experience-detail/experience-detail.component';
import { AddExperienceComponent } from './Experiences/add-experience/add-experience.component';
import { AccordionModule } from 'primeng/accordion';
@NgModule({
  declarations: [
    JobseekerProfileComponent,
    AddJobSeekerComponent,
    MyAppliedVacanciesComponent,
    QualificationDetailComponent,
    AddQualificationComponent,
    ExperienceDetailComponent,
    AddExperienceComponent,
  ],
  imports: [
    JobseekerRoutingModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    CalendarModule,
    TableModule,
    AccordionModule,
  ],
})
export class JobseekerModule {}
