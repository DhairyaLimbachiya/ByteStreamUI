import { AddVacancy } from "src/app/features/Employer/vacancy/models/addvacancy.model";
import { JobSeeker } from "src/app/features/JobSeeker/model/JobSeeker.model";

export interface  ApplicationResponse{
     id: string;
    vacancyId :string;
    vacancy? :AddVacancy|null;
    userId :string
   jobseeker :JobSeeker|null;
  appliedDate :Date;
  applicationStatus: string;
  totalrecords:number;
    }