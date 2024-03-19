import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { authGuard } from '../auth/guard/auth.guard';
import { AddVacancyComponent } from './vacancy/add-vacancy/add-vacancy.component';
import { ApplicationsComponent } from './vacancy/Applications/applications/applications.component';
import { ApplicantDetailsComponent } from './vacancy/Applications/applications/ApplicantDetails/applicant-details/applicant-details.component';
import { VacancyDetailComponent } from './vacancy/vacancy-detail/vacancy-detail.component';
const routes: Routes = [
  { path: 'vacancy', component: VacancyDetailComponent, canActivate: [authGuard] },
  {
    path: 'vacancy/add',
    component: AddVacancyComponent,
    canActivate: [authGuard],
  },
  {
    path: 'appliedinVacancy/:id',
    component: ApplicationsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'applicantdetails/:id',
    component: ApplicantDetailsComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacancyRoutingModule {}
