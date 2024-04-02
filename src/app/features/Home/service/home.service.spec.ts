import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HomeService } from './home.service';
import { ApplyRequest } from '../home/models/application-request.model';
import { environment } from 'src/enviroments/enviroment.development';
import { ApplicationResponse } from '../home/models/application-response.model';
import { Response } from '../../JobSeeker/model/response-model';

fdescribe('HomeService', () => {
  let service: HomeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService]
    });
    service = TestBed.inject(HomeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send apply request', () => {
    const mockRequest: ApplyRequest = {
      id: '0cd7ad68-b056-4e82-2d5f-08dc4962745c',
      vacancyId: '32907f85-e4df-4df0-b047-08dc49043cd4',
     vacancy:null,
      userId: '691c7301-9206-4c4b-b7f8-c780d0856e8f',
  jobseeker:null,
      appliedDate: new Date('2024-03-21T04:50:38.588'),
      totalrecords: 0
    };
    const mockResponse:Response = {
      result: {},
      isSuccess: true, 
      message: 'Mock response message' 
    };

    service.apply(mockRequest).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.employerBaseURL}/api/application/createApplication?addAuth=true`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should get vacancy by id', () => {
    const vacancyId = '32907f85-e4df-4df0-b047-08dc49043cd4'; 
    const mockResponse = { result: {},
    isSuccess: true, 
    message: ''  };

    service.getVacancyById(vacancyId).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.employerBaseURL}/api/vacancy/Vacancy/${vacancyId}?addAuth=true`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});