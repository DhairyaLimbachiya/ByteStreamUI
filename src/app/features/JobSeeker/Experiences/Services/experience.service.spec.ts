import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExperienceService } from './experience.service';
import { AddExperience } from '../models/add-experience.model';
import { Experience } from '../models/experiences.model';
import { environment } from 'src/enviroments/enviroment.development';

fdescribe('ExperienceService', () => {
  let service: ExperienceService;
  let httpTestingController: HttpTestingController;
  const expectedData: Experience = {
    id: '970bef8d-a8b6-4260-ee15-08dc4a4d8f7d',
    companyName: 'Tsc',
    startYear: new Date,
    endYear: new Date,
    companyUrl: 'https://learn.thespecialcharacter.com/',
    designation: 'Team-Lead',
    jobDescription: 'Lorem Ipsum'
  };
  const testData: Experience = {
    id: '970bef8d-a8b6-4260-ee15-08dc4a4d8f7d',
    companyName: 'Tsc',
    startYear: new Date,
    endYear: new Date,
    companyUrl: 'https://learn.thespecialcharacter.com/',
    designation: 'Team-Lead',
    jobDescription: 'Lorem Ipsum'
  };
  const expectedDataArray: Experience[] = [{
    id: '970bef8d-a8b6-4260-ee15-08dc4a4d8f7d',
    companyName: 'Tsc',
    startYear: new Date,
    endYear: new Date,
    companyUrl: 'https://learn.thespecialcharacter.com/',
    designation: 'Team-Lead',
    jobDescription: 'Lorem Ipsum'
  }];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExperienceService]
    });
    service = TestBed.inject(ExperienceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add experience', () => {
  
    service.addExperience(testData).subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(`${environment.jobSeekerBaseURL}/api/experience?addAuth=true`);
    expect(req.request.method).toEqual('POST');
    req.flush(expectedData);
  });

  it('should get all experiences', () => {
  

    service.getExperience().subscribe(data => {
      expect(expectedDataArray).toEqual(expectedDataArray);
    });

    const req = httpTestingController.expectOne(`${environment.jobSeekerBaseURL}/api/experience?addAuth=true`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedData);
  });

  it('should get experience by ID', () => {
  
    service.getExperienceById(expectedData.id).subscribe(data => {
      expect(testData).toEqual(expectedData)
    });

    const req = httpTestingController.expectOne(`${environment.jobSeekerBaseURL}/api/experience/970bef8d-a8b6-4260-ee15-08dc4a4d8f7d`);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedData);
  });
  it('should delete experience by ID', () => {


    service.deleteExperience(expectedData.id).subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(`${environment.jobSeekerBaseURL}/api/experience/${expectedData.id}?addAuth=true`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(expectedData);
  });

  it('should update experience', () => {
    

    service.updateExperience(expectedData).subscribe(data => {
      expect(data).toEqual(expectedData);
    });

    const req = httpTestingController.expectOne(`${environment.jobSeekerBaseURL}/api/experience?addAuth=true`);
    expect(req.request.method).toEqual('PUT');
    req.flush(expectedData);
  });
});