import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VacancyService } from './vacancy.service';
import { AddVacancy } from '../models/addvacancy.model';
import { Vacancy } from '../models/vacancy.model';
import { environment } from 'src/enviroments/enviroment.development';

fdescribe('VacancyService', () => {
  let service: VacancyService;
  let httpTestingController: HttpTestingController;
  const mockVacancy: Vacancy = {
    id: '1',
publishedBy: 'Employer A',
jobTitle: 'Software Engineer',
noOfVacancies: 3,
minimumQualification: 'Bachelor\'s Degree',
jobDescription: 'Full-time software engineer position',
experienceRequired: '2+ years',
lastDate: new Date('2024-04-30'),
minSalary: 60000,
maxSalary: 80000,
alreadyApplied: false
  };



  const mockVacancies: Vacancy[] = [
    {
      id: '1',
  publishedBy: 'Employer A',
  jobTitle: 'Software Engineer',
  noOfVacancies: 3,
  minimumQualification: 'Bachelor\'s Degree',
  jobDescription: 'Full-time software engineer position',
  experienceRequired: '2+ years',
  lastDate: new Date('2024-04-30'),
  minSalary: 60000,
  maxSalary: 80000,
  alreadyApplied: false
    },  {
      id: '2',
  publishedBy: 'Employer B',
  jobTitle: 'Software Engineer',
  noOfVacancies: 3,
  minimumQualification: 'Bachelor\'s Degree',
  jobDescription: 'Full-time software engineer position',
  experienceRequired: '2+ years',
  lastDate: new Date('2024-04-30'),
  minSalary: 60000,
  maxSalary: 80000,
  alreadyApplied: false
    }
  ];
  const mockAddVacancy: Vacancy = {
    id: '1',
publishedBy: 'Employer A',
jobTitle: 'Software Engineer',
noOfVacancies: 3,
minimumQualification: 'Bachelor\'s Degree',
jobDescription: 'Full-time software engineer position',
experienceRequired: '2+ years',
lastDate: new Date('2024-04-30'),
minSalary: 60000,
maxSalary: 80000,
alreadyApplied: false
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VacancyService]
    });
    service = TestBed.inject(VacancyService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
  it('should create a vacancy', () => {
  
  

    service.createVacancy(mockAddVacancy).subscribe((vacancy: Vacancy) => {
      expect(vacancy).toEqual(mockVacancy);
    });

    const req = httpTestingController.expectOne(`${environment.employerBaseURL}/api/vacancy?addAuth=true`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockVacancy);
  });

  it('should fetch all vacancies for a company', () => {
   

    service.getAllCompanyVacancy().subscribe((vacancies: Vacancy[]) => {
      expect(vacancies).toEqual(mockVacancies);
    });

    const req = httpTestingController.expectOne(`${environment.employerBaseURL}/api/vacancy?addAuth=true`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockVacancies);
  });

  it('should fetch all vacancies', () => {

  
    service.getAllVacancy().subscribe((vacancies: Vacancy[]) => {
      expect(vacancies).toEqual(mockVacancies);
    });
  
    const req = httpTestingController.expectOne(`${environment.employerBaseURL}/api/vacancy/getall?addAuth=true`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockVacancies);
  });
  
  it('should fetch a single vacancy by ID', () => {
    
    service.getvacancyById(mockVacancy.id).subscribe((vacancy: Vacancy) => {
      expect(vacancy).toEqual(mockVacancy);
    });
  
    const req = httpTestingController.expectOne(`${environment.employerBaseURL}/api/vacancy/${mockVacancy.id}?addAuth=true`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockVacancy);
  });
  
  it('should delete a vacancy', () => {

    service.deletevacancy(mockVacancy.id).subscribe((vacancy: Vacancy) => {
      expect(vacancy).toEqual(mockVacancy);
    });
  
    const req = httpTestingController.expectOne(`${environment.employerBaseURL}/api/vacancy/${mockVacancy.id}?addAuth=true`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockVacancy);
  });
  
  it('should update a vacancy', () => {
  
    service.updateVacancy(mockVacancy).subscribe((vacancy: Vacancy) => {
      expect(vacancy).toEqual(mockVacancy);
    });
  
    const req = httpTestingController.expectOne(`${environment.employerBaseURL}/api/vacancy?addAuth=true`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockVacancy);
  });
});