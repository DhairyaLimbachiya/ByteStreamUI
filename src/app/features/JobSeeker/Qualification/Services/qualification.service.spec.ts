import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { QualificationService } from './qualification.service';
import { Qualification } from '../models/qualification.model';
import { AddQualification } from '../models/add-qualification.model';
import { environment } from 'src/enviroments/enviroment.development';

fdescribe('QualificationService', () => {
  let service: QualificationService;
  let httpTestingController: HttpTestingController;
  const mockQualification: Qualification = {
    id: '1',
    qualificationName: 'Bachelor of Science',
    university: 'University of XYZ',
    yearOfCompletion: 2020,
    gradeOrScore: 'A',
  };
  const mockQualifications: Qualification[] = [
    {
      id: '1',
      qualificationName: 'Bachelor of Science',
      university: 'University of XYZ',
      yearOfCompletion: 2020,
      gradeOrScore: 'A',
    },
    {
      id: '2',
      qualificationName: 'Master of Science',
      university: 'University of ABC',
      yearOfCompletion: 2022,
      gradeOrScore: 'B+',
    },
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QualificationService]
    });
    service = TestBed.inject(QualificationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a qualification', () => {
    const mockQualification: Qualification = {
      id: '1',
      qualificationName: 'Bachelor of Science',
      university: 'University of XYZ',
      yearOfCompletion: 2020,
      gradeOrScore: 'A',
    };
    const mockAddQualification: AddQualification = {
      qualificationName: 'Bachelor of Science',
      university: 'University of XYZ',
      yearOfCompletion: 2020,
      gradeOrScore: 'A',
    };

    service.addQualification(mockAddQualification).subscribe((qualification: Qualification) => {
      expect(qualification).toEqual(mockQualification);
    });

    const req = httpTestingController.expectOne(`${environment.jobSeekerBaseURL}/api/qualification?addAuth=true`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockQualification);
  });

  it('should get all qualifications', () => {
   

    service.getQualification().subscribe((qualifications: Qualification[]) => {
      expect(qualifications.length).toBe(2);
      expect(qualifications).toEqual(mockQualifications);
    });

    const req = httpTestingController.expectOne(`${environment.jobSeekerBaseURL}/api/qualification/?addAuth=true`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockQualifications);
  });

  it('should get a qualification by ID', () => {
   

    service.getQualificationById(mockQualification.id).subscribe((qualification: Qualification[]) => {
      expect(qualification.length).toBe(1);
      expect(qualification[0]).toEqual(mockQualification);
    });

    const req = httpTestingController.expectOne(`${environment.jobSeekerBaseURL}/api/qualification/${mockQualification.id}?addAuth=true`);
    expect(req.request.method).toEqual('GET');
    req.flush([mockQualification]);
  });

  it('should delete a qualification', () => {
    const qualificationId = '1';
    const mockQualification: Qualification = {
      id: '1',
      qualificationName: 'Bachelor of Science',
      university: 'University of XYZ',
      yearOfCompletion: 2020,
      gradeOrScore: 'A',
    };

    service.deleteQualification(qualificationId).subscribe((qualification: Qualification) => {
      expect(qualification).toEqual(mockQualification);
    });

    const req = httpTestingController.expectOne(`${environment.jobSeekerBaseURL}/api/qualification/${qualificationId}?addAuth=true`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockQualification);
  });

  it('should update a qualification', () => {
  
    service.updateQualification(mockQualification).subscribe((qualification: Qualification) => {
      expect(qualification).toEqual(mockQualification);
    });

    const req = httpTestingController.expectOne(`${environment.jobSeekerBaseURL}/api/qualification?addAuth=true`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockQualification);
  });
});