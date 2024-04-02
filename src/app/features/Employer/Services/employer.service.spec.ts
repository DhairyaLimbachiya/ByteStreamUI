import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EmployerService } from './employer.service';

import { environment } from 'src/enviroments/enviroment.development';
import { Employer } from '../model/Employer.model';
import { Response } from '../../JobSeeker/model/response-model';
import { SP_VacancyRequest } from '../model/Sp_VacancyRequest.model';
import { ApplicationResponse } from '../../Home/home/models/application-response.model';

fdescribe('EmployerService', () => {
  let service: EmployerService;
  let httpTestingController: HttpTestingController;
  const mockEmployer: Employer = {
    id: '1',
    profileImageUrl: 'https://example.com/profile-image.jpg',
    organization: 'ABC Corporation',
    organizationType: 'Public',
    companyEmail: 'info@abc.com',
    companyPhone: '1234567890',
    noOfEmployees: 100,
    startYear: 2000,
    about: 'ABC Corporation is a leading provider of innovative solutions...'
  };
  const mockAddEmployer: Employer = {
    id: '1',
    profileImageUrl: 'https://example.com/profile-image.jpg',
    organization: 'ABC Corporation',
    organizationType: 'Public',
    companyEmail: 'info@abc.com',
    companyPhone: '1234567890',
    noOfEmployees: 100,
    startYear: 2000,
    about: 'ABC Corporation is a leading provider of innovative solutions...'
  };
  const request: SP_VacancyRequest = {
    vacancyId: '1',
    pageNumber: 1,
    pageSize: 10
  };
  const mockResponse:ApplicationResponse={
    id: '1',
    vacancyId: '2',
    vacancy: null, // Assuming no associated vacancy for simplicity
    userId: '3',
    jobseeker: null, // Assuming no associated jobseeker for simplicity
    appliedDate: new Date(),
    applicationStatus: 'Pending',
    totalrecords: 10
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployerService]
    });
    service = TestBed.inject(EmployerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get employer', () => {
 
    service.getEmployer().subscribe((employer) => {
      expect(employer).toEqual(mockEmployer);
    });

    const req = httpTestingController.expectOne(`${environment.employerBaseURL}/api/employer?addAuth=true`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockEmployer);
  });

  it('should add employer', () => {

    service.addEmployer(mockAddEmployer).subscribe((employer) => {
      expect(employer).toEqual(mockEmployer);
    });

    const req = httpTestingController.expectOne(`${environment.employerBaseURL}/api/employer?addAuth=true`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockEmployer);
  });

  it('should update employer', () => {

    service.updateEmployer(mockEmployer).subscribe((employer) => {
      expect(employer).toEqual(mockEmployer);
    });

    const req = httpTestingController.expectOne(`${environment.employerBaseURL}/api/employer?addAuth=true`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockEmployer);
  });

  it('should get employer by name', () => {
 
    service.getcomapnyByName(mockEmployer.organization).subscribe((employer) => {
      expect(employer).toEqual(mockEmployer);
    });

    const req = httpTestingController.expectOne(`${environment.employerBaseURL}/api/employer/GetByCompanyName/${mockEmployer.organization}?addAuth=true`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockEmployer);
  });


  it('should handle pagination endpoint', () => {
    const mockResponse: Response = { isSuccess: true, message: 'Success', result: {} };

    service.paginationEndpoint(request).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.employerBaseURL}/api/application/paginationEndpoint?addAuth=true`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('should process application', () => {
    const status = 'Approved';
    const applicationId = '123';
    const mockResponse: Response = { isSuccess: true, message: 'Success', result: {} };

    service.processApplication(status, applicationId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.employerBaseURL}/api/application/processApplication?addAuth=true`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('should get details by application', () => {
    const applicationId = '123';
   
    service.getDetailsbyApplication(applicationId).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.employerBaseURL}/api/application/getDetailsbyApplication/${applicationId}?addAuth=true`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should upload image', () => {
    const file = new File(['image'], 'test.png', { type: 'image/png' });
    const fileName = 'test.png';
    const mockResponse: Response = { isSuccess: true, message: 'Success', result: {} };

    service.uploadImage(file, fileName).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.jobSeekerBaseURL}/api/Employer/uploadImage?addAuth=true`);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body instanceof FormData).toBeTruthy();
    expect(req.request.body.get('file')).toEqual(file);
    expect(req.request.body.get('fileName')).toEqual(fileName);
    req.flush(mockResponse);
  });

});