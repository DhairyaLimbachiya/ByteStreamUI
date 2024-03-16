import { Injectable } from '@angular/core';
import { JobSeeker } from '../model/JobSeeker.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment.development';
import { AddJobSeeker } from '../model/add-JobSeeker.model';
import { ApplicationResponse } from '../../Home/home/models/application-response.model';
import { Response } from '../model/response-model';
@Injectable({
  providedIn: 'root'
})
export class JobseekerService {
jobseeker?:JobSeeker;
  constructor(private http:HttpClient) {}
  getJobseeker():Observable<JobSeeker>{
    return  this.http.get<JobSeeker>(`${environment.jobSeekerBaseURL}/api/jobseeker/?addAuth=true`)
  }
  getJobSeeker(id:string):Observable<JobSeeker>{
    return  this.http.get<JobSeeker>(`${environment.jobSeekerBaseURL}/api/jobseeker/${id}?addAuth=true`)
    }
   
    addJobSeeker(request:AddJobSeeker):Observable<JobSeeker>{
      return  this.http.post<JobSeeker>(`${environment.jobSeekerBaseURL}/api/Jobseeker?addAuth=true`,{
     ...request
      })
      }
      updateJobSeeker(request: JobSeeker):Observable<JobSeeker>{
        return  this.http.put<JobSeeker>(`${environment.jobSeekerBaseURL}/api/Jobseeker?addAuth=true`,{
          ...request
           })
      }
    deleteJobSeeker(id:string):Observable<JobSeeker>{
      return this.http.delete<JobSeeker>(`${environment.jobSeekerBaseURL}/api/jobseeker/${id}?addAuth=true`);
    }
    getApplicationsByUserId(userId: string): Observable<ApplicationResponse[]>{
      return this.http.get<ApplicationResponse[]>(`${environment.employerBaseURL}/api/application/getAllByUser/${userId}?addAuth=true`);
    }
    uploadImage(file: File, fileName: string): Observable<Response>{
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName)
      return this.http.post<Response>(`${environment.jobSeekerBaseURL}/api/JobSeeker/uploadResume?addAuth=true`, formData);
    }
}
