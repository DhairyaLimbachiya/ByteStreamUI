import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
      LoginComponent,
      RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    DropdownModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule
  ]
})
export class AuthModule { }
