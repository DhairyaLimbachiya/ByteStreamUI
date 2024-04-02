import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { JobseekerService } from './jobseeker.service';
import { AddJobSeeker } from '../model/add-JobSeeker.model';
import { JobSeeker } from '../model/JobSeeker.model';
import { Response } from '../model/response-model';
import { environment } from 'src/enviroments/enviroment.development';

const dummyJobSeeker: JobSeeker = {
  id: "1b4ecd33-ca6f-479f-8fd7-ff2570bdd7ad",
  firstName: "Dhairya",
  lastName: "Limbachiya",
  email: "Dhairya6@gmail.com",
  phone: "6353699428",
  address: "Ahmedabad Gujarat",
  totalExperience: 2,
  expectedSalary: 55000000,
  dob: new Date("2003-04-22"),
  resumeURL: "https://localhost:7004/Resumes/1b4ecd33-ca6f-479f-8fd7-ff2570bdd7ad.pdf",
  profileImgURL: "https://localhost:7004/Images/1b4ecd33-ca6f-479f-8fd7-ff2570bdd7ad.png",
  experience: [
    {
      id: "970bef8d-a8b6-4260-ee15-08dc4a4d8f7d",
      companyName: "Tsc",
      startYear: new Date("2024-03-22T09:12:00.059"),
      endYear: new Date("2024-03-22T09:12:00.059"),
      companyUrl: "https://learn.thespecialcharacter.com/",
      designation: "Team-Lead",
      jobDescription: "Lorem Ipsum"
    }
  ],
  qualification: [
    {
      id: "336d352f-cd6d-4d91-537e-08dc4903ea6a",
      qualificationName: "M-tech",
      university: "Nirma",
      yearOfCompletion: 2024,
      gradeOrScore: "A+"
    },
    {
      id: "3529e7c0-a29c-440e-1be5-08dc4a4d695a",
      qualificationName: "Btech",
      university: " Ksv",
      yearOfCompletion: 2022,
      gradeOrScore: "A+"
    }
  ]
};
const mockResponse: JobSeeker = {
  id: "1b4ecd33-ca6f-479f-8fd7-ff2570bdd7ad",
  firstName: "Dhairya",
  lastName: "Limbachiya",
  email: "Dhairya6@gmail.com",
  phone: "6353699428",
  address: "Ahmedabad Gujarat",
  totalExperience: 2,
  expectedSalary: 55000000,
  dob: new Date("2003-04-22"),
  resumeURL: "https://localhost:7004/Resumes/1b4ecd33-ca6f-479f-8fd7-ff2570bdd7ad.pdf",
  profileImgURL: "https://localhost:7004/Images/1b4ecd33-ca6f-479f-8fd7-ff2570bdd7ad.png",
  experience: [
    {
      id: "970bef8d-a8b6-4260-ee15-08dc4a4d8f7d",
      companyName: "Tsc",
      startYear: new Date("2024-03-22T09:12:00.059"),
      endYear: new Date("2024-03-22T09:12:00.059"),
      companyUrl: "https://learn.thespecialcharacter.com/",
      designation: "Team-Lead",
      jobDescription: "Lorem Ipsum"
    }
  ],
  qualification: [
    {
      id: "336d352f-cd6d-4d91-537e-08dc4903ea6a",
      qualificationName: "M-tech",
      university: "Nirma",
      yearOfCompletion: 2024,
      gradeOrScore: "A+"
    },
    {
      id: "3529e7c0-a29c-440e-1be5-08dc4a4d695a",
      qualificationName: "Btech",
      university: " Ksv",
      yearOfCompletion: 2022,
      gradeOrScore: "A+"
    }
  ]
};
fdescribe('JobseekerService', () => {
  let service: JobseekerService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobseekerService]
    });
    service = TestBed.inject(JobseekerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a job seeker', () => {

    service.addJobSeeker(dummyJobSeeker).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.jobSeekerBaseURL}/api/Jobseeker?addAuth=true`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('should update a job seeker', () => {
  
    service.updateJobSeeker(dummyJobSeeker).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(`${environment.jobSeekerBaseURL}/api/Jobseeker?addAuth=true`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockResponse);
  });

  // Add more test cases for other methods...

});