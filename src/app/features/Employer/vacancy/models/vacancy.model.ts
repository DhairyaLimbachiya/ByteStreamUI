export interface Vacancy{
    id:string;
    publishedBy:string;
    jobTitle:string;
    noOfVacancies :number;
    minimumQualification:string;
    jobDescription:string;
    experienceRequired:string;
    lastDate:Date ;
    minSalary:number;
    maxSalary:number;
    alreadyApplied?: boolean;
}