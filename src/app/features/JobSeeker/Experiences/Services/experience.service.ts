import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddExperience } from '../models/add-experience.model';
import { Experience } from '../models/experiences.model';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment.development';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  constructor(private http:HttpClient) {}

  addExperience(data:AddExperience):Observable<Experience>{
    return this.http.post<Experience>(`${environment.jobSeekerBaseURL}/api/experience?addAuth=true`,data);
  }

  getExperience():Observable<Experience[]>{
    return this.http.get<Experience[]>(`${environment.jobSeekerBaseURL}/api/experience?addAuth=true`);
  }


  getExperienceById(id:string):Observable<Experience[]>{
return this.http.get<Experience[]>(`${environment.jobSeekerBaseURL}/api/experience/${id}`);
  }

  deleteExperience(id:string):Observable<Experience>{
return this.http.delete<Experience>(`${environment.jobSeekerBaseURL}/api/experience/${id}?addAuth=true`);
  }
  
  updateExperience(request:Experience):Observable<Experience>{
    return  this.http.put<Experience>(`${environment.jobSeekerBaseURL}/api/experience?addAuth=true`,{
      ...request
       })
      }
}
