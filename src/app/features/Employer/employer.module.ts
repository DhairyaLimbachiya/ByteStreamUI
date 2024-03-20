import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProfileRoutingModule } from './profile-routing.module';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';
import { AddEmployerComponent } from './add-employer/add-employer.component';


@NgModule({
  declarations: [
EmployerDetailsComponent,
AddEmployerComponent,
  ],
  imports: [
    ProfileRoutingModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
  ]
})
export class EmployerModule { }