import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddQualification } from '../models/add-qualification.model';
import { Qualification } from '../models/qualification.model';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroments/enviroment.development';

@Injectable({
  providedIn: 'root',
})
export class QualificationService {
  constructor(private http: HttpClient) { }
  
  addQualification(data: AddQualification): Observable<Qualification> {
    return this.http.post<Qualification>(
      `${environment.jobSeekerBaseURL}/api/qualification?addAuth=true`,
      data
    );
  }

  getQualification(): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(
      `${environment.jobSeekerBaseURL}/api/qualification/?addAuth=true`
    );
  }
  getQualificationById(id: string): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(
      `${environment.jobSeekerBaseURL}/api/qualification/${id}?addAuth=true`
    );
  }
  deleteQualification(id: string): Observable<Qualification> {
    return this.http.delete<Qualification>(
      `${environment.jobSeekerBaseURL}/api/qualification/${id}?addAuth=true`
    );
  }

  updateQualification(request: Qualification): Observable<Qualification> {
    return this.http.put<Qualification>(
      `${environment.jobSeekerBaseURL}/api/qualification?addAuth=true`,
      {
        ...request,
      }
    );
  }
}
