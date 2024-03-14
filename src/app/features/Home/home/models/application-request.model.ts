import { Vacancy } from "src/app/features/Employer/vacancy/models/vacancy.model";
import { JobSeeker } from "src/app/features/JobSeeker/model/JobSeeker.model";

export interface  ApplyRequest{
vacancyId :string;
    vacancy :Vacancy
    userId :string
    jobseeker :JobSeeker;
    appliedDate : Date;
}