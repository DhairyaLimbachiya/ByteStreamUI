import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { authGuard } from '../auth/guard/auth.guard';
import { AddEmployerComponent } from './add-employer/add-employer.component';
import { EmployerDetailsComponent } from './employer-details/employer-details.component';

const routes: Routes = [
  {path: "profile", component: EmployerDetailsComponent, canActivate: [authGuard]},
  {path: "employer/add", component: AddEmployerComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }