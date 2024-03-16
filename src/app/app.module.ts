import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { EmployerDetailsComponent } from './features/Employer/employer-details/employer-details.component';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
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
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ApplicationsComponent } from './features/Employer/vacancy/Applications/applications/applications.component';
import { CalendarModule } from 'primeng/calendar';
import { NgToastModule } from 'ng-angular-popup';
import { AccordionModule } from 'primeng/accordion';
import { ApplicantDetailsComponent } from './features/Employer/vacancy/Applications/applications/ApplicantDetails/applicant-details/applicant-details.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    EmployerDetailsComponent,
    AddEmployerComponent,
    VacancyDetailComponent,
    AddVacancyComponent,
    JobseekerProfileComponent,
    AddJobSeekerComponent,
    QualificationDetailComponent,
    AddQualificationComponent,
    HomeComponent,
    ExperienceDetailComponent,
    AddExperienceComponent,
    MyAppliedVacanciesComponent,
    ApplicationsComponent,
    ApplicantDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    BrowserAnimationsModule,
    TableModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    NgToastModule,
    AccordionModule,
    NgxDocViewerModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
