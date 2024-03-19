import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/Home/home/home.component';
import { authGuard } from './features/auth/guard/auth.guard';

const routes: Routes = [
  {
path: 'home',component:HomeComponent 
  },
//Auth Route
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },

// Employer Routes
{ path: 'Employer', loadChildren: () => import('./features/Employer/profile.module').then(m => m.EmployerModule) },
{ path: 'Vacancy', loadChildren:()=>import('./features/Employer/vacancy.module').then(m=>m.VacancyModule)},


 //JobSeeker Route
 {
  path :'Jobseeker',loadChildren:()=>import('./features/JobSeeker/jobseeker.module').then(m=>m.JobseekerModule)
 }


];





@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  
 }
