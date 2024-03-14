export interface JobSeeker{
    id:string;
    firstName:string;
    lastName:string;
    email:string;
    phone:string;
    address:string;
    totalExperience:number;
    expectedSalary:number;
    dob:Date;
    resumeURL?:string;
    profileImgURL?:string;
}