import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employer } from '../model/Employer.model';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment.development';
import { AddEmployer } from '../model/add-Employer.model';
import { ApplicationResponse } from '../../Home/home/models/application-response.model';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
employer?:Employer;
  constructor(private http:HttpClient) { }
    getEmployer():Observable<Employer>{
      return  this.http.get<Employer>(`${environment.employerBaseURL}/api/employer?addAuth=true`)
      }
      addEmployer(request:AddEmployer):Observable<Employer>{
        return  this.http.post<Employer>(`${environment.employerBaseURL}/api/employer?addAuth=true`,{
       ...request
        })
        }
        updateEmployer(request:Employer):Observable<Employer>{
          return  this.http.put<Employer>(`${environment.employerBaseURL}/api/employer?addAuth=true`,{
            ...request
             })
        }

      getcomapnyByName(name:string):Observable<Employer>{
        return this.http.get<Employer>(`${environment.employerBaseURL}/api/employer/GetByCompanyName/${name}?addAuth=true`)

      }
      
      getApplicationsByVacancyId(id: string): Observable<ApplicationResponse[]>{
        return this.http.get<ApplicationResponse[]>(`${environment.employerBaseURL}/api/application/getAllByVacancy/${id}?addAuth=true`);
      }
      
}


