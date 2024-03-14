import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddVacancy } from '../models/addvacancy.model';
import { Observable } from 'rxjs';
import { Vacancy } from '../models/vacancy.model';
import { environment } from 'src/enviroments/enviroment.development';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  constructor(private http:HttpClient) {}

  createVacancy(data:AddVacancy):Observable<Vacancy>{
    return this.http.post<Vacancy>(`${environment.employerBaseURL}/api/vacancy?addAuth=true`,data);
  }

  getAllCompanyVacancy():Observable<Vacancy[]>{
    return this.http.get<Vacancy[]>(`${environment.employerBaseURL}/api/vacancy?addAuth=true`);
  }
  getAllVacancy():Observable<Vacancy[]>{
    return this.http.get<Vacancy[]>(`${environment.employerBaseURL}/api/vacancy/getall?addAuth=true`);
  }

  getvacancyById(id:string):Observable<Vacancy>{
return this.http.get<Vacancy>(`${environment.employerBaseURL}/api/vacancy/${id}?addAuth=true`);
  }
  deletevacancy(id:string):Observable<Vacancy>{
return this.http.delete<Vacancy>(`${environment.employerBaseURL}/api/vacancy/${id}?addAuth=true`);
  }
  
  updateVacancy(request:Vacancy):Observable<Vacancy>{
    return  this.http.put<Vacancy>(`${environment.employerBaseURL}/api/vacancy?addAuth=true`,{
      ...request
       })
      }

      
}
