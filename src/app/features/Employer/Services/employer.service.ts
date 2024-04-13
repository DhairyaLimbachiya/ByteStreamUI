import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employer } from '../model/Employer.model';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment.development';
import { AddEmployer } from '../model/add-Employer.model';
import { ApplicationResponse } from '../../Home/home/models/application-response.model';
import { UpdatedApplicationResponse } from '../../Home/home/models/updatedApplicationResponse.model';
import { SP_VacancyRequest } from '../model/Sp_VacancyRequest.model';
import { Response } from '../../JobSeeker/model/response-model';
import { SendEmail } from '../model/SendEmail.model';

@Injectable({
  providedIn: 'root',
})
export class EmployerService {
  employer?: Employer;
  constructor(private http: HttpClient) {}
  getEmployer(): Observable<Employer> {
    return this.http.get<Employer>(
      `${environment.employerBaseURL}/api/employer?addAuth=true`
    );
  }
  addEmployer(request: AddEmployer): Observable<Employer> {
    return this.http.post<Employer>(
      `${environment.employerBaseURL}/api/employer?addAuth=true`,
      {
        ...request,
      }
    );
  }
  SendEmail(request: SendEmail): Observable<SendEmail> {
    return this.http.post<SendEmail>(
      `${environment.employerBaseURL}/api/employer/SendEmail?addAuth=true`,
      {
        ...request,
      }
    );
  }
  updateEmployer(request:  Employer): Observable<Employer> {
    return this.http.put<Employer>(
      `${environment.employerBaseURL}/api/employer?addAuth=true`,
      {
        ...request,
      }
    );
  }

  getcomapnyByName(name: string): Observable<Employer> {
    return this.http.get<Employer>(
      `${environment.employerBaseURL}/api/employer/GetByCompanyName/${name}?addAuth=true`
    );
  }

  getApplicationsByVacancyId(
    id: string
  ): Observable<UpdatedApplicationResponse> {
    return this.http.get<UpdatedApplicationResponse>(
      `${environment.employerBaseURL}/api/application/getAllByVacancy/${id}?addAuth=true`
    );
  }
  paginationEndpoint(request: SP_VacancyRequest): Observable<Response> {
    return this.http.post<Response>(
      `${environment.employerBaseURL}/api/application/paginationEndpoint?addAuth=true`,
      request
    );
  }
  processApplication(status: string, id: string): Observable<Response> {
    var request = {
      status: status,
      id: id,
    };
    return this.http.post<Response>(
      `${environment.employerBaseURL}/api/application/processApplication?addAuth=true`,
      request
    );
  }
  getDetailsbyApplication(id:string):Observable<ApplicationResponse>{
  return this.http.get<ApplicationResponse>(
    `${environment.employerBaseURL}/api/application/getDetailsbyApplication/${id}?addAuth=true`,
  );
}
uploadImage(file: File, fileName: string): Observable<Response>{
  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', fileName)

  return this.http.post<Response>(`${environment.jobSeekerBaseURL}/api/Employer/uploadImage?addAuth=true`, formData);
}
}
