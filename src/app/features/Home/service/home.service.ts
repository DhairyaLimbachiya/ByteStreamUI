import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplyRequest } from '../home/models/application-request.model';
import { environment } from 'src/enviroments/enviroment.development';
import { Observable } from 'rxjs';
import { Response } from '../../JobSeeker/model/response-model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
constructor(private http :HttpClient){}

apply(request:ApplyRequest){
  return this.http.post<Response>(`${environment.employerBaseURL}/api/application/createApplication?addAuth=true`,request);
}

getVacancyById(id: string): Observable<Response>{
  return this.http.get<Response>(`${environment.employerBaseURL}/api/vacancy/Vacancy/${id}?addAuth=true`);
}
}
