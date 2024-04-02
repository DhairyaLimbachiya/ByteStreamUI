import { Vacancy } from "src/app/features/Employer/vacancy/models/vacancy.model";
import { JobSeeker } from "src/app/features/JobSeeker/model/JobSeeker.model";

export interface  ApplyRequest{
    id:string
    vacancyId :string;
    vacancy :Vacancy|null
    userId :string
    jobseeker :JobSeeker|null;
    appliedDate : Date;
    totalrecords:number
}