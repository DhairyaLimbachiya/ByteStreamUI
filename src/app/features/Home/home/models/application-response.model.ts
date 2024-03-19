import { AddVacancy } from "src/app/features/Employer/vacancy/models/addvacancy.model";
import { JobSeeker } from "src/app/features/JobSeeker/model/JobSeeker.model";

export interface  ApplicationResponse{
     id: string;
    vacancyId :string;
    vacancy? :AddVacancy;
    userId :string
   jobseeker :JobSeeker;
  appliedDate :Date;
  applicationStatus: string;
    }