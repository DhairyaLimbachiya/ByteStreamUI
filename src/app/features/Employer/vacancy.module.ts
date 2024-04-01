import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { VacancyDetailComponent } from './vacancy/vacancy-detail/vacancy-detail.component';
import { AddVacancyComponent } from './vacancy/add-vacancy/add-vacancy.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { VacancyRoutingModule } from './vacancy-routing.module';
import { ApplicantDetailsComponent } from './vacancy/Applications/applications/ApplicantDetails/applicant-details/applicant-details.component';
import { ApplicationsComponent } from './vacancy/Applications/applications/applications.component';
import { AccordionModule } from 'primeng/accordion';
import { ChipModule } from 'primeng/chip';

@NgModule({
  declarations: [
VacancyDetailComponent,
AddVacancyComponent,
ApplicantDetailsComponent,
ApplicationsComponent
  ],
  imports: [
    ChipModule,
VacancyRoutingModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    TableModule,
    CalendarModule,
    AccordionModule
  ]
})
export class VacancyModule { }



